<script>export default {name: 'Crud'}</script>
<script setup>
import DomCreate from './components/Create'
import DomEdit from './components/Edit'
import Pagination from '@/components/v2/Pagination/index'
import {reactive, ref, onMounted} from 'vue'
import {Message} from 'element-ui'
import {del, getList} from './api/api'

// 传入参数 props
const props = defineProps({
  // 是否开启选择
  isSelected: {
    type: Boolean,
    default: false
  }
})

// 工具栏
const tableToolbar = reactive({
  perfect: true,
  custom: true,
  slots: {
    buttons: 'toolbar_buttons'
  }
})
const tableColumn  = ref([
  {field: 'name', title: '名称', minWidth: 150,},
  {field: 'code', title: '编码', minWidth: 120, align: 'center',},
  {title: '操作栏', maxWidth: 140, align: 'center', slots: {default: 'operate'}}
])
// 加载
const loading      = ref(false)
// 请求参数
const queryList    = reactive({
  start: 1,
  limit: 999,
  total: 0,
  list: [],
  name: ''
})
// 创建
const create       = reactive({
  show: false,
  pid: ''
})
// 修改
const edit         = reactive({
  show: false,
  id: ''
})

// 初始化允许
onMounted(() => {
  if (props.isSingleSelect) {
    tableColumn.value.unshift({
      type: 'radio',
      field: 'id',
    })
  }
  wayGetList()
})

// 选择
const xGrid       = ref(null)
const emits = defineEmits(['waySelected'])
const waySelected = (obj) => {
  if (!props.isSelected) {
    return false
  }
  let row = obj
  if (obj.row) {
    row = obj.row
  }
  xGrid.value.setRadioRow(row)
  emits('selectedWay', {id: row.id, name: row.name}, row)
}
// 删除
const wayDel      = (obj) => {
  del([obj.id]).then(res => {
    res?.data?.code === 0 && Message.success('删除成功')
    wayGetList()
  })
}
// 修改
const wayEdit     = (obj) => {
  edit.show = true
  edit.id   = obj.id
}
// 列表
const wayGetList  = () => {
  let data            = {
    start: (queryList.start - 1) * queryList.limit,
    limit: queryList.limit,
    searchKey: queryList.name,
  }
  loading.value        = true
  queryList.list = []
  getList(data).then(res => {
    const {data} = res || {data: {}}
    if (data.code === 0) {
      queryList.list = data.data?.map(v => {
        v.isEditSort = false
        return v
      })
      loading.value        = false
    }
  })
}
// 搜索
const waySearch   = () => {
  queryList.start = 1
  wayGetList()
}
</script>
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-collection-tag"></i> 类型
          <span v-if="props.isSelected">（双击选中）</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <vxe-grid
        ref="xGrid"
        v-loading="loading"
        :columns="tableColumn"
        :data="queryList.list"
        :export-config="{types:['xlsx']}"
        :toolbar-config="tableToolbar"
        :tree-config="{transform: true,rowField: 'id', parentField: 'parentId'}"
        border
        highlight-current-row
        highlight-hover-row
        keep-source
        resizable
        show-footer
        show-overflow
        @cell-dblclick="waySelected">
      <template #toolbar_buttons>
        <el-button-group>
          <el-button style="margin-left: 10px;" @click="create.show=true;create.pid=''">新增</el-button>
          <el-button @click="waySearch">搜索</el-button>
        </el-button-group>
      </template>
      <template #operate="{row}">
        <el-button class="warning-color" type="text" @click="wayEdit(row)">编辑</el-button>
        <el-popconfirm
            cancel-button-text="不用了"
            class="ml-10"
            confirm-button-text="好的"
            icon="el-icon-info"
            icon-color="red-color"
            title="确定要删除吗？"
            @confirm="wayDel(row)">
          <el-button slot="reference" class="red-color" type="text">删除</el-button>
        </el-popconfirm>
        <el-button v-if="props.isSelected" class="btn_style ml-10" @click="waySelected(row)">选中</el-button>
      </template>
      <template #pager>
        <!--列表展示-->
        <pagination
            v-show="queryList.total>0"
            :limit.sync="queryList.limit"
            :page.sync="queryList.start"
            :total="queryList.total"
            @pagination="wayGetList"/>
      </template>
    </vxe-grid>
    <dom-create :item="create" @close="wayGetList"/>
    <dom-edit :item="edit" @close="wayGetList"/>
  </div>
</template>

<style scoped>
.ml-10 {
  margin-left: 10px;
}

.red-color {
  color: red;
}

.warning-color {
  color: #E6A23C;
}
</style>

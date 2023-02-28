<script>export default {name: 'NodeEdit'}</script>
<script setup>
// 线文字弹窗修改
import { reactive } from 'vue'

const props      = defineProps({
  graph: {
    type: Object | null,
    default: () => {
    },
  },
  cell: {
    default: () => {
    },
  },
})
const drawer     = reactive({
  show: false,
  content: '',
})
// 保存
const waySuccess = () => {
  props.cell.setData({
    content: drawer.content,
    isEditShow: false,
    id: '',
  })
  drawer.show = false
}
const wayDelete  = () => {
  props.cell.remove()
}
const wayShow    = () => {
  drawer.show     = true
  const {content} = props.cell.getData()
  drawer.content  = content
}
defineExpose({wayShow})
</script>
<template>
  <el-drawer
      title="修改"
      :visible.sync="drawer.show"
      direction="rtl"
      append-to-body
      @close="$emit('close')"
  >
    <div class="drawer-content">
      <div class="flex flex-row align-center">
        <div>名字：</div>
        <el-input style="width: 220px" v-model="drawer.content"/>
      </div>
      <div class="data-center">
        <el-button @click="wayDelete">删除</el-button>
        <el-button @click="waySuccess" type="primary" style="background-color: #10b4b4">保存</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
.drawer-content {
  position: relative;
  padding: 15px 50px;
  height: 100%;
}

::v-deep(.el-drawer__wrapper) {
  .el-dialog__close {
    color: #000000 !important;
  }

  .el-drawer__header {
    margin-bottom: 20px;
  }
}


.data-center {
  --ww: 20px;
  width: calc(100% - var(--ww) * 2);
  border-top: 1px solid #e8e8e8;
  position: absolute;
  margin-top: 20px;
  bottom: 0;
  right: 0;
  padding: 10px 20px;
  text-align: right;
}
</style>
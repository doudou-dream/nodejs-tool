<script>export default {name: 'Edit',}</script>
<script setup>
import {detail, edit} from '../api/api'
import {reactive, ref, watch} from 'vue'
import {Message} from 'element-ui'

// 传入参数 props
const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {
        show: false,
        id: ''
      }
    }
  }
})
// 数据判断
const rules = {
  name: [
    {required: true, message: '请输入名称', trigger: 'blur'}
  ]
}

// 数据判断
const form = reactive({
  id: '',
  code: '',
  name: '',
  content: '',
})
watch(() => props.item.id, (val) => {
  val && wayInit(val)
})
const wayInit   = (val) => {
  detail(val).then(res => {
    form.id      = val
    form.code    = res?.data?.data?.code
    form.name    = res?.data?.data?.name
    form.content = res?.data?.data?.content
  })
}
// 提交
const refForms  = ref(null)
const waySubmit = () => {
  refForms.value.validate((valid) => {
    if (!valid) {
      return false
    }
    edit(form).then(res => {
      Message.success('修改成功')
      props.item.show = false
    })
  })
}

</script>

<template>
  <el-dialog :visible.sync="item.show" append-to-body title="编辑" @close="$emit('close')">
    <el-form ref="refForms" :model="form" :rules="rules" label-width="auto" @submit.native.prevent="waySubmit">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="编码：" prop="code">
        <el-input v-model="form.code"/>
      </el-form-item>
      <el-form-item label="说明：" prop="content">
        <el-input v-model="form.content" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"/>
      </el-form-item>
      <div class="right">
        <el-button size="medium" type="success" @click="waySubmit">提交</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>
<style scoped>
</style>

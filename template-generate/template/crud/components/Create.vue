<script>export default {name: 'Create'}</script>
<script setup>
import {create} from '../api/api'
import {reactive, ref, watch} from 'vue'
import {Message} from 'element-ui'

// 传入参数 props
const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {
        show: false,
      }
    }
  }
})
watch(() => props.item.show, () => {
  form.name    = ''
  form.code    = ''
  form.content = ''
})
// 数据判断
const rules     = {
  name: [
    {required: true, message: '请输入名称', trigger: 'blur'}
  ]
}
const form      = reactive({
  code: '',
  name: '',
  content: '',
})
// 提交
const refForms  = ref(null)
const waySubmit = () => {
  refForms.value.validate((valid) => {
    if (!valid) {
      return false
    }
    create(form).then(res => {
      if (res?.data?.code === 0) {
        Message.success('创建成功')
        props.item.show = false
        refForms.value.resetFields()
      }
    })
  })
}
</script>
<template>
  <el-dialog :visible.sync="item.show" append-to-body title="新增" @close="$emit('close')">
    <el-form ref="forms" :model="form" :rules="rules" label-width="auto" @submit.native.prevent="waySubmit">
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

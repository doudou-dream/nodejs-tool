<script>
import { defineComponent } from 'vue'
import NodeEdit from './NodeEdit'
// 模板1
export default defineComponent({
  name: 'IconMain',
  components: { NodeEdit, NodeEditCompany },
  inject: ['getGraph', 'getNode'],
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      node: {},
      id: '',// id
      content: '',// 文字内容
      type: '',
      graph: {},
      isEditShow: false,// 是否开启弹窗
      url: '',// 展示svg图
    }
  },
  watch: {
    'isEditShow': function (boo) {
      if (boo) {
        this.wayEdit()
      }
    },
  },
  mounted() {
    this.node = this.getNode()
    this.graph = this.getGraph()
    // 初始化content数据
    const data = this.node.getData()
    this.isEditShow = data.isEditShow || false
    this.content = data.content
    this.id = data.id
    this.url = data.url
    this.type = data.type
    // 动态更新数据
    this.node.on('change:data', ({ current }) => {
      const { id, content, isEditShow, url, type } = current
      this.content = content
      this.id = id
      this.isEditShow = isEditShow
      this.url = url
      this.type = type
    })
  },
  methods: {
    wayEdit() {
      switch (this.type) {
        default:
          this.$refs.refNodeEdit.wayShow()
      }
    },
    wayCloseShow() {
      this.node.setData({
        isEditShow: false,
      })
    },
  },
})
// 使用
// const temp1 = graph.addNode({
//   shape: 'vue-icon-main',
//   data: {
//     content: 'hello',
//   },
// })
// // 更新数据
// setTimeout(() => {
//   const {content} = temp1.getData()
//   console.log('-> content', content)
//   temp1.setData({
//     content: '麦兜',
//   })
//   console.log('-> graph.toJSON()', graph.toJSON())
// }, 2000)

</script>
<template>
  <div class="icon-main">
    <img class="main-image" :src="url" alt="">
    <div class="main-content" v-text="content"></div>
    <NodeEdit ref="refNodeEdit" @close="wayCloseShow" :graph="graph" :cell="node" />
  </div>
</template>
<style scoped lang="scss">
.icon-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;

  .main-image {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .main-content {
    padding: 5px;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
  }
}
</style>

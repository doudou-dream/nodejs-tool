<script setup>
import { Graph, Shape } from '@antv/x6'
import { Dnd } from '@antv/x6-plugin-dnd'// 拖拽
import { Snapline } from '@antv/x6-plugin-snapline'// 辅助线
import { Transform } from '@antv/x6-plugin-transform' // 放大缩小
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import { dataTemp } from '../comm/icon'
import dataInterface from '../edge/edge'
// 注册相关组件
import './comm/install'
import './temp1'
import EdgeEdit from './edge/EdgeEdit'

const dnd = ref(null)
const graph = ref(null)
const props = defineProps({
  industryTypeId: {
    type: String | Number,
    default: () => '',
  },
  cell: {
    default: () => [],
  },
})
watch(() => props.cell, () => {
  graph.value.fromJSON(props.cell)
})
onMounted(() => {
  graph.value = new Graph({
    container: document.getElementById('container'),
    // 连接线
    connecting: {
      connector: {
        name: 'rounded',
        args: {
          radius: 8,
        },
      },
      anchor: 'center',
      connectionPoint: 'anchor',
      allowBlank: false,
      snap: true,
      allowLoop: false,
      allowNode: false,
      allowEdge: false,
      createEdge() {
        dataInterface.label = '点击修改'
        const dataEdge = dataInterface
        return new Shape.Edge(dataEdge)
      },
      validateConnection(obj) {
        return !!obj.targetMagnet
      },
    },
    background: {
      color: '#F2F7FA',
    },
    panning: {
      enabled: true,
    },
    grid: {
      size: 10,
    },
    mousewheel: {
      enabled: true,
      modifiers: ['ctrl', 'meta'],
    },
  })
  graph.value.centerContent() // 居中显示
  // 辅助线
  graph.value.use(
    new Snapline({
      enabled: true,
    }),
  )
  // 拖拽
  dnd.value = new Dnd({
    target: graph.value,
  })
  // 放大缩小组件
  graph.value.use(new Transform({
    resizing: {
      enabled: true,
      preserveAspectRatio: true,
    },
    rotating: true,
  }))
  // 移入
  graph.value.on('cell:mouseenter', ({ cell }) => {
    if (cell.isNode()) {
      cell.addTools([
        {
          name: 'boundary',
          args: {
            attrs: {
              fill: '#7c68fc',
              stroke: '#333',
              // stroke: 'none',
              'stroke-width': 1,
              'fill-opacity': 0.2,
            },
          },
        },
        {
          name: 'button-remove',
          args: {
            x: 0,
            y: 0,
            offset: { x: 10, y: 10 },
          },
        },
      ])
    } else {
      cell.addTools([
        {
          name: 'boundary',
          args: {
            attrs: {
              fill: '#7c68fc',
              stroke: '#333',
              'stroke-width': 1,
              'fill-opacity': 0.2,
            },
          },
        },
        {
          name: 'button-remove',
          args: {},
        },
      ])
    }
  })
  // 鼠标移除删除
  graph.value.on('cell:mouseleave', ({ cell }) => {
    cell.removeTools()
  })
  // 节点单机
  graph.value.on('node:click', (obj) => {
    // 展示编辑页面
    obj.node.setData({
      isEditShow: true,
    })
  })
  // 边单机点击修改
  graph.value.on('edge:click', (obj) => {
    drawerEdge.cell = obj.cell
    nextTick(() => {
      refDrawerEdge.value.wayShow()
    })
  })
  graph.value.fromJSON(props.cell)
})
// 按下后加入组件
const wayMouseDown = (e, obj) => {
  const data = {
    shape: obj.shape,
    data: {
      url: obj.url,
      content: '点击修改',
      id: '',
      isEditShow: false,
      type: obj.type,
      industryTypeId: props.industryTypeId,
    },
  }
  if (obj.w && obj.h) {
    data.width = obj.w
    data.height = obj.h
  }
  let node = graph.value.createNode(data)

  dnd.value.start(node, e)
}
// 边框修改
const refDrawerEdge = ref(null)
const drawerEdge = reactive({
  cell: {},
})
//返回json数据
const wayToJson = () => {
  return graph.value.toJSON()
}
// 保存按钮回调
const emits = defineEmits(['waySuccess'])
const waySuccess = () => {
  emits('waySuccess', graph.value.toJSON())
}
defineExpose({ wayToJson })
</script>

<template>
  <div class="flex flex-row hw-full">
    <div class="temp-sub">
      <div class="sub-title">
        <h4>可选</h4>
      </div>
      <div class="temp-sub-box">
        <div class="sub-div" v-for="item in dataTemp" @mousedown="wayMouseDown($event, item)">
          <img width="100px" :src="item.url" alt="">
          <div class="text-center">{{ item.name }}</div>
        </div>
      </div>
      <el-button @click="waySuccess">保存</el-button>
    </div>
    <!--画板-->
    <div id="container"></div>
    <!--边弹窗修改-->
    <EdgeEdit ref="refDrawerEdge" :cell="drawerEdge.cell" :graph="graph" />
  </div>
</template>
<style lang="scss">
.el-drawer__wrapper {
  .el-dialog__close {
    color: #000000 !important;
  }

  .el-drawer__header {
    margin-bottom: 0;
    padding-bottom: 20px;
    border-bottom: 1px solid #e8e8e8;
  }
}
</style>
<style scoped lang="scss">
.temp-sub {
  display: flex;
  flex-direction: column;
  padding: 1rem;

  .sub-title {
    margin-bottom: 1rem;
    text-align: center;
  }

  .temp-sub-box {
    height: calc(100% - 14rem);
    padding: 1rem;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 1rem;
  }

  .sub-div {
    margin-bottom: 1rem;

    .text-center {
      text-align: center;
    }
  }
}

.temp-sub ::-webkit-scrollbar {
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 0.25rem !important;
  width: 0.25rem !important;
  border-radius: 0.25rem !important;
}

/*滚动条里面小方块*/
.temp-sub ::-webkit-scrollbar-thumb {
  border-radius: 0.25rem !important;
  --tw-bg-opacity: 1 !important;
  /* 颜色 */
  background-color: rgba(156, 163, 175, var(--tw-bg-opacity)) !important;
}

/*滚动条轨道*/
.temp-sub ::-webkit-scrollbar-track {
  --tw-bg-opacity: 1 !important;
  border-radius: 0.25rem !important;
  background-color: rgba(209, 213, 219, var(--tw-bg-opacity)) !important;
}

.hw-full {
  width: 100%;
  height: 100%;
}

#container {
  width: 100%;
  height: 100%;
  flex: 1;
}

::v-deep(.el-drawer__wrapper .el-dialog__close) {
  color: #000000 !important;
}
</style>
// 连接线注册
import { Graph } from '@antv/x6'

const dataInterface = {
  attrs: {
    line: {
      stroke: '#A2B1C3',
      strokeWidth: 2,
      targetMarker: {
        name: 'block',
        width: 12,
        height: 8,
      },
      'stroke-dasharray': '2'
    },
    rect: {
      style: {
        cursor: 'pointer',
      },
    },
  },
  label: '',
  zIndex: 0,
}

export function initDdEdgeLabel() {
  Graph.registerEdge(
      'dd-edge-label',
      dataInterface,
      true,
  )
}

export default dataInterface

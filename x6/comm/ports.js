// 连接桩
// 布局 六边形布局器
import { Graph } from '@antv/x6'

export function wayMdLay() {
  Graph.registerPortLayout('mdLay', (portsPositionArgs, elemBBox) => {
    return portsPositionArgs.map((_, index) => {
      const height = elemBBox.height + 24
      let r    = height / 2
      let n    = 12
      // 内六边形半径 elemBBox.height / 4 * Math.tan(15 * Math.PI/180)
      const nR = (height / 2) - height / 4 * Math.tan(15 * Math.PI / 180)
      return {
        position: {
          x: elemBBox.width / 2 +
              ((index + 1) % 2 !== 0 ? nR : r)
              * Math.cos(2 * Math.PI * index / n),
          y: elemBBox.height / 2 +
              ((index + 1) % 2 !== 0 ? nR : r)
              * Math.sin(2 * Math.PI * index / n),
        },
        angle: 0,
      }
    })
  })
}

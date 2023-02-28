import { register } from '@antv/x6-vue-shape'
import IconMain from './temp1/Hexagon'

// 注册组件
//   width: 80,
//   height: 92.37608,
register({
  shape: 'vue-temp-hexagon',
  width: 100,
  height: 115.4701,
  component: IconMain,
  data: { content: '' },
  ports: {
    groups: {
      layouts: {
        position: {
          name: 'mdLay',// 连接桩布局算法
          args: { dr: 10 },
        },
        attrs: {
          circle: {
            magnet: true,
            stroke: '#8f8f8f',
            r: 3,
          },
        },
        label: {
          position: 'top',
        },
      },
    },
    items: [
      { id: 'temp1', group: 'layouts' },
      { id: 'temp2', group: 'layouts' },
      { id: 'temp3', group: 'layouts' },
      { id: 'temp4', group: 'layouts' },
      { id: 'temp5', group: 'layouts' },
      { id: 'temp6', group: 'layouts' },
      { id: 'temp7', group: 'layouts' },
      { id: 'temp8', group: 'layouts' },
      { id: 'temp9', group: 'layouts' },
      { id: 'temp10', group: 'layouts' },
      { id: 'temp11', group: 'layouts' },
      { id: 'temp12', group: 'layouts' },
    ],
  },
})
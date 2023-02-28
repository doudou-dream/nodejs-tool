import temp1 from '../../accets/temp1.svg'
import temp2 from '../../accets/temp2.svg'
// 图表库
export const dataTemp = [
  { type: 'temp1', url: temp1, name: '测试1', shape: 'vue-temp-hexagon' },
  { type: 'temp2', url: temp2, name: '测试2', shape: 'vue-temp-hexagon' },
]

export function getTempUrl(temp) {
  return dataTemp.find(v => v.type === temp).url
}
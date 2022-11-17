import request from '@/utils/request'

/**
 * 列表
 * @param data
 * @returns {AxiosPromise}
 */
export function getList(data) {
  return request({
    url: '/__api/demo/all',
    method: 'POST',
    data
  })
}
/**
 * 创建
 * @param data
 * @returns {AxiosPromise}
 */
export function create(data) {
  return request({
    url: '/__api/demo/insert',
    method: 'POST',
    data
  })
}
/**
 * 删除
 * @param data
 * @returns {AxiosPromise}
 */
export function del(data) {
  return request({
    url: '/__api/demo/remove',
    method: 'POST',
    data
  })
}
/**
 * 修改
 * @param data
 * @returns {AxiosPromise}
 */
export function edit(data) {
  return request({
    url: '/__api/demo',
    method: 'POST',
    data
  })
}
/**
 * 详情
 * @param id
 * @returns {AxiosPromise}
 */
export function detail(id) {
  return request({
    url: `/__api/demo/${id}`,
    method: 'POST',
  })
}

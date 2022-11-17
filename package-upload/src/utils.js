/**
 * 获取日期
 * @returns {string}
 * @param date
 */
function getDate(date = new Date()) {
  // const date = new Date()
  date.setDate(date.getDate())
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  return year + '-' + month + '-' + day
}
module.exports = {
  getDate: getDate
}

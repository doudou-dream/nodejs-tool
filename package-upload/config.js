/**
 * 配置信息
 */
// eslint-disable-next-line no-undef
module.exports = server = {
  title: '标题',
  local_path: './dist/', // 本地上传目录
  host: '', // 服务器地址
  port: '22', // 服务武器端口
  username: '', // 服务账号
  password: '', // 服务器密码
  server_path: '/www/wwwroot', // 上传到服务器路径
  server_path_del: '/www/wwwroot/xxx', // 服务器路径需要删除的路径
  command: [] // 服务器需要执行的命令
}

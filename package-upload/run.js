/**
 * pnpm add -D chalk scp2 ssh2 compressing ora fs path
 */
const sshCmd = require('./src/ssh.js')
const uploadFile = require('./src/scp2.js')
const zipFile = require('./src/zip.js')
const utils = require('./src/utils')
const config = require('./config.js')

async function mainRun() {
  // 通过命令删除服务器旧文件
  await sshCmd([
    `mkdir -p ${config.server_path}`,
    `rm -rf ${config.server_path_del}`
  ])
  // 打包好的文件上传到服务器指定目录
  await uploadFile(config.local_path, config.server_path)
  // 压缩打包后文件
  await zipFile(config.local_path, `./zip/${config.title}.zip`)
  // 通过命令根据日期生成目录
  await sshCmd([
    `mkdir -p ${config.server_path}/zip`,
    `mkdir -p ${config.server_path}/zip/${utils.getDate()}`,
    `rm -rf ${config.server_path}/zip/${utils.getDate()}/${config.title}.zip`
  ])
  // 压缩文件上传到服务器指定目录
  await uploadFile('./zip/', `${config.server_path}/zip/${utils.getDate()}`)
}
// 执行
mainRun().then(() => {})

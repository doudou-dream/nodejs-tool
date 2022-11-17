/**
 * 上传服务
 */
const chalk = require('chalk')
const client = require('scp2')
const server = require('../config.js')
const ora = require('ora')

// 传输文件
async function uploadFile(inputPath, outPath) {
  const spinner = ora(`正在上传${inputPath}文件到服务器${outPath}上... \n`)
  spinner.start()
  await new Promise((resolve, reject) => {
    client.scp(
      inputPath,
      {
        host: server.host, // 地址
        username: server.username, // 用户
        password: server.password, // 密码
        port: server.port, // 端口
        path: outPath // 路径
      },
      function(err) {
        if (!err) {
          console.log(
            chalk.green(`success! 成功发布到' + server.host + '服务器：${outPath} \n`)
          )
          spinner.stop()
          resolve(true)
        } else {
          console.log(chalk.red('Fail! 发布失败.\n'))
          console.log('err', err)
          reject(false)
        }
      }
    )
  })
}

module.exports = uploadFile

/**
 * ssh服务
 */
const Client = require('ssh2').Client
const server = require('../config.js')
const chalk = require('chalk')

/**
 * 执行命令
 * @param cmd Array
 */
async function sshCmd(cmd = []) {
  const conn = new Client()
  // 执行的命令
  return await new Promise((resolve) => {
    conn
      .on('ready', function async() {
        conn.exec(cmd.join('\n'), function(err, stream) {
          if (err) {
            const errorMsg = 'shellCmd ERROR: ' + err.toString()
            console.log(chalk.red(`${errorMsg} \n`))
            throw err
          }
          stream
            .on('close', async(code, signal) => {
              // 结束 code: 代码 signal: 信号
              if (code !== 0) {
                const signalMsg = `脚本异常退出code: ${code}，异常信号signal:${signal}`
                console.log(chalk.red(`${signalMsg} \n`))
                conn.end()
              }
              // 程序执行成功
              conn.end()
              console.log(chalk.blue('已执行命令行'))
              console.log(chalk.blue(cmd))
              console.log('\n')
              resolve(true)
            })
            .on('data', async(data) => {
              // 数据 程序执行中echo出的数据
              const dataStr = 'STDOUT: ' + data.toString()
              console.log(chalk.blue(`${dataStr} \n`))
            })
            .stderr.on('data', async(data) => {
            // 标准错误
              const dataStr = 'STDERR: ' + data.toString()
              console.log(chalk.red(`${dataStr} \n`))
            })
        })
      })
      .on('error', function(err) {
        console.log(chalk.red('Fail! 服务器连接失败.\n'))
        throw err
      })
      .connect({
        host: server.host,
        port: server.port,
        username: server.username,
        password: server.password
      })
  })
}

module.exports = sshCmd

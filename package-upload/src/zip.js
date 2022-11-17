/**
 * 压缩服务
 */
const compressing = require('compressing')
const fs = require('fs')// 获取文件系统模块，负责读写文件
const path = require('path')
const chalk = require('chalk')

// 工具模块，处理文件路径的小工具
/**
 * 删除文件夹
 * @param dir 路径
 */
async function removeDir(dir) {
  if (!fs.existsSync(dir)) {
    return false
  }
  const files = fs.readdirSync(dir)
  for (let i = 0; i < files.length; i++) {
    const newPath = path.join(dir, files[i])
    const stat = fs.statSync(newPath)
    if (stat.isDirectory()) {
      // 如果是文件夹就递归下去
      await removeDir(newPath)
    } else {
      // 删除文件
      fs.unlinkSync(newPath)
    }
  }
  fs.rmdirSync(dir)// 如果文件夹是空的，就将自己删除掉
}

/**
 * 创建文件夹
 * @param dir 路径
 */
async function createFile(dir) {
  fs.mkdirSync(dir)
}

/**
 * 处理文件夹数据
 * @param file
 * @returns {Promise<void>}
 */
async function init(file) {
  const path = file.split('/')
  path.pop()
  await removeDir(path.join('/'))
  await createFile(path.join('/'))
}

/**
 * 压缩文件
 * @returns
 * @param inputFile
 * @param outFile
 */
async function zipFile(inputFile, outFile) {
  await init(outFile)
  return await new Promise((resolve, reject) => {
    compressing.zip
      .compressDir(inputFile, outFile, {
        zipFileNameEncoding: 'utf-8'
      })
      .then(() => {
        console.log(chalk.green(`文件压缩完成，路径：${inputFile} \n`))
        resolve(true)
      })
      .catch((err) => {
        console.log(chalk.green('文件失败 \n'))
        console.error(err)
        reject(err)
      })
  })
}

module.exports = zipFile

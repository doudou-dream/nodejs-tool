/**
 * 压缩服务
 */
import compressing from 'compressing'
import fs from 'fs'// 获取文件系统模块，负责读写文件
import path from 'path'
// import { fileURLToPath } from 'node:url';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
  if (fs.existsSync(dir)) {
    return false
  }
  fs.mkdirSync(dir)
}

/**
 * 处理文件夹数据
 * @param file
 * @returns {Promise<void>}
 */
async function init(file) {
  const bPath = path.dirname(file)
  // await removeDir(bPath)
  await createFile(bPath)
}

/**
 * 压缩文件
 * @returns
 * @param inputFile
 * @param outFile
 */
export async function zipFile(inputFile, outFile) {
  if (!fs.existsSync(inputFile)) {
    console.log('文件或者文件夹不存在')
    return false;
  }
  await init(outFile)
  return await new Promise((resolve, reject) => {
    compressing.zip
      .compressDir(inputFile, outFile, {
        zipFileNameEncoding: 'utf-8',
        ignoreBase: true
      })
      .then(() => {
        console.log(`文件压缩完成，路径：${inputFile} \n`)
        resolve(true)
      })
      .catch((err) => {
        console.log('文件失败 \n')
        console.error(err)
        reject(err)
      })
  })
}


/**
 * 解压文件
 * @returns
 * @param inputFile
 * @param outFile
 */
export async function unzipFile(inputFile, outFile) {
  if (!fs.existsSync(inputFile)) {
    console.log('文件或者文件夹不存在')
    return false;
  }
  await init(outFile)
  return await new Promise((resolve, reject) => {
    compressing.zip
      .uncompress(inputFile, outFile, {
        zipFileNameEncoding: 'utf-8',
      })
      .then(() => {
        console.log(`文件压缩完成，路径：${inputFile} \n`)
        resolve(true)
      })
      .catch((err) => {
        console.log('文件失败 \n')
        console.error(err)
        reject(err)
      })
  })
}
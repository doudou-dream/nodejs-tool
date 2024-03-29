// 创建文件
const fs = require('fs')
const path = require('path')

const pathResolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(`${message}`)
const successLog = message => console.log(`%c ${message}`, 'color: #16a951')
const errorLog = error => console.log(`%c ${error}`, 'color: #bf242a')

// 创建文件
function createFile(path, data) {
    if (fs.existsSync(path)) {
        errorLog(`${path}文件已存在`)
        return
    }
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, 'utf8', err => {
            if (err) {
                errorLog(err.message)
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}

// 创建文件夹
async function createDir(directory) {
    return await new Promise(resolve => {
        mkdirs(directory, function () {
            resolve()
        })
    })
}

// 递归创建目录
function mkdirs(directory, callback) {
    const exists = fs.existsSync(directory)
    if (exists) {
        callback()
    } else {
        mkdirs(path.dirname(directory), () => {
            fs.mkdirSync(directory)
            callback()
        })
    }
}

// 同步读取文件
const readFiles = async (path) => {
    return await new Promise(resolve => {
        Promise.all(listFile(path)).then(res => {
            resolve(res)
        })
    })
}

// 递归读取目录
function listFile(dir, list = []) {
    let files = fs.readdirSync(dir)
    for (const file of files) {
        let fullpath = path.join(dir, file)
        let stats = fs.statSync(fullpath)
        if (stats.isDirectory()) {
            listFile(fullpath, list)
        } else {
            list.push(fullpath)
        }
    }
    return list
}

/**
 * 文件路径最后一级
 * @private
 */
function pathLastLevel(path) {
    const temp = path.replaceAll('\\', '/').split('/')
    return temp[temp.length - 1]
}

/**
 * 删除文件路径最后一级
 * @private
 */
function removePathLastLevel(path) {
    let temp = path.replaceAll('\\', '/')
    return temp.split('/').slice(0, -1).join('/')
}

/**
 * 管道流创建文件
 * @param inputFile 需要拷贝文件路径
 * @param outputFile 输出文件路径
 */
function createFileFlow(inputFile, outputFile) {
    const read = fs.createReadStream(inputFile);
    const write = fs.createWriteStream(outputFile);
    read.pipe(write);
}

module.exports = {
    readFiles,
    createFile,
    createDir,
    log,
    successLog,
    pathResolve,
    pathLastLevel,
    removePathLastLevel,
    createFileFlow
}

const utils = require('./utils')
const fs = require('fs')
const config = require('../config.js')
// 配置文件名称
const readName = utils.pathLastLevel(config.template_path).replace(/^\S/, s => s.toUpperCase())

/**
 *
 * @param {String} inputPath 路径
 * @param {String} inputApiPrefix api前缀
 */
async function createTemplate(inputPath, inputApiPrefix) {
    // 输入的路径
    inputPath = String(inputPath).trim().toString()
    const inputName = utils.pathLastLevel(inputPath)
    // 读取模板目录所有文件
    const files = await utils.readFiles(utils.pathResolve('../' + config.template_path))
    // 需要写入的文件集合
    let newData = []
    // 替换新名字
    const newFileName = inputName.replace(/^\S/, s => s.toUpperCase())
    for (const file of files) {
        let content = fs.readFileSync(file).toString() // 文件内容
        let pathFile = file.replaceAll('\\', '/').split(config.template_path.substring(1))//文件路径
        // 新地址替换
        pathFile = utils.pathResolve('../' + inputPath) + pathFile[1]
        // 文件引用名字替换
        content = content.replaceAll(readName, newFileName)
        pathFile = pathFile.replaceAll(readName, newFileName)
        // api前缀替换
        if (inputApiPrefix) {
            content = content.replaceAll(config.api_prefix, _formatApiPrefix(inputApiPrefix))
        }

        newData.push({
            content: content,//内容
            dir: utils.removePathLastLevel(pathFile),// 文件夹路径
            path: pathFile,//文件路径
        })
    }

    for (const newDataElement of newData) {
        utils.log(`正在生成 文件目录 ${newDataElement.path}`)
        await utils.createDir(newDataElement.dir) // 创建文件夹
        await utils.createFile(newDataElement.path, newDataElement.content) // 创建文件
    }
    utils.successLog('文件生成成功')
}

/**
 * 判断是否前边有’/‘ 后边是否有’/‘
 * @param {String} value 格式化入参
 * @returns
 */
function _formatApiPrefix(value) {
    if (!value) {
        return ''
    }
    value = value.replaceAll('\\', '/')
    if (value.substring(0, 1) !== '/') {
        value = '/' + value
    }
    if (value.substring(value.length - 1) !== '/') {
        value = value + '/'
    }
    return value
}


module.exports = createTemplate

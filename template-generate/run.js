/**
 * 约定：
 * 1. 文件目录最后一级是文件的名字
 */
const readline = require("readline");
const fs = require('fs')
const createTemplate = require("./src/createTemplate");
const utils = require("./src/utils");

const com = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function mainRun() {
    let cmd = {
        dirPath: '',// 路径
        apiUrl: '',// 文件夹
    };
    // 请输入文件路径
    cmd.dirPath = await comDir()
    // 请输入api前缀
    cmd.apiUrl = await new Promise((resolve) => {
        com.question(`请输入api前缀 `, (val) => {
            resolve(val);
        });
    });
    // 退出
    com.close();
    createTemplate(cmd.dirPath, cmd.apiUrl)
}

/**
 * 文件路径输入判断
 * @returns
 */
async function comDir() {
    return await new Promise((resolve) => {
        com.question(`请输入文件路径：`, async (val) => {
            // 判断主目录是否存在
            const projectDirectory = utils.pathResolve(val)
            const isDir = fs.existsSync(projectDirectory)
            if (isDir) {
                // 判断目录是否存在
                console.log(`${projectDirectory}  项目目录已存在，请重新输入`)
                resolve(await comDir())
            }
            resolve(val);
        });
    });
}
mainRun().then(() => { })

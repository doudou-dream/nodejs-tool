import path from "path";
import http from "http";
import https from "https";
import fs from "fs";
import ora from 'ora';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sep = path.sep;
// const imgs = [
//     'https://img-blog.csdnimg.cn/3d809148c83f4720b5e2a6567f816d89.jpeg',
//     'https://img-blog.csdnimg.cn/5a26bb2e6eb74aa0ac42d44bef0f61c2.jpeg',
//     'https://img-blog.csdnimg.cn/fcc22710385e4edabccf2451d5f64a99.jpeg'
// ]
// const img = "https://img-blog.csdnimg.cn/6d15082ac7234ec7a16065e74f689590.jpeg";
// const img = "https://kaifa.ruanbangban.com/zip/2023-01-15/pc%E7%94%B5%E8%84%91%E7%AB%AF.zip";
/**
 * 将数据块数组chunks中第index个数据块写入distFileName对应文件的末尾
 * @param{*}distFileName数据写入文件名
 * @param{*}chunks图片数据块数组
 */
function write(distFileName, chunks = []) {
    if (!fs.existsSync(path.dirname(distFileName))) {
        console.log("🚀 ~ 文件夹 %s 不存在", path.dirname(distFileName));
        return false;
    }
    var i = 0;
    //判断文件是否重名，若重名则重新生成带序号的文件名
    let tmpFileName = distFileName;
    while (fs.existsSync(tmpFileName)) {
        tmpFileName = distFileName.replace(
            new RegExp(`^(.*?)([^${sep}\\.]+)(\\..*|$)`),
            `$1$2_${i}$3`
        );
        i += 1;
    }
    distFileName = tmpFileName;
    //获取图片数据块依次写入文件
    if (!chunks) {
        console.log("文件内容为空");
        return false;
    }
    for (const chunk of chunks) {
        fs.appendFileSync(distFileName, chunk);
    }
    console.log("文件(%s)写入完毕", distFileName);
}
/**
 * 下载指定url对应的文件
 * @param {*} fileUrl 目标文件url
 * @param {*} timeout 超时时间毫秒数
 */
export function downloadFile(fileUrl, timeout = 10000) {
    //URL作为options
    const options = new URL(fileUrl);
    //根据协议选择发送请求的模块
    const _http = options.protocol === "https:" ? https : http;
    //从url中提取文件名
    const matches = fileUrl.match(/(?<=.*\/)[^\/\?]+(?=\?|$)/);
    const FileName = matches && matches[0];
    const pathFileName = path.join(__dirname, 'imgs' + sep) + FileName
    if (!fs.existsSync(path.dirname(pathFileName))) {
        console.log("🚀 ~ 文件夹 %s 不存在", path.dirname(pathFileName));
        return false;
    }
    const req = _http.request(options, (res) => {
        //判断数据是否图片类型，仅保存图片类型的文件
        const contentType = res.headers["content-type"];
        const spinner = ora(`正在下载文件${fileUrl}，文件类型：${contentType}... \n`)
        spinner.start()
        //存储图片数据到内存中
        const chunks = [];
        res.on("data", (chunk) => {
            chunks.push(chunk);
        });
        res.on("end", () => {
            //若相应正常结束，将内存中的数据写入到文件夹中
            if (res.complete) {
                spinner.stop()
                write(pathFileName, chunks);
            } else {
                spinner.stop()
                console.log("(%s)下载结束但未完成", fileUrl);
            }
        });
    });
    //如果超时间则中止当前请求
    req.setTimeout(timeout, () => {
        console.log("下载（%s）超时", fileUrl);
    });
    req.end();
}
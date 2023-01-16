// 下载
import { downloadFile } from './download.js'
const files = [
    'https://img-blog.csdnimg.cn/3d809148c83f4720b5e2a6567f816d89.jpeg',
    'https://img-blog.csdnimg.cn/5a26bb2e6eb74aa0ac42d44bef0f61c2.jpeg',
    'https://img-blog.csdnimg.cn/fcc22710385e4edabccf2451d5f64a99.jpeg'
]
for (const url of files) {
    downloadFile(url)
}
// 压缩，解压
// import { zipFile, unzipFile } from './zip.js'
// zipFile('./imgs', './zip/test.zip')
// unzipFile('./zip/test.zip', './unzip/')
## 1. 模板生成工具类(template-generate)

```sh
cd template-generate
pnpm init
pnpm add -D readline
node  run.js
```

## 2. 打包上传服务器(package-upload)

```sh
cd template-generate
pnpm init
pnpm add -D chalk scp2 ssh2 compressing ora fs path
node  run.js
```

## 3. 下载文件，解压、压缩文件(download-zip)

## 4. antv x6 基本使用实例(x6)

```sh
cd template-generate
pnpm init
pnpm add -D http https compressing
```

![大数据看板1](./assets/1117b41e08310638408d63a8fff250c.png)
![大数据看板2](./assets/01d6158786ac5981afb660ce68a30d2.png)
![大数据看板3](./assets/4cc2a045b1c174aba48aa1c31bc0d08.png)
![大数据看板4](./assets/5529979865891a626b2e53f5f7e9bb2.png)

```javascript
//复制文本
copyText(text) {
    var element = this.createElement(text);
    element.select();
    element.setSelectionRange(0, element.value.length);
    document.execCommand('copy');
    element.remove();
    this.$toast.success('已复制到剪切板');
},
//创建临时的输入框元素
createElement(text) {
    var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    var element = document.createElement('textarea');
    // 防止在ios中产生缩放效果
    element.style.fontSize = '12pt';
    // 重置盒模型
    element.style.border = '0';
    element.style.padding = '0';
    element.style.margin = '0';
    // 将元素移到屏幕外
    element.style.position = 'absolute';
    element.style[isRTL ? 'right' : 'left'] = '-9999px';
    // 移动元素到页面底部
    let yPosition = window.pageYOffset || document.documentElement.scrollTop;
    element.style.top = `${yPosition}px`;
    //设置元素只读
    element.setAttribute('readonly', '');
    element.value = text;
    document.body.appendChild(element);
    return element;
}
```

```javascript
// 输入文件地址','返回文件格式
getFormat(value) {
    const arr = value.match(/^.*\.(.{3,4})$/)
    if (arr.length < 2) {
    return ''
    }
    const suffix = arr[1].toUpperCase()
    const img = ['BMP', 'JPG', 'PNG', 'TIF', 'GIF', 'PCX', 'TGA', 'EXIF', 'FPX', 'SVG', 'PSD', 'CDR', 'PCD', 'DXF', 'UFO', 'EPS', 'AI', 'RAW', 'WMF', 'WEBP', 'AVIF', 'APNG']
    if (img.some(val => val === suffix)) {
    return 'img'
    }
    const mp3 = ['MP3', 'WMA', 'WAV', 'APE', 'FLAC', 'OGG', 'AAC']
    if (mp3.some(val => val === suffix)) {
    return 'mp3'
    }
    const mp4 = ['AVI', 'WMV', 'MPEG', 'MP4', 'M4V', 'MOV', 'ASF', 'FLV', 'F4V', 'RMVB', 'RM', '3GP', 'VOB']
    if (mp4.some(val => val === suffix)) {
    return 'mp4'
    }
    if (suffix === 'PDF') {
    return 'pdf'
    }
    return ''
}
```

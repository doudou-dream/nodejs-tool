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

![x6看板](./x6/assets/63274ea99c2d96b69028dd4ddda56d4.png-1)

```sh
cd template-generate
pnpm init
pnpm add -D http https compressing
```

![大数据看板1](./assets/1117b41e08310638408d63a8fff250c.png-1)
![大数据看板2](./assets/01d6158786ac5981afb660ce68a30d2.png-1)
![大数据看板3](./assets/4cc2a045b1c174aba48aa1c31bc0d08.png-1)
![大数据看板4](./assets/5529979865891a626b2e53f5f7e9bb2.png-1)

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

## Prototype 原型对象

> 每一个函数上，都有一个原型对象 Prototype

- 用在构造函数上，我们可以给构造函数的原型 Prototype，添加方法
- 如果将方法添加到构造构造函数的 Prototype 原型对象上，构造函数构造出来的对象共享原型上的所有方法

### 原型链继承

```javascript
var arr1 = [10, 23, 244, 34];
var arr2 = [23, 435, 45, 546, 546];

Array.prototype.sum = function () {
  var res = 0;
  for (var i = 0; i < this.length; i++) {
    res += this[i];
  }
  return res;
};

console.log(arr1.sum());
console.log(arr2.sum());
console.log(arr1.sum == arr2.sum); // true
```

### 原型链继承

```javascript
// 错误的写法
Cat.Prototype = Dog.Prototype();

// 正确写法
for (var funcName in Dog.Prototype) {
  Cat.Prototype[funcName] = Dog.Prototype[funcName];
}
```

## vant 加载

```javascript
//外联样式
function loadCss(url) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

//设置src，引入外部远程js，此时
function loadJS(url, callback) {
  var script = document.createElement("script");
  fn = callback || function () {};
  script.type = "text/javascript";
  //IE 判断js是否执行完成
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        fn();
      }
    };
  } else {
    //其他浏览器，判断js是否执行完成
    script.onload = function () {
      fn();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

loadCss("https://unpkg.com/vant@2.12/lib/index.css");

async function useLoadVant(callback) {
  await new Promise((resolve) => {
    loadJS("https://unpkg.com/vue@2.6.14/dist/vue.min.js", function () {
      resolve(true);
    });
  });
  await new Promise((resolve) => {
    loadJS("https://unpkg.com/vant@2.12.54/lib/vant.min.js", function () {
      resolve(true);
    });
  });
  callback && callback();
}
```

## javascript unicode 编码

```javascript
/**
 * 加密
 * @param {string} str
 */
const enunicode = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    // 获取每个字符的Unicode编码，并转换为16进制字符串
    let unicode = str.charCodeAt(i).toString(16);
    // 拼接成完整的Unicode编码
    result += "\\u" + "0000".substring(0, 4 - unicode.length) + unicode;
  }
  return result;
};
/**
 * 解密
 * @param {string} str
 */
const deuncode = (str) => {
  let arrUnicode = str.split("\\u");
  let result = "";
  for (let i = 1; i < arrUnicode.length; i++) {
    // 将16进制Unicode编码转换成10进制数值
    let charCode = parseInt(arrUnicode[i], 16);
    // 将Unicode编码解码成字符
    result += String.fromCharCode(charCode);
  }
  return result;
};
let result = enunicode("中文汉字");
console.log(result);
result = deuncode(result);
console.log(result);
```

## PHP 手动设置 cookie

```php
header('Set-Cookie: ' . ($_W['config']['cookie']['pre'] . $key . '=' . rawurlencode($value))
			. (!empty($expire) ? ('; expires=' . $expire) : '')
			. (!empty($_W['config']['cookie']['path']) ? ('; Path=' . $_W['config']['cookie']['path']) : '')
			. (!empty($_W['config']['cookie']['domain']) ? ('; Domain=' . $_W['config']['cookie']['domain']) : '')
			. '; SameSite=None; Secure'
			. (!$httponly ? '' : '; HttpOnly'), false);
```

## js-print

> js 原生局部打印

## js 原生事件

### 实例

```javascript
// 创建一个名为 'myCustomEvent' 的自定义事件，并携带一个传递参数
const event = new CustomEvent("myCustomEvent", { detail: { foo: "bar" } });
// 触发事件
dispatchEvent(event);

// 添加事件监听器
addEventListener("myCustomEvent", function (event) {
  console.log("接收到参数：", event.detail);
});
// 移出事件
removeEventListener('myCustomEvent', myEventHandler);
```

### 方法封装

```javascript
/**
 * 触发事件
 * name string 名字
 * param object
 */
function trigger(name, params = {}) {
  const event = new CustomEvent(name, params);
  // 触发事件
  dispatchEvent(event);
}
/**
 * name string字符串
 * callback function方法
 */
function on(name, callback) {
  addEventListener(name, function (event) {
    callback(event);
  });
}
```

## ajax 请求封装

```javascript
/**
 * ajax 请求封装
 **/
function ajaxPost(url, data){
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.responseType = 'json';

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
        } else {
            reject(xhr.statusText);
        }
    };

    xhr.onerror = function() {
        reject('Network error');
    };

    xhr.send(JSON.stringify(data));
  });
}
/**
 * ajax 文件上传封装
 **/
function ajaxFile(url, data){
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.responseType = 'json';

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
        } else {
            reject(xhr.statusText);
        }
    };

    xhr.onerror = function() {
        reject('Network error');
    };

    xhr.send(data);
});
}
```

## js 获取视频封面图base64

```javascript
getVideoBase64(url){
  return new Promise(function (resolve, reject) {
    let dataURL = '';
    let video = document.createElement("video");
    video.setAttribute('crossOrigin', 'anonymous');//处理跨域
    video.setAttribute('src', url);
    video.setAttribute('width', '100%');
    video.setAttribute('height', '100%');
    video.setAttribute('preload', 'auto');
    video.addEventListener('loadeddata', function () {
      let canvas = document.createElement("canvas"),
          width = video.videoWidth, //canvas的尺寸和图片一样
          height = video.videoHeight;
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
      dataURL = canvas.toDataURL('image/jpeg'); //转换为base64
      resolve(dataURL);
    });
  })
},
```


// 将Base64转换为Blob
function base64_to_file(base64,filename) {
    if (!base64) {
        return null;
    }
    // 去掉Base64字符串的头部部分，例如 "data:image/png;base64,"
    var base64String = base64.split(',')[1];

    // 将Base64字符串解码为字节数组
    var byteCharacters = atob(base64String);

    // 创建一个字节数组
    var byteArray = new Uint8Array(byteCharacters.length);

    // 填充字节数组
    for (var i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
    }

    // 使用Blob构造函数创建一个Blob对象
    var blob = new Blob([byteArray], {type: 'application/octet-stream'});

    // 创建File对象
    var file = new File([blob], filename, {type: 'application/octet-stream'});
    return file;
}

// 对象合并
function merge(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}

// 创建裁剪对象
function on_crop_img(id, option) {
    var image = document.getElementById(id);
    // 对象合并
    var _def_option = {
        dragMode: 'move',
    }
    _def_option = merge(_def_option, option)
    return new Cropper(image, _def_option);
}


// 创建按钮
function create_button_def(option) {
    var defBtn = document.createElement('button');
    defBtn.id = option.id || Math.random().toString(36).substring(7);
    defBtn.style.backgroundColor = option.backgroundColor || '#007bff';
    defBtn.style.color = option.color || '#fff';
    defBtn.style.border = 'none';
    defBtn.style.padding = '5px 10px';
    defBtn.style.borderRadius = '3px';
    defBtn.style.cursor = 'pointer';
    defBtn.style.outline = 'none';
    defBtn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    defBtn.style.transition = 'background-color 0.3s ease';
    defBtn.style.fontSize = '14px';
    defBtn.style.fontWeight = 'bold';
    defBtn.style.border = '0px solid #000 !important';
    defBtn.innerHTML = option.title || '空';
    return defBtn
}

// 文件转图片 最低 ie10 +
function file_to_base64(file, fn) {
    var reader = new FileReader()
    reader.onload = function (e) {
        console.log('reader', e.target.result)
        fn && fn(reader.result)
    }
    reader.readAsDataURL(file);
}

/**
 * 兼容IE的弹窗实现
 * @param {string} base64 - 文件
 * @param {Cropper} option - Cropper参数
 * @param {function} [callback] - 确认按钮回调
 */
function show_dialog(base64, option, callback) {
    // 创建弹窗容器
    var title = '图片裁剪'
    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.zIndex = '9999';

    // 创建弹窗主体
    var dialog = document.createElement('div');
    dialog.style.position = 'absolute';
    dialog.style.top = '50%';
    dialog.style.left = '50%';
    dialog.style.transform = 'translate(-50%, -50%)';
    dialog.style.backgroundColor = '#fff';
    dialog.style.padding = '20px';
    dialog.style.borderRadius = '5px';
    dialog.style.minWidth = '300px';
    dialog.style.width = '500px';

    // 标题
    var title_el = document.createElement('h3');
    title_el.innerHTML = title || '提示';
    title_el.style.marginTop = '0';

    // 截图 img
    var img_el = document.createElement('img');
    img_el.id = 'crop_img';
    img_el.src = base64
    img_el.style.width = '50%';
    img_el.style.height = '286px';

    var img_crop_img_group = document.createElement('div')
    img_crop_img_group.style.width = '50%'
    img_crop_img_group.appendChild(img_el)

    // 预览 div
    var img_el_copy = document.createElement('div');
    img_el_copy.id = 'crop_img_copy';
    img_el_copy.className = 'preview_img';
    img_el_copy.style.objectFit = 'contain';
    img_el_copy.style.width = '100%';
    img_el_copy.style.height = '300px';
    img_el_copy.style.overflow = 'hidden'
    img_el_copy.style.border = '1px solid #000000'

    var img_el_copy_group = document.createElement('div')
    img_el_copy.style.marginLeft = '10px'
    img_el_copy_group.style.width = '48%'
    img_el_copy.style.height = '300px';
    img_el_copy_group.style.display = 'flex'
    img_el_copy_group.style.justifyContent = 'center'
    img_el_copy_group.style.alignItems = 'center'
    img_el_copy_group.appendChild(img_el_copy)

    var div_group = document.createElement('div')
    div_group.style.display = 'flex'
    div_group.style.overflow = 'hidden'
    div_group.appendChild(img_crop_img_group)
    div_group.appendChild(img_el_copy_group)

    // 按钮容器
    var btn_group = document.createElement('div');
    btn_group.style.textAlign = 'right';

    var option_group_btn = document.createElement('div')
    option_group_btn.style.marginTop = '10px'
    // 旋转按钮
    var rotate_left_btn = create_button_def({title: '左旋转'});
    option_group_btn.appendChild(rotate_left_btn)
    var rotate_right_btn = create_button_def({title: '右旋转'});
    rotate_right_btn.style.marginLeft = '10px'
    option_group_btn.appendChild(rotate_right_btn)
    // 旋转按钮
    var reset_btn = create_button_def({title: '重置'});
    reset_btn.style.marginLeft = '10px'
    option_group_btn.appendChild(reset_btn)

    // 确认按钮
    var confirm_btn = create_button_def({title: '确定'})

    // 组装元素
    btn_group.appendChild(confirm_btn);
    dialog.appendChild(title_el);
    dialog.appendChild(div_group);
    dialog.appendChild(option_group_btn);
    dialog.appendChild(btn_group);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // 支持ESC键关闭
    overlay.onkeydown = function (e) {
        e = e || window.event;
        if (e.keyCode === 27) {
            document.body.removeChild(overlay);
        }
    };
    overlay.tabIndex = 0; // 使div可聚焦
    overlay.focus();


    // 通过延时确保渲染完成（IE兼容）
    setTimeout(function () {
        // 初始化裁剪
        var _def_option = {
            aspectRatio: 2.8 / 3.5,
            preview: '.preview_img',
        }
        option = merge(_def_option, option)
        var crop_obj = on_crop_img('crop_img', option)
        confirm_btn.onclick = function () {
            document.body.removeChild(overlay);
            if (typeof callback === 'function') {
                callback(crop_obj);
            }
        };

        rotate_left_btn.onclick = function () {
            crop_obj.rotate(1);
        }
        var mousedown_left = null
        rotate_left_btn.onmousedown = function () {
            mousedown_left = setInterval(() => {
                crop_obj.rotate(1)
            }, 50)
            console.log('onmousedown')
        }
        rotate_left_btn.onmouseup = function () {
            console.log('onmouseup')
            clearInterval(mousedown_left)
        }

        rotate_right_btn.onclick = function () {
            crop_obj.rotate(-1);
        }
        var mousedown_right = null
        rotate_right_btn.onmousedown = function () {
            mousedown_right = setInterval(() => {
                crop_obj.rotate(-1)
            }, 50)
            console.log('onmousedown')
        }
        rotate_right_btn.onmouseup = function () {
            console.log('onmouseup')
            clearInterval(mousedown_right)
        }
        reset_btn.onclick = function () {
            crop_obj.reset();
        }

    }, 0);
}

// 弹窗实现
window.cropper_show_dialog = show_dialog
// 创建裁剪对象
window.cropper_crop_img = on_crop_img
// 最低ie 10+
window.file_to_base64 = file_to_base64
window.base64_to_file = base64_to_file

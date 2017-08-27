var util = util || {};
//id
util.$ = function (id) {
    return document.getElementById(id);
}
// ajax get参数格式化
util.formatParams = function (data) {
    var arr = [];
    for( name in data){   //遍历对象属性
        if(!data.hasOwnProperty(name)) continue;  //过滤掉继承原型的属性和方法
        if(typeof data[name] === 'function') continue;  //过滤掉函数方法
        value = data[name].toString();  //属性值转为字符串
        name = encodeURIComponent(name);  //可把属性名称字符串作为URI 组件进行编码。其返回值URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换。
        value = encodeURIComponent(value);  //属性值进行URI编码。
        arr.push(name + '=' + value);   //属性名和值放入数组
    }
    arr.push(("random =" + Math.random()).replace("."));
    return arr.join("&");
}

// ajax post 参数格式化
util.serialize = function(data){
    if(!data) return '';
    var pairs = [], value;
    for(name in data){   //遍历对象属性
        if(!data.hasOwnProperty(name)) continue;  //过滤掉继承原型的属性和方法
        if(typeof data[name] === 'function') continue;  //过滤掉函数方法
        value = data[name].toString();  //属性值转为字符串
        name = encodeURIComponent(name);  //可把属性名称字符串作为URI 组件进行编码。其返回值URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换。
        value = encodeURIComponent(value);  //属性值进行URI编码。
        pairs.push(name + '=' + value);   //属性名和值放入数组
    }
    return pairs.join('&');  //将数组中的元素用&分隔开返回成字符串形式
}

// ajax 封装 用户自行定义  options = { url, type, data,}

util.ajax = function (options, callback) {
    var options = options || {};
    //定义提交方式
    options.type = (options.type || "POST").toUpperCase();
    var xhr;
    //创建兼容对象
    if (window.XMLHttpRequest){
        xhr = new XMLHttpRequest(); // IE7+, Firefox, Chrome, Opera, Safari 代码
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');//IE5 IE6
    }
    //创建回调函数
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4){
            var status = xhr.status;
            if ((status>=200 && status <=300) || status ==304){
                var json  = JSON.parse(xhr.responseText);
                callback(json);
            } else{
                options.error && options.error('请求失败');
            }
        }
    }
    if (options.type == "POST"){
        xhr.open("POST",options.url,true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(util.serialize(options.data));
    } else {
        xhr.open("GET",options.url + "?" + util.formatParams(options.data), true);
        xhr.send(null)
    }

}

// cookie
util.getCookie =  function () {
    var cookie = {};
    var all = document.cookie;
    if (all === '')
        return cookie;
    var list = all.split('; ');
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var p = item.indexOf('=');
        var name = item.substring(0, p);
        name = decodeURIComponent(name);
        var value = item.substring(p + 1);
        value = decodeURIComponent(value);
        cookie[name] = value;
    }
    return cookie;
}

util.setCookie = function (name, value, expires, path, domain, secure) {
    var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (expires)
        cookie += '; expires=' + expires.toGMTString();
    if (path)
        cookie += '; path=' + path;
    if (domain)
        cookie += '; domain=' + domain;
    if (secure)
        cookie += '; secure=' + secure;
    document.cookie = cookie;
}


//移除cookie
util.removeCookie = function  (name, path, domain) {
    document.cookie = name + '='
        + '; path=' + path
        + '; domain=' + domain
        + '; max-age=0';
}
util.delclass = function (node,classname) {
    if (node.nodeType == 1) {
        if (node.className.indexOf(classname) > -1)
            node.className = node.className.replace(classname, "");
    }
}

util.addclass = function (node, classname) {
    if (node.nodeType == 1) {
        if (node.className.indexOf(classname) == -1)
            node.className += " " + classname;
    }
}

util.extend = function (o1,o2) {
    for(var i in o2 ){
        if(o1.i == undefined){
            o1.i  = o2.i;
        }
    }

}

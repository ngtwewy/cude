import config from "@/common/config.js"

var tools = {};

tools.setLocalStorage = function(key, val){
	uni.setStorageSync(key,val);
	return;
}

tools.getLocalStorage = function(key){
	return uni.getStorageSync(key);
}

/**
 * 加密手机号码中间的数字
 * @param {stirng} mobile 手机号码
 */
tools.getFilterMobile = function(mobile){
	if(mobile == ""){
		return "***********";
	}
	let mobileString = mobile.substring(0,3);
	mobileString += "*****";
	mobileString += mobile.slice(8,11);
	return mobileString;
}

/**
 * object转化成url拼接样式
 * @param obj 需要转化的参数
 */
tools.objToUrl = obj => {
	let arr = [];
	for (let i in obj) {
		if (obj.hasOwnProperty(i)) {
			arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
		}
	}
	return arr.join("&");
}

/**
 * url转化成object拼接样式
 * @param url 需要转化的参数
 */
tools.urlToObj = url => {
	let string = url.split('&');
	let res = {};
	for (let i = 0; i < string.length; i++) {
		let str = string[i].split('=');
		if (str[0] != '') {
			res[str[0]] = str[1];
		}
	}
	return res;
}

// 获取图片地址
tools.getImageUrl = function(url){
	if(url.substr(0,4) == "http" ){
    return url;
  }
  if(url.length > 20){
		return config.RES_URL+ '/uploads/images/' + url;
	}
	return "/static/images/no-pic.jpg";
}

// 将数字转换成金额显示
tools.toMoney = function(num){
	if(num == ''){
		num = 0;
	}
	num = parseFloat(num)
	num = num.toFixed(2);
	num = num.toLocaleString();
	return num;//返回的是字符串23,245.12保留2位小数
}

// 删除所有 HTML 标签
tools.delHtml = function (str){
  if(!str){
    return "";
  }
  return str.replace(/<[^>]+>/g,"");  //正则去掉所有的html标记
}


//时间戳转换 201906082350
tools.friendlyTime = function(stamp){
  var date = new Date(stamp*1000);//如果date为10位不需要乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes());
  // var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y+M+D+h+m;
}

//时间戳转换 201906082350
tools.dataTimeFormat = function(stamp) {
  var date = new Date(stamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes();
  // var s = date.getSeconds();
  return M + D + h + m
}


/**
*
* @param fn {Function}   实际要执行的函数
* @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
*
* @return {Function}     返回一个“去弹跳”了的函数
*/
tools.debounce = function (fn, delay) {
  var timer
  return function () {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

tools.throttle = function (method, context) {
  clearTimeout(method.tId);
  method.tId = setTimeout(function(){
    method.call(context);
  },1000);
}


/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * 4.去掉<br/>标签
 * @param html
 * @returns {void|string|*}
 */
tools.formatRichText =  function(html) { //控制小程序中图片大小
    let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
        return match;
    });
    newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
        match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
        return match;
    });
    newContent = newContent.replace(/<br[^>]*\/>/gi, '');
    newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
    return newContent;
}	




export default tools;

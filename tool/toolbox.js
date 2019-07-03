/**
 * Created by Administrator on 2017/11/14.
 */
;var toolbox = {
  /*
   * url: {String} —— 必须
   * option: {Object} —— 包含async，data，type
   * fn: {Function} —— 回调函数
   * */
  ajax: function (url, option, fn) {
    if (url && typeof url == 'string' && url.constructor == String) {
      option = option || {}
      if (option.async != undefined && option.async === false) {
        console.log('--不推荐设置async为false，如非必要请不要使用同步请求')
      } else {
        option.async = true
      }
      option.type = option.type ? option.type.toUpperCase() : 'GET'
      fn = fn ? fn : function () {
        console.log('--no callBack')
      }
      var data = ''
      
      if (option.data) {
        for (var key in option.data) {
          data += '&' + key + '=' + option.data[key]
        }
        data = data.substring(1)
      }
      if (option.type == 'GET') {
        var obj = new XMLHttpRequest()
        url += url.indexOf('?') > 0 ? '&' + data : '?' + data
        obj.open('GET', url, option.async)
        obj.onreadystatechange = function () {
          if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) {
            fn.call(this, obj.responseText)
          } else if (obj.status != 200 && obj.status != 304) {
            console.error('--' + obj.status + ': 请求错误')
          }
        }
        obj.send()
      } else if (option.type == 'POST') {
        var obj = new XMLHttpRequest()
        obj.open('POST', url, option.async)
        obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        obj.onreadystatechange = function () {
          if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) {
            fn.call(this, obj.responseText)
          } else if (obj.status != 200 && obj.status != 304) {
            console.error('--' + obj.status + ': 请求错误')
          }
        }
        obj.send(data)
      } else {
        console.error('--请正确填写TYPE！')
      }
    } else {
      console.error('--请正确填写URL！')
    }
  },
  /*
   * 获取地址栏
   * 可获取地址栏地址，地址栏参数对象，指定参数值，hash值
   * */
  getUrl: {
    href: function () {
      return window.location.href
    },
    search: function (url) {
      var searchObj = {}
      var search = window.location.search.substring(1)
      if (url) {
        var start = url.indexOf('?')
        var end = url.indexOf('#') == -1? url.length-1: url.indexOf('#')
        if (start >= 0) {
          search = url.substring(start + 1, end)
        }
      }
      var searchArr = search.split('&')
      if (searchArr.length > 0) {
        for (var i = 0; i < searchArr.length; i++) {
          var num = searchArr[i].indexOf('=')
          if (num > 0) {
            var name = searchArr[i].substring(0, num)
            var value = searchArr[i].substring(num + 1)
            searchObj[name] = value
          }
        }
      }
      return searchObj
    },
    searchVal: function (name, url) {
      url = url || this.href()
      return this.search(url)[name]
    },
    hash: function (url) {
      url = url || window.location.hash
      var start = url.indexOf('#')
      if (start >= 0) {
        return url.substring(start + 1)
      }
      return undefined
    }
  },
  rule: {
    isIdCard: function (num) {
      var reg = /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|(71)|(8[1-2])|(91))\d{4}((19)|(20))\d{2}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|[xX])$/
      return reg.test(num)
    },
    isPhoneNum: function (num) {
      var reg = /^1[34578]\d{9}$/
      return reg.test(num)
    },
    isPassWord: function (str) {
      var reg = /^[a-zA-Z][a-zA-Z0-9!@$_.-]{5,17}$/
      return reg.test(str)
    }
  },
  getDate: {
    /*
    * 格式化时间
    * time: {string}
    * date: 标准时间
    * passTime：过去了多少时间
    * remainTime：还剩多少时间
    * */
    date: function (time, format) {
      var date = time? new Date(time): new Date()
      var year = date.getFullYear()
      var month = this.formatNumber(date.getMonth() + 1)
      var day = this.formatNumber(date.getDate())
      var houre = this.formatNumber(date.getHours())
      var minutes = this.formatNumber(date.getMinutes())
      var second = this.formatNumber(date.getSeconds())
      format = format || 'xxxx-xx-xx xx:xx'
      format = toolbox.trim(format).toLowerCase()
      if(format == 'xxxx-xx-xx xx:xx') {
        return year + '-' + month + '-' + day + ' ' + houre + ':' + minutes
      }
      if(format == 'xxxx-xx-xx xx:xx:xx') {
        return year + '-' + month + '-' + day + ' ' + houre + ':' + minutes + ':' + second
      }
      if(format == 'xxxx年xx月xx日 xx:xx') {
        return year + '年' + month + '月' + day + '日 ' + houre + ':' + minutes
      }
      if(format == 'xxxx年xx月xx日 xx:xx:xx') {
        return year + '年' + month + '月' + day + '日 ' + houre + ':' + minutes + ':' + second
      }
      if(format == 'xxxx年xx月xx xx时') {
        return year + '年' + month + '月' + day + '日 ' + houre + '时'
      }
    },
    passTime: function (fromTime) {
      var time = (new Date()).getTime() - fromTime
      var m = parseInt(time / 1000 / 60)
      var h = parseInt(m / 60)
      var d = parseInt(h / 24)
      var month = parseInt(d / 30)
      var y = parseInt(month / 12)
      if (y) return y + '年前'
      if (month) return month + '个月前'
      if (d) return d + '天前'
      if (h) return h + '小时前'
      if (m) return m + '分钟前'
      return y + '刚刚'
    },
    remainTime: function (endTime) {
      var time = endTime - (new Date()).getTime()
      var obj = { d: 0, h: 0, m: 0, s: 0 }
      if(time > 0 ){
        obj.d = Math.floor(time / 1000 / 3600 / 24)
        obj.h = Math.floor(time / 1000 / 3600 % 24)
        obj.m = Math.floor(time / 1000 / 60 % 60)
        obj.s = Math.floor(time / 1000 % 60)
      }
      return obj
    },
    formatNumber: function (num) {
      return num >= 10? num: '0' + num
    }
  },
  /*
  * 去首尾空格
  * */
  trim: function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },
  /* 
  * 是否是字符串
  */
  isString: function (param) {  
    return typeof param === 'string'
  },
  /* 
  * 是否是布尔值
  */
  isBoolean: function (param) {  
    return typeof param === 'boolean'
  },
  /* 
  * 是否是数字
  */
  isNumber: function (param) {  
    return typeof param === 'number'
  },
  /* 
  * 是否是数组
  */
  isArray: function (param) {  
    return Object.prototype.toString.call(param) === '[object Array]'
  },
  /* 
  * 是否是对象
  */
  isObject: function (param) {  
    return Object.prototype.toString.call(param) === '[object Object]'
  },
  /* 
  * 是否是函数
  */
  isFunction: function (param) {  
    return Object.prototype.toString.call(param) === '[object Function]'
  },
  /* 
  * 判断类型
  */
  typeOf: function(param) {
    let type = typeof param
    if(isNaN(param)) type = NaN
    if(this.isArray(param)) type = 'Array'
    if(isObject(param)) type = 'Object'
    if(isFunction(param)) type = 'Function'
    return type
  },
  /**
  * 取小数
  * number: 数字
  * index: 取值位数(默认2位小数)
  * type: 类型  'fixed' -- 四舍五入;  'floor' -- 截取;
   */
  toFixed: function(number, index, type) {
    if (this.isNumber(number)) {
      index = index ? index : 2
      if (type === 'fixed') {
        return number.toFixed(index)
      }
      if (type === 'floor') {
        return Math.floor(number * Math.pow(10, index)) / Math.pow(10, index)
      }
    }else{
      return NaN
    }
  },
  /**
  * 浮点累加
  * NumberList: {Array}
   */
  fixedSum: function(NumberList) {
    
  },
}
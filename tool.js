export const isWeixin = (() => {
  return navigator.userAgent.indexOf('MicroMessenger') > -1
})()

export const isWeibo = (() => {
  return navigator.userAgent.indexOf('Weibo') > -1
})()

export const sleep = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

export const isDD = (() => {
  return navigator.userAgent.indexOf('DingTalk') > -1
})()

export const isMobile = (() => {
  return /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
})()

/**
 * [getParam 获取url参数]
 * @param  {[string]} name [参数名称]
 * @return {[string]}      [值]
 */
export const getParam = name => {
  if ('URLSearchParams' in window) {
    const params = new window.URLSearchParams(window.location.search)
    return params.get(name) ? params.get(name) : null
  } else {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const r = window.location.search.substr(1).match(reg)

    if (r != null) return unescape(r[2])
    return null
  }
}

/**
 * [random 获取指定随机数]
 * @param  {[number]} min [最小]
 * @param  {[number]} max [最大]
 * @return {[number]}     [description]
 */
export const random = (min, max) => Math.ceil(Math.random() * (max - min) + min)

/**
 * [生成指定长度的随机字符串]
 * @return {string} [字符串]
 */
export const generateRandomAlphaNum = (len) => {
  let rdmString = ''
  for (let lens = len; rdmString.length < lens;) {
    rdmString += Math.random().toString(36).substr(2)
  }
  return rdmString.substr(0, len)
}

/**
 * [randomColor 获取随机颜色]
 * @return {[string]} [色值]
 */
export const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16)

/**
 * 获取字符串的长度（中文2、英文1）
 * @param string
 * return string
 */
export const getStrLen = str => {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i)

    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len++
    } else {
      len += 3
    }
  }
  return len
}

/**
 * 校验字符串是否合法 (不包含表情、特殊字符、数字)
 * @param str
 * @return Boolean
 */
export const checkStringIsNormal = str => /[^\w\u4e00-\u9fa5]/.test(str)

/**
 * [formatMoney 格式化金钱格式]
 * @param  {[string||number]} num [字符]
 * @return {[string]}     [description]
 */
export const milliFormat = num => {
  num && (num = num.toString())
  return (
    num.split('.')[0].replace(/(?=(?!^)(\d{3})+$)/g, ',') +
    num.replace(/^\d+/g, '')
  )
}

/**
 * [fnCount 函数执行特定次数]
 * @param  {function} fn [要执行的函数]
 * @param  {number} count [次数]
 * @ return {boolean} [是否执行完毕]
 */
export const fnCount = (fn, count = 1) => {
  let index = 0

  return function() {
    if (index === count) {
      fn = null
      return false
    }

    fn.apply(this, arguments)
    index++

    return true
  }
}

/**
 * 格式化为人民币格式
 * @export RMBformat
 * @param {string} str
 */
export const RMBformat = (str) => str.toString().replace(/\d+/, (s) => s.replace(/(\d)(?=(\d{3})+$)/g, '$1,'))

/**
 *
 * 判断数据类型
 * @export isType
 * @param {any} val
 * @returns
 */
export const isType = val => {
  return val == null ?
    String(val) :
    Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}

/**
 * 是否为数组
 *
 * @export isArray
 * @param {any} val
 * @returns
 */
export const isArray = val => isType(val) === 'array'

/**
 * 是否为布尔值
 *
 * @export isBoolean
 * @param {any} val
 * @returns
 */
export const isBoolean = val => isType(val) === 'boolean'

/**
 * 是否为错误对象
 *
 * @export isError
 * @param {any} val
 * @returns
 */
export const isError = val => isType(val) === 'error'

/**
 * 是否为日期对象
 *
 * @export isDate
 * @param {any} val
 * @returns
 */
export const isDate = val => isType(val) === 'date'

/**
 * 是否为函数
 *
 * @export isFunction
 * @param {any} val
 * @returns
 */
export const isFunction = val => isType(val) === 'function'

/**
 * 是否为数字
 *
 * @export isNumber
 * @param {any} val
 * @returns
 */
export const isNumber = val => isType(val) === 'number'

/**
 * 是否为正则对象
 *
 * @export isRegexp
 * @param {any} val
 * @returns
 */
export const isRegexp = val => isType(val) === 'regexp'

/**
 * 是否为Object
 *
 * @export isObject
 * @param {any} val
 * @returns
 */
export const isObject = val => isType(val) === 'object'

/**
 * 是否为字符串
 *
 * @export isString
 * @param {any} val
 * @returns
 */
export const isString = val => isType(val) === 'string'

/**
 * 是否为null
 *
 * @export isNull
 * @param {any} val
 * @returns
 */
export const isNull = val => isType(val) === 'null'

/**
 * 是否为dom节点
 *
 * @export
 * @param {any} val
 * @returns
 */
export const isNode = val => val && val.nodeType

/**
 * 是否为SVG元素
 *
 * @export
 * @param {any} val
 * @returns
 */
export const isSVG = val => window.SVGElement && val instanceof window.SVGElement

/**
 * 是否为空的对象
 *
 * @export
 * @param {any} val
 * @returns
 */
export const isEmptyObject = val => {
  for (var name in val) {
    if (val.hasOwnProperty(name)) {
      return false
    }
  }

  return true
}

/**
 * 计算元素旋转后的宽高
 * 使用旋转矩阵计算
 * see: https://stackoverflow.com/a/3276550
 * @param {number} angle
 * @param {number} width
 * @param {number} height
 */
export const calcBounding = (angle, width, height) => {
  const deg = angle * Math.PI / 180
  const sin = Math.sin(deg)
  const cos = Math.cos(deg)

  // (w,0) rotation
  const x1 = cos * width
  const y1 = sin * width

  // (0,h) rotation
  const x2 = -sin * height
  const y2 = cos * height

  // (w,h) rotation
  const x3 = cos * width - sin * height
  const y3 = sin * width + cos * height

  const minX = Math.min(0, x1, x2, x3)
  const maxX = Math.max(0, x1, x2, x3)
  const minY = Math.min(0, y1, y2, y3)
  const maxY = Math.max(0, y1, y2, y3)

  return {
    width: maxX - minX,
    height: maxY - minY
  }
}

/**
 * 计算三角形对边长度
 * @param {number} angle
 * @param {number} oppositeSlde
 */
export const calcTriangle90Sin = (angle, oppositeSlde) => {
  return Math.sin(angle * Math.PI / 180) * oppositeSlde
}

/**
 * 计算三角形另外一条边的长度（非对边）
 * @param {number} angle
 * @param {number} slde
 */
export const calcTriangle90Cos = (angle, slde) => {
  return Math.cos(angle * Math.PI / 180) * slde
}

/**
 * 计算原点的斜率
 * X轴开始到x,y的角度
 * @param {number} y
 * @param {number} x
 */
export const calcSlope = (y, x) => {
  return Math.atan2(y, x) * (180 / Math.PI)
}

/**
 * 函数防抖
 * 时间间隔内如再次触发，则重新计算时间，直到时间大于或等于wait才执行函数
 * @param {function} fn
 * @param {number} wait
 * @param {boolean} immediate
 */
export const debounce = (fn, wait, immediate) => {
  let timer = null
  let result = null
  const _wait = wait || 200
  const _immediate = immediate || true

  return function() {
    const args = arguments

    timer && clearTimeout(timer)

    if (_immediate) {
      let repeat = !timer
      timer = setTimeout(() => timer = null, _wait)

      repeat && (result = fn.apply(this, args))
    } else {
      timer = setTimeout(() => result = fn.apply(this, args), _wait)
    }
    return result
  }
}

// TODO
export const throttle = () => {}

/**
 * 是否在元素里
 * @param {htmlnode} el
 * @param {htmlnode} target
 */
export const contains = (el, target) => {
  return el.contains(target)
}

export const hasIdClass = (el, elem) => {
  return el.matches(elem)
}

/**
 * 获取一个数组对象里属性的值
 * @param {object} obj
 * @param {array} attr
 */
export const getObjAttrValue = (obj, attr) => obj.map(item => item[attr])

export const isWX = () => window.navigator.userAgent.indexOf('MicroMessenger') > -1
export const isAndroid = () => window.navigator.userAgent.indexOf('Android') > -1
export const isKB = () => window.navigator.userAgent.indexOf('qnreading') > -1
export const isQQnews = () => window.navigator.userAgent.indexOf('qqnews') > -1
export const isQB = () => window.navigator.userAgent.indexOf('QBWebViewType') > -1

const performance = (function() {
  var perf = window.performance || {}

  if (typeof perf.now !== 'function') {
    var nowOffset = perf.timing && perf.timing.navigationStart ?
      perf.timing.navigationStart :
      new Date().getTime()

    perf.now = function() {
      return new Date().getTime() - nowOffset
    }
  }
  return perf
})()

/**
 * RAF
 */
var vendors = ['webkit', 'moz']
for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
  var vp = vendors[i]
  window.requestAnimationFrame = window[vp + 'RequestAnimationFrame']
  window.cancelAnimationFrame =
    window[vp + 'CancelAnimationFrame'] ||
    window[vp + 'CancelRequestAnimationFrame']
}
if (
  /iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || // iOS6 is buggy
  !window.requestAnimationFrame ||
  !window.cancelAnimationFrame
) {
  var lastTime = 0
  window.requestAnimationFrame = function(callback) {
    var now = performance.now()
    var nextTime = Math.max(lastTime + 16, now)
    return setTimeout(function() {
      callback((lastTime = nextTime))
    }, nextTime - now)
  }
  window.cancelAnimationFrame = clearTimeout
}

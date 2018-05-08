/**
 * @ Module imgpreload
 * @ authors: H.yingzi - h.yingzi@gmail.com
 * @ team: Digiocean - http://www.digiocean.cc
 * @ date: 2013-5-6 15:16
 * @ version: 1.0.0
 *
 */

  function Timer () {
    this.timer = null
  }

  Timer.prototype.start = function (callback) {
    this.timer = setInterval(function () {
      if (isFunction(callback)) {
        callback()
      }
    }, 1000 / 60)
  }

  Timer.prototype.stop = function () {
    clearInterval(this.timer)
    this.timer = null
  }

  function imgpreload (urls, opts) {
    var config = opts || imgpreload.DEFAULTS

    if (typeof urls === 'string') {
      urls = new Array(urls)
    }

    if (urls.length < 0) {
      return
    }
    var isOBJ = typeof urls[0].name !== 'undefined'

    var index = 0,
      loaded = false,
      list = {},
      total = urls.length - 1,
      loadList = total,
      timer = new Timer()

    var load = function (data, index) {
      var startDate = +new Date()
      config.thread ? loaded = true : loaded = false

      var img = new Image()
      var url = ''
      if (isOBJ) {
        url = data.url
      } else {
        url = data
      }

      img.src = url
      list[isOBJ ? data.name : index] = {
        dom: img
      }

      if (img.complete) {
        if (isFunction(config.itemload)) {
          var endDate = +new Date()
          config.itemload.call(img, index, data, endDate - startDate, 'complete')
        }
        update(data, index, 'complete', true)

        return
      }

      img.onerror = function () {
        if (isFunction(config.error)) {
          config.error.call(img, index, data)
        }
        update(data, index, 'error', false)
      }

      img.onload = function () {
        if (isFunction(config.itemload)) {
          var endDate = +new Date()
          config.itemload.call(img, index, data, endDate - startDate, 'load')
        }
        update(data, index, 'load', true)
      }
    }

    function update (data, index, state, itemloaded) {
      list[isOBJ ? data.name : index].state = state
      list[isOBJ ? data.name : index].loaded = itemloaded
      if (isOBJ) {
        list[data.name].name = data.name
        list[data.name].url = data.url
      } else {
        list[index].name = index
        list[index].url = data
      }
      loaded = true
      loadList--

      if (loadList < 0) {
        timer.stop()
        if (isFunction(config.allload)) {
          var endDate = +new Date()
          config.allload(list, endDate - startDate)
        }
      }
    }

    var startDate = +new Date()
    load(urls[index], index)

    var temp = {}
    timer.start(function () {
      for (var k in list) {
        if (typeof list[k] !== 'undefined') {
          if (list[k].dom.width > 0 && list[k].dom.height > 0 && !temp[k]) {
            temp[k] = k
            if (isFunction(config.ready)) {
              config.ready.call(list[k].dom, k)
            }
          }
        }
      }

      if (loaded) {
        index++

        if (index > total) {
          loadList < 0 && timer.stop()
        } else {
          load(urls[index], index)
        }
      }
    })
  }

  imgpreload.DEFAULTS = {
    thread: false,
    ready: function (index, time) {
            // console.log("size:", this.width + "x" + this.height, index)
    },
    itemload: function (index, url, time, state) {
            // console.log("item:", index, url, "time:", time, "state:", state)
    },
    allload: function (o, time) {
            // console.log("all:", o, "time:", time)
    },
    error: function (index, url) {
            // console.error(index,url)
    }
  }

  imgpreload.VERSION = '1.0.0'

  window.imgpreload = imgpreload

  if (typeof jQuery !== 'undefined') {
    jQuery.imgpreload = function (url, opts) {
      new imgpreload(url, opts)
    }
  }

    // help
  function isFunction (fn) {
    return typeof fn === 'function'
  }

  export default imgpreload

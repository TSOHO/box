/**
 * @ Storage
 * @ author: H.yingzi - h.yingzi@gmail.com
 * @ date: 2017-5-15 18:47:16
 * @ version: 0.1.0
 *
 */
import { isArray, isObject, isNull } from '../utils/tool'

const track = function () {
  console.error('Storage:', ...arguments)
}

if (!window.localStorage) {
  track('no support localStorage!')
}

const localStorage = window.localStorage

const Storage = {
  namespace: '_HYZ_',
  set (name, key) {
    const base = this

    localStorage.setItem(base.namespace + `${name}`, base._serialize(key))
    return key
  },

    /**
     * 追加
     *
     * @param {any} name
     * @param {any} key
     * @returns
     */
  add (name, key) {
    const base = this
    const exist = base.get(name)

    if (isNull(exist)) {
      return base.set(name, key)
    }

    let newKey = ''

    if (!key) {
      return exist
    }

    if (isArray(exist)) {
      exist.push(key)
      return base.set(name, exist)
    }

    if (isObject(exist) && isObject(key)) {
      newKey = {...key, ...exist }
      return base.set(name, newKey)
    }

    return base.get(name)
  },
  get (name) {
    const base = this

    return base._deserialize(
            localStorage.getItem(base.namespace + `${name}`)
        )
  },

    /**
     * 获取key的值
     *
     * @param {any} name
     * @param {any} key
     * @returns
     */
  getVal (name, key) {
    const base = this
    const exist = base.get(name)

    return exist[key] ? exist[key] : exist
  },
  remove (name) {
    const base = this

    return localStorage.removeItem(base.namespace + `${name}`)
  },
  clear () {
    return localStorage.clear()
  },
  _serialize (obj) {
    return JSON.stringify(obj)
  },
  _deserialize (val) {
    return JSON.parse(val)
  }
}

export default Storage

import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse, Canceler } from 'axios'

import { isNull, isUndefined } from 'lodash'
import type { Router } from 'vue-router'
import { responseCodeErrorMap as networkErrMap, networkStatus, responseCode } from '@/enum'
import type { IAnyObj, IObject, IRequest, IResponse } from '@/interface'
import type { mainType } from '@/store'
import { useStore } from '@/store'
import router from '@/router'
import { getUser } from '@/store/mutations-const'
import { STResponse } from '@/class'

class Request implements IRequest {
  readonly host: string
  static store: mainType
  static router: Router
  static localStorage: Request
  static requestLog: { [key: string]: Canceler }

  constructor() {
    this.host = '/'
    Request.requestLog = {}
    Request.store = useStore()
    Request.router = router
    axios.interceptors.request.use(this.requestInterceptors)
    axios.interceptors.response.use(this.responseInterceptors, this.handleNetWorkError)
  }

  private requestInterceptors(config: AxiosRequestConfig) {
    const { url } = config
    if (typeof Request.requestLog[url!] === 'function')
      Request.requestLog[url!]('强制取消请求！')
    config.cancelToken = new axios.CancelToken((obj) => {
      Request.requestLog[url!] = obj
    })
    if (Request.store[getUser] && Request.store[getUser].is_login) {
      if (isNull(config.headers) || isUndefined(config.headers))
        config.headers = {}
      config.headers.Authorization = `Bearer ${Request.store[getUser].token}`
    }
    if (config.method === 'post') {
      config.transformRequest = [
        function (data: IObject) {
          if (isUndefined(data) || isNull(data))
            return {}
          if (data instanceof FormData)
            return data
          if (config.headers && config.headers['Content-Type'] === 'application/json')
            return JSON.stringify(data)
          const temp = []
          for (const it in data) {
            if (isNull(data[it]))
              temp.push(`${encodeURIComponent(it)}=`)
            else
              temp.push(`${encodeURIComponent(it)}=${encodeURIComponent(data[it])}`)
          }
          return temp.join('&')
        },
      ]
    }
    return config
  }

  private responseInterceptors(response: AxiosResponse<any, any>) {
    if (response.config.url! in Request.requestLog)
      delete Request.requestLog[response.config.url!]
    if (response.status !== networkStatus.Success)
      return Promise.reject(response)
    Request.handleGeneralError(response.data)
    return response
  }

  private handleNetWorkError(error: any) {
    const { config, status } = error
    if (config?.url in Object.keys(Request.requestLog))
      delete Request.requestLog[config?.url]
    if (status)
      window.$message.error(networkErrMap.get(status) ?? `其他连接错误 --${status}`)
    else
      window.$message.error('无法连接到服务器！')
    if (axios.isCancel(error))
      return new Promise(() => {})
    return Promise.reject(error)
  }

  static handleGeneralError(data: IResponse<any>): boolean {
    if (data.code === responseCode.TokenInvalid || data.code === responseCode.ParamsError) {
      window.$message.error('token过期，请重新登录！')
      localStorage.clear()
      Request.router.push('/login')
      return false
    }
    if (data.code !== responseCode.Success) {
      window.$message.error(data.message)
      return false
    }
    return true
  }

  Get<T>(url: string, params?: IAnyObj): Promise<STResponse<T>> {
    return new Promise((resolve) => {
      axios
        .get(url, { params })
        .then((result) => {
          resolve(new STResponse((result.data)))
        })
        .catch((err) => {
          if (!axios.isCancel(err))
            resolve(err)
        })
    })
  }

  Post<T>(url: string, data: IAnyObj, params?: IAnyObj): Promise<STResponse<T>> {
    return new Promise<STResponse<T>>((resolve) => {
      axios
        .post(url, data, { params })
        .then((result) => {
          resolve(new STResponse((result.data)))
        })
        .catch((err) => {
          if (!axios.isCancel(err))
            resolve(err)
        })
    })
  }

  abortPromise() { }
}

export default (() => {
  let request: Request | null = null
  return function () {
    if (request)
      return request
    return request = new Request()
  }
})()

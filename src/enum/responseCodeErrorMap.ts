interface IMappingObject {
  [index: number]: string
  get: (obj: number) => string
}

const errorMap: IMappingObject = {
  get(obj: number): string {
    return this[obj]
  },
  0: '成功',
  400: '错误的请求参数',
  401: '此API不存在',
  405: '请求方式错误',
  415: '不支持的媒体类型',
  500: 'API异常',
  503: 'InternalError',
  504: 'API请求超时',
  510: '服务不存在',
  511: '服务被禁用',
  600: '业务异常',
  1001: '服务被禁用',
  1002: '超过API单小时最大请求次数',
  1003: 'APP KEY无效',
  1004: '此API已禁用',
  1005: '有恶意访问嫌疑',
  1006: '没有API业务访问权限',
  1007: '此API访问权限已到期',
  1008: '无效API业务',
  1009: '请求已过期',
  1100: 'Token无效',
  1101: '登录失败',
  1102: '权限不足',
  1103: '多地登录',
}

export default errorMap

/**
 * 业务层状态码枚举
 */
enum responseCode {
  /** 尚未请求 */
  Wait = -1,
  /** 业务处理成功 */
  Success = 0,
  /** 参数错误 */
  ParamsError = 400,
  /** 认证失败 */
  AuthFailed = 401,
  /** 此API不存在 */
  ApiNotFound = 404,
  /** 请求方式错误 */
  MethodsError = 405,
  /** 不支持的媒体类型 */
  NotSupportContentType = 415,
  /** API异常 */
  ApiError = 500,
  /** InternalError */
  InternalError = 503,
  /** API请求超时 */
  ApiTimeOut = 504,
  /** 服务不存在 */
  ServerNotFound = 510,
  /** 服务被禁用 */
  ServerIsDisabled = 511,
  /** 业务异常 */
  BusinessException = 600,
  /** 没有响应内容 */
  ResponseContentIsEmpty = 1001,
  /** 超过API单小时最大请求次数 */
  ExceededAPIHourlyRequestLimit = 1002,
  /** APP KEY无效 */
  AppKeyIsInvalid = 1003,
  /** 此API已禁用 */
  ApiIsDisabled = 1004,
  /** 有恶意访问嫌疑 */
  MaliciousAccess = 1005,
  /** 没有API业务访问权限 */
  NoAPIAccessAuthorization = 1006,
  /** 此API访问权限已到期 */
  APIAccessAuthorizationIsExpired = 1007,
  /** 请求已过期 */
  ExceededRequestTimeStampLimit = 1009,
  /** Token无效 */
  TokenInvalid = 1100,
  /** 登录失败 */
  LoginFailed = 1101,
  /** 权限不足 */
  LackOfAuthorization = 1102,
  /** 多地登录 */
  TooManyLocationLogin = 1103,
}

export default responseCode

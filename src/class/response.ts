import { Basic } from './basic'
import type { IResponse } from '@/interface'
import { responseCode } from '@/enum'

class STResponse<T> extends Basic implements IResponse<T> {
  code: number = responseCode.Wait
  message = ''
  data: T | null = null

  constructor(obj: IResponse<T>) {
    super()
    this.code = obj.code
    this.message = obj.message
    this.data = obj.data
  }

  get Code() {
    return this.code
  }

  get Message() {
    return this.message
  }

  get Data() {
    return this.data
  }
}

export default STResponse

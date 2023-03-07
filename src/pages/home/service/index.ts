import type { STResponse, typeUser } from '@/class'
import request from '@/plugins/request'

export default {
  signIn<T extends typeUser>(): Promise<STResponse<T>> {
    return request().Post<any>('/v1/sntp_web/login', {
      username: 'e022388',
      password: '897922',
      product_id: 'st_00037',
    })
  },
}

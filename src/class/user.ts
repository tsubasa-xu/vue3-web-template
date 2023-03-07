import type IUser from '@/interface/user'

class User implements IUser {
  login_name = ''
  user_name = ''
  account_id = ''
  org = ''
  request_token = ''
  is_login = false
  constructor(initValue: IUser | null = null) {
    const local: any = initValue || JSON.parse(localStorage.getItem('user-info') || '{}')
    if ('account' in local)
      this.login_name = local.account
    if ('name' in local)
      this.user_name = local.user_name
    if ('account_id' in local)
      this.account_id = local.account_id
    if ('org' in local)
      this.org = local.org
    if ('token' in local) {
      this.request_token = local.token
      this.is_login = true
    }
    else {
      this.is_login = false
    }
  }

  get account() {
    return this.login_name
  }

  get name() {
    return this.user_name
  }

  get uid() {
    return this.account_id
  }

  get token() {
    return this.request_token
  }

  get org_name() {
    return this.org
  }
}

const user = (() => {
  let obj: User | null = null
  return function (initValue: IUser | null = null) {
    if (obj && obj.is_login)
      return obj
    return obj = new User(initValue)
  }
})()

type typeUser = User

export {
  user,
  type typeUser,
}

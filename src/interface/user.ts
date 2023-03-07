export default interface IUser {
  is_login: boolean
  account: string
  account_id: string
  name: string
  token: string
  org?: string
}

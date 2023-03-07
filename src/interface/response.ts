export interface IResponse<T> {
  code: number
  message: string
  data: T | null
}

export type Fn = (data: IResponse<any>) => IResponse<any>

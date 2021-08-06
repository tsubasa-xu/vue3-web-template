export interface message {
  type?:string,
  title?: string,
  description?: string,
  content: string,
  meta?: string,
  duration?: number,
  onAfterEnter?: void,
  onAfterLeave?: void,
}

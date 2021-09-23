export interface IUrl {
  source: string,
  protocol: string,
  host: string,
  port: string,
  query?: string,
  params?: { [propName: string]: string },
  file?: string,
  hash?: { [propName: string]: string; },
  path?: string,
  relative?: string,
  segments?: Array<string>,
}

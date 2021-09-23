import { IUrl } from '../interface/url';

class URLClass implements IUrl {
  private readonly _source: string;
  private readonly _protocol: string;
  private readonly _host: string;
  private readonly _port: string;
  private readonly _query?: string | '';
  private readonly _file?: string | '';
  private readonly _params?: { [propName: string]: string; } | {};
  private readonly _hash?: { [propName: string]: string; } | {};
  private readonly _path?: string | '';
  private readonly _relative?: string | '';
  private readonly _segments?: Array<string> | [];

  constructor (full_href :string = window.location.href) {
    const para = new URL(full_href)
    const paras :any = para.searchParams;
    const hash :any = new URLSearchParams(para.hash.slice(1, location.hash.length));
    this._source = para.href;
    this._protocol = para.protocol.slice(0, para.protocol.length - 1);
    this._host = para.hostname
    this._port = para.port;
    this._query = para.search;
    this._params = Object.fromEntries(paras.entries());
    this._file = (para.pathname.match(/\/([^/?#]+)$/i) || [, ""])[1];
    this._hash = Object.fromEntries(hash.entries());
    this._path = para.pathname.replace(/^([^/])/, "/$1");
    this._relative = (para.href.match(/tps?:\/\/[^/]+(.+)/) || [, ""])[1];
    this._segments = para.pathname.replace(/^\//, "").split("/");
  }

  public get source() {
    return this._source;
  }

  public get protocol() {
    return this._protocol;
  }

  public get host() {
    return this._host;
  }

  public get port() {
    return this._port;
  }

  public get query() {
    return this._query;
  }

  public get params () {
    return this._params;
  }

  public get file () {
    return this._file;
  }

  public get hash () {
    return this._hash;
  }

  public get path () {
    return this._path;
  }

  public get relative () {
    return this._relative
  }

  public get segments () {
    return this._segments;
  }
}

export let _url :URLClass | null = null;

const url = () => {
  if (!_url) {
    _url = new URLClass();
  }
  return _url;
}

export default () => {
  return url();
};

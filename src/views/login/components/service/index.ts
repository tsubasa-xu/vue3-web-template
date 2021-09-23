/*
*
* 登录容器的接口请求
* xuzy (20210923)
*
*/
import { request } from '../../../../plugins/request';

export const login = {
  login: function () {
    return new Promise((resolve, reject) => { resolve({result: true}) });
  }
};

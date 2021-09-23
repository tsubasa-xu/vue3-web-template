/*
 *
 *  @authors xuzy(xyzy@go-goal.com)
 * @date 2021-08-05
 * 请求处理
 *
 */
import type { App } from 'vue';
import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { notify } from '../notification';

const requestInterceptors = function (config:any) {
  if (config.method === 'post') {
    config.transformRequest = [
      function (data: any) {
        const temp = [];
        for (const it in data) {
          temp.push(`${encodeURIComponent(it)}=${encodeURIComponent(data[it])}`);
        };
        return temp.join('&');
      },
    ];
  };
  return config;
};

const responseSuccessHandler = function (res: any) {
  if (res.data.code === 1100) {
    localStorage.removeItem('token');
    localStorage.removeItem('uinfo');
    localStorage.removeItem('pages');
    location.reload();
  }
  return res.data;
};

const responseFailHandler = function (error: any) {
  const { message, config } = error;
  notify.error({
    title: `Api请求异常:`,
    description: `来自${config.url}`,
    content: message,
  });
  throw error;
};

export function request (config:AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    const base = {
      timeout: 60000,
      headers: {
        Authorization: '',
        post: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    };
    if (localStorage.getItem('token')) {
      base.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    };
    const instance = axios.create(base);
    instance.interceptors.request.use(requestInterceptors);
    instance.interceptors.response.use(responseSuccessHandler, responseFailHandler);
    instance(config).then((res: any) => {
      if (Object.keys(res).indexOf('data') === -1) {
        res.data = [];
      };
      if (res.code !== 0) {
        notify.error({
          title: `Api返回值异常:`,
          description: `来自${config.url}`,
          content: res.message,
        });
      }
      if (typeof resolve === 'function' && res) {
        return resolve(res);
      };
      return res;
    }).catch(err => {
      if (typeof reject === 'function') {
        return reject(err);
      };
    });
  });
}

export default {
  install(app: App): void {
    app.provide("request", request);
  },
};

/*
 *
 *  @authors xuzy(xyzy@go-goal.com)
 * @date 2021-08-05
 * 通用接口
 *
 */
import type { App } from 'vue';
import global from './global';

export type IPostResult = { result: string };
export type IResult = { data: IPostResult };

let service:Object = { global, };

const serviceModules = import.meta.globEager('../../views/**/service/index.ts');

Object.keys(serviceModules).forEach(key => {
  if (Object.keys(serviceModules[key]).indexOf('default') > -1) {
    service = { ...service, ...serviceModules[key].default };
  } else {
    service = { ...service, ...serviceModules[key] };
  }
});

export default {
  install(app: App): void {
    app.provide("service", service);
  },
};



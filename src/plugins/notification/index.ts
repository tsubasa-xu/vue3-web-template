/*
*
* 全局参知消息
*
*/
import type { App } from 'vue';
import { message } from '../../interface/message';
import { store } from '../../store';
import * as types from '../../store/mutations-const';

class Notify {
  _message: message = {
    type: '',
    content: '',
    duration: 0,
  }
  _store:any = store
  _mutations: Object = {}

  constructor () {
    this._message.duration = 10000;
  }

  private send(obj: message) {
    this._store.commit(types.sendMessage, obj);
  }

  info (message: message) {
    this.send({ ...this._message, ...message, type: 'info' });
  }

  error (message: message) {
    this.send({ ...this._message, ...message, type: 'error' });
  }

  warning (message: message) {
    this.send({ ...this._message, ...message, type: 'warning' });
  }

  success (message: message) {
    this.send({ ...this._message, ...message, type: 'success' });
  }
}

export let notify: Notify;

export default {
  install(app: App): void {
    notify = new Notify();
    app.provide("notify", notify);
  }
}

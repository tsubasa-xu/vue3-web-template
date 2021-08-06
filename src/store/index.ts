import { createStore } from 'vuex';
import * as types from './mutations-const'

export const store = createStore({
  state: {
    messages: Array<Object>(),
  },
  getters: {
    message (state) {
      const obj = state.messages.pop();
      return obj;
    },
    messageCount (state) {
      return state.messages.length;
    },
  },
  mutations: {
    [types.sendMessage] (state, obj: Object) {
      state.messages.unshift(obj);
    }
  },
  actions: {},
});

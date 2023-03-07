import type { Store } from 'pinia'
import { defineStore } from 'pinia'

import { isEmpty, isNull, isUndefined } from 'lodash'
import { useRouter } from 'vue-router'
import * as types from './mutations-const'

import type { typeUser } from '@/class'
import { user } from '@/class'

const versionString: string
  = import.meta.env.MODE === 'development'
    ? `${import.meta.env.VITE_APP_VERSION}-dev`
    : import.meta.env.VITE_APP_VERSION

interface mainStateDataType {
  debug: boolean
  version: string
  userInfo: typeUser
  timestamp: number
  timeoutID: number
}

const state: mainStateType = () => ({
  debug: import.meta.env.MODE === 'development',
  version: versionString,
  userInfo: user(),
  timestamp: NaN,
  timeoutID: NaN,
})

export const useStore = defineStore('main', {
  state,
  actions: {
    [types.setUser](obj: typeUser | null = null) {
      if (obj instanceof user) {
        this.userInfo = obj
        return
      }
      this.userInfo = user(obj)
    },
    [types.setTimestamp](obj: number | Date = Date.now()) {
      if (obj instanceof Date) {
        this.timestamp = obj.valueOf()
        return
      }
      this.timestamp = obj
    },
    [types.setAutoRefresh]() {
      const maxTimeout = 86400000
      const nextTime = this[types.getTimestamp] + maxTimeout - Date.now()
      if (this.timeoutID)
        clearTimeout(this.timeoutID)
      this.timeoutID = setTimeout(() => {
        localStorage.clear()
        const router = useRouter()
        router.push('/login')
      }, nextTime)
    },
  },
  getters: {
    [types.getUser](state: mainStateDataType) {
      if (isEmpty(state.userInfo.login_name))
        state.userInfo = user()
      return state.userInfo
    },
    [types.getTimestamp](state: mainStateDataType) {
      if (isNaN(state.timestamp) || isUndefined(state.timestamp) || isNull(state.timestamp))
        state.timestamp = Number(localStorage.getItem('timestamp')) || Date.now()
      return state.timestamp
    },
    [types.getTimeoutID](state: mainStateDataType) {
      return state.timeoutID
    },
  },
})

type mainStateType = () => mainStateDataType
interface gettersType { [key: string]: (state: mainStateDataType) => any }
interface actionsType { [key: string]: (obj: any) => any }

export type mainType = Store<'main', mainStateDataType, gettersType, actionsType>

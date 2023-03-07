<script lang="ts" setup name="login">
import anime from 'animejs'

import type { Ref } from 'vue'
import service from './service'
import { useStore } from '@/store'
import logo from '@/images/logo.png'
import type { IObject } from '@/interface'
import { getTimestamp, setAutoRefresh, setTimestamp, setUser } from '@/store/mutations-const'

const store = useStore()
const router = useRouter()
const account: Ref<string> = ref('')
const password: Ref<string | number> = ref('')

let current: { pause: () => void } | null = null
onMounted(() => {
  document.querySelector('#account')!.addEventListener('focus', () => {
    if (current)
      current.pause()
    current = anime({
      targets: 'path',
      strokeDashoffset: {
        value: 0,
        duration: 700,
        easing: 'easeOutQuart',
      },
      strokeDasharray: {
        value: '240 1386',
        duration: 700,
        easing: 'easeOutQuart',
      },
    })
  })
  document.querySelector('#password')!.addEventListener('focus', () => {
    if (current)
      current.pause()
    current = anime({
      targets: 'path',
      strokeDashoffset: {
        value: -336,
        duration: 700,
        easing: 'easeOutQuart',
      },
      strokeDasharray: {
        value: '240 1386',
        duration: 700,
        easing: 'easeOutQuart',
      },
    })
  })
  document.querySelector('#submit')!.addEventListener('focus', () => {
    if (current)
      current.pause()
    current = anime({
      targets: 'path',
      strokeDashoffset: {
        value: -730,
        duration: 700,
        easing: 'easeOutQuart',
      },
      strokeDasharray: {
        value: '530 1386',
        duration: 700,
        easing: 'easeOutQuart',
      },
    })
  })
  document.onkeyup = (keyEvent) => {
    const { key } = keyEvent
    if (key === 'Enter') {
      const element = document.querySelector<HTMLInputElement>('#submit')!
      element.focus()
      element.click()
    }
  }
})
onBeforeRouteLeave(() => {
  document.onkeyup = null
})
async function signIn() {
  const para: IObject = {
    username: account.value,
    password: password.value,
    product_id: 'st_00037',
  }
  for (const key in para) {
    if (Object.prototype.hasOwnProperty.call(para, key)) {
      const element = para[key]
      if (!element) {
        switch (key) {
          case 'username':
            window.$message.error('请填写账号')
            document.querySelector<HTMLInputElement>('#account')!.focus()
            break
          case 'password':
            window.$message.error('请填写密码')
            document.querySelector<HTMLInputElement>('#password')!.focus()
            break
          default:
            break
        }
        return
      }
    }
  }
  const { Code, Data } = await service.signIn()
  if (Code === 0) {
    store[setUser](Data)
    store[setTimestamp]()
    localStorage.setItem('user-info', JSON.stringify(Data))
    localStorage.setItem('timestamp', store[getTimestamp].toString())
    store[setAutoRefresh]()
    router.push({ name: 'index' })
  }
}
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="left">
        <n-image
          preview-disabled
          class="login-logo"
          :src="logo"
          width="200"
        />
        <div class="login title">
          [xx业务]
        </div>
        <div class="eula">
          欢迎使用本系统，在这儿您可以体验到【xxxx】,祝您工作愉快！
        </div>
      </div>
      <div class="right">
        <svg viewBox="0 0 320 300">
          <defs>
            <linearGradient
              id="linearGradient" inkscape:collect="always" x1="13" y1="193.49992" x2="307" y2="193.49992"
              gradientUnits="userSpaceOnUse"
            >
              <stop id="stop876" style="stop-color:#ff00ff;" offset="0" />
              <stop id="stop878" style="stop-color:#ff0000;" offset="1" />
            </linearGradient>
          </defs>
          <path
            d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143"
          />
        </svg>
        <form class="form">
          <label for="account">账号</label>
          <input id="account" v-model="account" type="text" autocomplete="username" autofocus required>
          <label for="password">密码</label>
          <input id="password" v-model="password" autocomplete="current-password" type="password" required>
          <button id="submit" type="button" class="w-full" @click.enter="signIn">
            登录
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::selection {
  background: #2D2F36;
}

::-webkit-selection {
  background: #2D2F36;
}

::-moz-selection {
  background: #2D2F36;
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: transparent;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
}
.left {
  background-color: transparent;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: calc(100% - 2rem);
  padding: 2rem;
  width: 50%;
}
.right {
  align-items: center;
  background: #474A59;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  box-shadow: 0px 0px 40px 16px rgba(0, 0, 0, 0.22);
  color: #F1F1F2;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 2rem;
  width: 50%;
}
.logo {
  width: 50%;
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  line-height: 2.5rem;
  text-align: center;
  margin-bottom: auto;
  margin-top: auto;
}

.eula {
  user-select: none;
  color: #999;
  font-size: 14px;
  line-height: 1.5;
  margin-left: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

svg {
  position: absolute;
  width: 320px;
}

path {
  fill: none;
  stroke: url(#linearGradient);
  stroke-width: 4;
  stroke-dasharray: 240 1386;
}

.form {
  margin: 40px;
  position: absolute;
  max-width: 240px;
}

label {
  color: #c2c2c5;
  display: block;
  font-size: 14px;
  height: 1rem;
  margin-top: 20px;
  margin-bottom: 5px;
}

.form input {
  background-color: transparent;
  border: 0;
  color: #f2f2f2;
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  outline: none !important;
  width: 100%;
  &::-moz-focus-inner {
    border: 0;
  }
  &:focus {
    box-shadow: none;
  }
}

#submit {
  color: #707075;
  margin-top: 44px;
  transition: color 300ms;
  outline: none;
  box-shadow: none;
}

#submit:focus {
  color: #f2f2f2;
}

#submit:active {
  color: #d0d0d2;
}
</style>

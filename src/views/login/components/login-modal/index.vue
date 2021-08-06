<template>
  <div>
    <n-card
      title="请登录"
      size="huge"
      :footer-style="{
        display: 'flex',
        justifyContent: 'flex-end'
      }"
      :segmented="{
        content: 'hard',
      }"
    >
      <n-form
        :model="formObj"
        ref="formRef"
        class="login-form"
      >
        <n-form-item
          path="loginInfo.account"
          label-placement="left"
        >
          <n-input
            round
            clearable
            size="large"
            placeholder="账号"
            v-model:value="formObj.loginInfo.account"
          ></n-input>
        </n-form-item>
        <n-form-item
          path="loginInfo.pwd"
          label-placement="left"
        >
          <n-input
            round
            clearable
            type="password"
            size="large"
            placeholder="密码"
            v-model:value="formObj.loginInfo.pwd"
          ></n-input>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-button
          ghost
          type="primary"
          :disabled="loginCheck"
          @click="login"
        >登录</n-button>
      </template>
    </n-card>
  </div>
</template>
<script>
import { ref, computed, inject } from 'vue'
import { NForm, NInput, NButton, NFormItem, NCard } from 'naive-ui'

export default {
  components: {NForm, NInput, NButton, NFormItem, NCard},
  setup() {
    const notify = inject("notify");
    const formRef = ref(null);
    const formObj = ref({
      loginInfo: {
        account: '',
        pwd: '',
      },
    });
    const login = function (e) {
      e.preventDefault();
    };
    const loginCheck = computed(function(){
      const obj = formObj.value.loginInfo;
      return !(obj.account && obj.account.length > 0 && obj.pwd && obj.pwd.length);
    });
    return {
      formRef,
      formObj,
      login,
      loginCheck,
    };
  },
}
</script>

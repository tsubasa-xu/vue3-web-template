import { ref, computed, inject, Ref, ComputedRef } from 'vue';
import { useRouter, Router } from 'vue-router';

export const setup: (props? :object, context?: object) => object = function (props, context) {
  const router: Router = useRouter();
  const service: any = inject('service');
  const notify: any = inject("notify");
  const formRef: Ref = ref(null);
  const formObj: Ref = ref({
    loginInfo: {
      account: '',
      pwd: '',
    },
  });
  const login: Function = function () {
    const para = {
      ...formObj.value.loginInfo
    };
    service.login.login(para).then((res: any) => {
      if (res.result) {
        router.push({name: 'home', query: { test: 123 }});
      }
    });
  };
  const loginCheck: ComputedRef = computed(function(){
    const obj = formObj.value.loginInfo;
    return !(obj.account && obj.account.length > 0 && obj.pwd && obj.pwd.length);
  });
  return {
    formRef,
    formObj,
    login,
    loginCheck,
  };
}

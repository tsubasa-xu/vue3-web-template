import { ref, computed, inject } from 'vue';
import { useRouter } from 'vue-router';

export const setup: (props? :object, context?: object) => object = function (props, context) {
  const router = useRouter();
  const service: any = inject('service');
  const notify = inject("notify");
  const formRef = ref(null);
  const formObj = ref({
    loginInfo: {
      account: '',
      pwd: '',
    },
  });
  const login = function () {
    const para = {
      ...formObj.value.loginInfo
    };
    service.login.login(para).then((res: any) => {
      if (res.result) {
        router.push({name: 'home', query: { test: 123 }});
      }
    });
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
}

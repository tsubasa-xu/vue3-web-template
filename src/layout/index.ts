import loginLayout from './login/index.vue';
import contentLayout from './content/index.vue';

export default function layoutRegister (app: any) {
  app.component('login-layout', loginLayout);
  app.component('content-layout', contentLayout);
}

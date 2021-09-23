<template>
  <div class="login">
    <login-modal></login-modal>
  </div>
</template>
<script>
import { setup, components } from './index';
export default {
  name: 'login',
  components,
  setup,
}
</script>
<style scoped>
  .login {
    max-width: 640px;
    width: 20vw;
  }
</style>

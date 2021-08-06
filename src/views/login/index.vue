<template>
  <div class="login">
    <login-modal></login-modal>
  </div>
</template>
<script>
import loginModal from '../login/components/login-modal/index.vue'
export default {
  components: {
    'login-modal': loginModal
  },
  setup() {

  }
}
</script>
<style scoped>
  .login {
    max-width: 640px;
    width: 20vw;
  }
</style>

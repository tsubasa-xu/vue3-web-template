<template>
  <div class="login-div">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'login-layout',
}
</script>
<style>
  .login-div {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content:center;
  }
</style>

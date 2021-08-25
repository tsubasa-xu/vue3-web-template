<template>
  <div class="empty-div">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'empty-layout',
}
</script>
<style>
  .empty-div {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content:center;
  }
</style>

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
    width: 100%;
    height: 100%;
    display: flex;
  }
</style>

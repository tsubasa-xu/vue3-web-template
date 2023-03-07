<script lang="ts" setup name="side-navigation-header">
import logo from '@/images/logo-white.png'
</script>

<template>
  <div class="w-full flex border-b-2 border-gray-700">
    <n-image
      class="img-container "
      object-fit="contain"
      preview-disabled
      :src="logo"
    />
  </div>
</template>

<style lang="scss" scoped>
.img-container {
  padding-left: 0.25rem;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>

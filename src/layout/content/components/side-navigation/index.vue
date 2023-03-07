<script setup lang="ts" name="side-navigation">
import sideNavigationHeader from './components/side-navigation-header/index.vue'
import sideNavigationContent from './components/side-navigation-content/index.vue'
import sideNavigationFooter from './components/side-navigation-footer/index.vue'
</script>

<template>
  <div class="navigation-grid">
    <side-navigation-header class="navigation-header" />
    <side-navigation-content class="navigation-content" />
    <side-navigation-footer class="navigation-footer" />
  </div>
</template>

<style lang="scss" scoped>
  .navigation-grid {
    @apply  w-full z-40 absolute shadow md:h-full flex-col justify-between transition duration-150 grid grid-flow-row auto-rows-max;
    grid-template-rows: auto 1fr auto;
    .navigation-header {
      @apply bg-gray-800;
    }
    :deep(.navigation-content) {
      @apply bg-gray-800;
    }
    .navigation-footer {
      @apply bg-gray-800;
    }
  }
</style>

<script setup lang="ts" name="ContentLayout">
import sideNavigation from './components/side-navigation/index.vue'
</script>

<template>
  <n-layout
    has-sider
    class="flex flex-1"
    style="--n-color: transparent; --header-height: 3rem;"
  >
    <n-layout-sider
      bordered
      collapse-mode="width"
      content-style="background-color: var(--sider-background-color);  --n-color: transparent;"
      style="--n-color: transparent; min-width: 15%; max-width: 40%;"
    >
      <side-navigation />
    </n-layout-sider>
    <n-layout
      :style="{
        '--n-color': 'transparent',
        '--webkit-backdrop-filter': 'blur(15px)',
        'backgroundColor': 'var(--st-content-background-color)',
        'backdropFilter': 'blur(15px)',
      }"
    >
      <n-layout-content
        class="layout-content"
        :style="{
          '--n-color': 'transparent',
          'backdropFilter': 'blur(35px)',
          'background': 'rgba(255, 255, 255, 0.1)',
          'borderRadius': '20px',
          'border': '2px solid rgba(255, 255, 255, 0.1)',
          'boxShadow': '0 0 80px rgba(0, 0, 0, 0.25)',
          'height': '100%',
          'opacity': 0.9,
          'paddingLeft': '15px',
          'paddingRight': '15px',
        }"
      >
        <router-view
          :key="$route.fullPath"
          v-slot="{ Component }"
          class="flex flex-1"
          style="overflow: auto; flexDirection: column"
        >
          <transition>
            <component :is="Component" />
          </transition>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>
.layout-content {
  :deep(.n-layout-scroll-container) {
    display: flex;
  }
}
</style>

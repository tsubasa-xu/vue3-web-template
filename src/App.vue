<script setup lang="ts">
import { dateZhCN, zhCN } from 'naive-ui'

const themeOverrides = {
  common: {
    primaryColor: '#0F62FE',
    primaryColorHover: '#2771fa',
    primaryColorPressed: '#0c4dc5',
    scrollbarColor: '#393939',
  },
  Tree: {
    nodeColorHover: 'rgba(118, 124, 130, 0.5)',
  },
}
const getLayout = computed(() => {
  const route = useRoute()
  if (route.meta.layout)
    return `${route.meta.layout}-layout`

  return 'none-layout'
})
const listenerErrorHandler = function (eventErr: Event) {
  if (['link', 'script'].includes((<HTMLLinkElement | HTMLScriptElement>eventErr?.target).localName))
    window.location.reload()
}
const listenSourceError = function () {
  window.addEventListener('error', listenerErrorHandler, true)
}
onMounted(() => {
  listenSourceError()
})
</script>

<template>
  <n-config-provider
    :date-locale="dateZhCN"
    inline-theme-disabled
    :locale="zhCN"
    :theme-overrides="themeOverrides"
  >
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider container-style="height: 100vh;pointer-events: none;">
          <n-dialog-provider>
            <div class="h-screen w-screen flex">
              <component :is="getLayout" />
            </div>
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

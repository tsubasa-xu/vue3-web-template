<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <notify></notify>
          <component :is="getLayout"></component>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue';
import { NDialogProvider, NNotificationProvider, NMessageProvider, NLoadingBarProvider } from 'naive-ui';

export default defineComponent({
  name: 'App',
  components: { NDialogProvider, NNotificationProvider, NMessageProvider, NLoadingBarProvider },
  setup() {
    const getLayout = computed(function() {
      const { proxy } : any = getCurrentInstance();
      if (proxy) {
        return `${proxy.$root.$route.meta.layout}-layout`;
      } else {
        return 'empty-layout';
      }
    });
    return {
      getLayout
    };
  },
})
</script>

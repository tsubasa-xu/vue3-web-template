<template>
</template>
<script>
import { watch } from 'vue';
import { useStore } from 'vuex';
import { useNotification } from 'naive-ui';
export default {
  name: 'notify',
  setup() {
    const notify = useNotification();
    const store = useStore();
    watch(() => store.getters.messageCount, (count, prevCount) => {
      if (count > prevCount) {
        const message = store.getters.message
        notify[message.type](
          {
            ...message,
            closable: true,
          });
      }
    })
  }
}
</script>

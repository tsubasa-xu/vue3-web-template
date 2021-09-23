<template>
  <div>
    测试一下
  </div>
</template>
<script>
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    console.log('in');
    console.log({ ...route });
  }
}
</script>

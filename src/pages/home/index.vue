<script lang="ts" setup name="home-page">
const store = useStore()
</script>

<template>
  <div>
    {{ store.userInfo }}
    <ul class="test">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
    <ul class="test2">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@mixin ul-item($text-color: $st-blue) {
  &:hover {
    color: $text-color;
  }
}

.test2 {
  @apply border hover:border-[1rem] hover:text-[$st-blue];
}

.test {
  @include ul-item;
}
</style>

<template>
  <section class="__card center">
    <slot></slot>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.__card {
  @include card;
}
</style>

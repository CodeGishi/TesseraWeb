<template>
  <button class="__button" :class="buttonClass">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Button',
    },
    href: {
      type: String,
      default: '#',
    },
    type: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    buttonClass() {
      return `--${this.type}`
    },
  },
}
</script>

<style lang="scss" scoped>
.__button {
  @include button;
  padding: 0;

  a {
    @include flex-center;
    width: 100%;
    height: 100%;
  }
}
</style>

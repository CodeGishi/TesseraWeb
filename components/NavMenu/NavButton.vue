<template>
  <nuxt-link :to="path" class="__nav__button">
    {{ name }}
  </nuxt-link>
</template>

<script>
export default {
  name: 'NavButton',
  props: {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.__nav__button {
  @include flex-center;
  position: relative;
  padding: 0rem 2rem;
  height: 100%;
  color: #333;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    top: calc(100% - 2px);
    left: 0;
    background-color: $primary;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.5s ease-in-out 0s;
  }

  &.nuxt-link-exact-active {
    color: $primary;
    &:before {
      visibility: visible;
      transform: scaleX(1);
    }
  }

  &:hover {
    color: $primary;
    opacity: 1 !important;

    &.nuxt-link-exact-active {
      color: $primary;
    }
  }
}
</style>

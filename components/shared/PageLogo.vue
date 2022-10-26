<template>
  <div class="__logo" @click="$router.push('/')">
    <img :src="logo" alt="" />
  </div>
</template>

<script>
export default {
  name: 'PageLogo',
  props: {
    color: {
      type: String,
      default: 'white',
    },
  },
  data() {
    return {}
  },
  computed: {
    logo() {
      if (this.color === 'black') {
        return require('@/assets/img/logo-black.png')
      } else {
        return require('@/assets/img/logo-white.png')
      }
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.__logo {
  height: 100%;
  margin-right: 3rem;
  padding: 0.2rem;
  transition: all 0.2s ease-in-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
}
</style>

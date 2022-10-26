<template>
  <n-card class="__banner" :style="bannerStyle">
    <slot></slot>
  </n-card>
</template>

<script>
import nCard from './shared/card/n-card.vue'

export default {
  components: { nCard },
  props: {
    backgroundImage: {
      type: String,
      default: 'https://picsum.photos/900/360',
    },
  },
  computed: {
    bannerStyle() {
      return {
        backgroundImage: `url(${require(`@/assets/img/${this.backgroundImage}`)})`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.__banner {
  display: flex;
  justify-content: flex-start;
  height: 500px;
  width: 1200px;
  padding: 3rem 7rem;

  background-size: cover;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 300px;
    padding: 2rem 1rem;
  }
}
</style>

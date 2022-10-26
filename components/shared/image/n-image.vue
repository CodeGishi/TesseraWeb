<template>
  <div class="_image center">
    <img :src="computedSrc" alt="alt" />
  </div>
</template>

<script>
export default {
  name: "NImage",
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
  computed: {
    computedSrc() {
      return this.src;
    },
  },
};
</script>

<style lang="scss" scoped>
._image {
  max-width: 100%;
  img {
    width: auto;
    min-height: 100%;
    object-fit: contain;
  }
}
</style>

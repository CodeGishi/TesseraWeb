<template>
  <li @click="closeNav">
    <nuxt-link :to="localePath(getPath + getHash)">
      {{ $t(text) }}
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    path: {
      type: String,
      default: "",
    },
    hash: {
      type: String,
      default: "",
    },
  },
  computed: {
    getPath() {
      return this.path;
    },
    getHash() {
      return `${this.hash}`;
    },
  },
  methods: {
    closeNav() {
      this.$nuxt.$emit("closeMobileDropdown");
      this.$nuxt.$emit("closeMobileNav");
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  margin-bottom: 0.5rem;
  a {
    color: white;
    text-decoration: none;
  }
}
</style>

<template>
  <div v-if="link" class="mobile-dropdown" @click="closeNav">
    <nuxt-link :to="link">
      <h1>{{ text }}</h1>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    text: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      expanded: false,
    }
  },

  methods: {
    closeNav() {
      this.$nuxt.$emit('closeMobileNav')
    },
  },
}
</script>

<style lang="scss" scoped>
.mobile-dropdown {
  a {
    text-decoration: none;
    color: white;
  }
}

h1 {
  margin: 0.5rem 0;
  margin-right: 1rem;
}

ul {
  transition: all 1.5s;
  height: 0px;
  margin-right: 1rem;
  ul {
    height: 0px;
  }
  & > li {
    visibility: hidden;
    opacity: 0;
  }
}

.visible {
  background-color: rgba(0, 0, 0, 0.137);
  height: fit-content;
  padding: 1rem 1rem;
  list-style: none;

  & > li {
    visibility: visible;
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

<template>
  <div>
    <transition name="fade">
      <div v-show="scY > limit" id="pagetop" class="flex-center" @click="toTop">
        <span class="material-icons flex-center"> expand_less </span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scTimer: 0,
      scY: 0,
    }
  },
  computed: {
    limit() {
      const height = this.$store.getters['site/getPageHeight']
      const limit = height - 0.5 * height
      return limit
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    clearTimeout(this.scTimer)
  },
  methods: {
    handleScroll() {
      if (this.scTimer) {
        return
      }
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY
        clearTimeout(this.scTimer)
        this.scTimer = 0
      }, 100)
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#pagetop {
  position: fixed;
  z-index: 10;
  right: 4rem;
  bottom: 5rem;
  width: 60px;
  height: 60px;
  margin: 0;
  padding: 0;
  background-color: $primary;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;

  span {
    z-index: 11;
    display: flex;
    width: 100%;
    height: 100%;
    color: white;
    font-size: 3rem;
  }
}
</style>

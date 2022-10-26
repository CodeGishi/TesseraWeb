<template>
  <div class="__cube_logo" :style="getBackground"></div>
</template>

<script>
export default {
  name: 'CubeLogo',
  props: {
    id: {
      type: Number,
      default: 0, // max is 42
    },
    color: {
      type: String,
      default: 'white',
    },
  },
  data() {
    return {}
  },
  computed: {
    getBackground() {
      if (this.color === 'black') {
        return {
          background: `url(${require(`@/assets/img/cubes_black.png`)})
            -${this.getColumn()}px
            -${this.getRow()}px
            `,
        }
      } else {
        return {
          background: `url(${require(`@/assets/img/cubes_white.png`)})
            -${this.getColumn()}px
            -${this.getRow()}px
          `,
        }
      }
    },
  },
  methods: {
    getRow() {
      return Math.floor(this.id / 7) * 98
    },
    getColumn() {
      return (this.id % 7) * 87.5
    },
  },
}
</script>

<style lang="scss" scoped>
.__cube_logo {
  min-width: 90px;
  min-height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
  transition: all 0.5s ease-in-out;
}
</style>

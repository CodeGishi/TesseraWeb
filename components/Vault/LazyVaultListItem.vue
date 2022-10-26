<template>
  <div class="__item" @click="openPreview">
    <cube-logo :id="id" />
    <h4 class="__title" :title="data.title">
      {{ data.title }}
    </h4>
    <span v-if="data.fav" class="material-icons-outlined __fav">
      favorite_border
    </span>
  </div>
</template>

<script>
import CubeLogo from '../CubeLogo/CubeLogo.vue'

export default {
  name: 'VaultListItem',
  components: { CubeLogo },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    customIcon: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      title: '',
    }
  },
  computed: {
    id() {
      if (!this.customIcon) {
        return Number(this.data.icon)
      } else {
        return Number(this.customIcon) % 43
      }
    },
  },
  methods: {
    openPreview() {
      this.$store.dispatch('modal/openModal', 'preview')
      this.$store.dispatch('modal/setModalData', this.data)
    },
  },
}
</script>

<style lang="scss" scoped>
.__item {
  @include flex-row;
  @include center;
  position: relative;
  width: 15rem;
  height: 5rem;
  background-color: rgb(240, 240, 240);
  border-radius: 1rem;
  padding: 1rem;
  transition: all 0.2s ease-in-out;
  user-select: none;
  cursor: pointer;

  .__title {
    width: 100%;
    margin-left: 0.51rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .__fav {
    position: absolute;
    right: 8px;
    top: 8px;
    margin-left: auto;
    color: rgb(34, 169, 102);
    font-size: 16px;
  }

  &:hover {
    background-color: $primary20;
    transform: scale(1.05);

    .__cube_logo {
      transform: scale(1.05);
    }
  }
}
</style>

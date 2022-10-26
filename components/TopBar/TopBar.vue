<template>
  <div class="__topbar">
    <div class="__topbar__items">
      <page-logo class="" color="black" />
      <main-nav v-if="isDesktop" />

      <div v-if="isDesktop" class="__topbar__items__account">
        <nuxt-link v-if="!isLoggedIn" to="/register" class="__btn__sign_up">
          Sign up
          <span class="material-icons-outlined"> navigate_next </span>
        </nuxt-link>
        <user-button class="__btn__sign_in" />
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from '../NavMenu/MainNav.vue'
import PageLogo from '../shared/PageLogo.vue'
import UserButton from './UserButton.vue'

export default {
  name: 'TopBar',
  components: { MainNav, PageLogo, UserButton },
  data() {
    return {}
  },
  computed: {
    isDesktop() {
      return this.$store.getters['site/isDesktop']
    },
    isTablet() {
      return this.$store.getters['site/isTablet']
    },
    isMobile() {
      return this.$store.getters['site/isMobile']
    },
    isLoggedIn() {
      if (this.$store.getters['auth/username']) {
        return true
      }
      return false
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.__topbar {
  @include flex-row;
  @include center;
  width: 100%;
  height: $topbar-height;
  background-color: $topbar-background;

  &__items {
    @include flex-row;
    @include center;
    width: var(--container-width);
    height: 100%;

    &__account {
      @include flex-row;
      @include center;
      gap: 1rem;
      height: 100%;
      width: fit-content;
      margin-left: auto;
    }
  }

  .__btn__sign_up {
    @include flex-center;
    color: $primary;
    transition: all 0.3s ease-in-out;

    span {
      transform: scale(0);
      transition: all 0.3s ease-in-out;
    }

    &:hover {
      span {
        transform: scale(1);
      }
    }
  }

  .__btn__sign_in {
    margin-right: 2rem;
  }
}
</style>

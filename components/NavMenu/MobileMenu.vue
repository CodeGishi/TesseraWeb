<template>
  <div v-show="show" class="_mobile-nav">
    <div class="_mobile-nav__logo" @click="navHidden = false">
      <nuxt-link to="/">
        <img src="../../assets/img/logo.svg" alt="logo" />
      </nuxt-link>
    </div>
    <div class="_burger-menu" @click="toggleNav">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <transition name="fade">
      <div v-show="navHidden" class="_menu-content">
        <ul>
          <mobile-nav-dropdown
            v-for="item in menuItems"
            :key="item.id"
            :text="item.name"
            :link="item.path"
          />
          <mobile-nav-dropdown
            v-if="isLoggedIn"
            text="Sign out"
            link="/"
            @click="logout"
          />
          <mobile-nav-dropdown
            v-else-if="!isLoggedIn"
            text="Sign in"
            link="/login"
          />
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import MobileNavDropdown from './MobileNavDropdown.vue'

export default {
  name: 'MobileMenu',
  components: { MobileNavDropdown },
  data() {
    return {
      show: false,
      navHidden: false,
      menuItems: [
        {
          name: 'Storage',
          path: '/storage',
        },
        {
          name: 'Guidelines',
          path: '/guidelines',
        },
        {
          name: 'Contact',
          path: '/contact',
        },
      ],
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn']
    },
  },
  mounted() {
    this.$nuxt.$on('closeMobileNav', () => {
      this.navHidden = false
    })
    if (!this.$store.getters['site/isDesktop']) {
      this.show = true
    }
  },
  beforeDestroy() {
    this.$nuxt.$off('closeMobileNav')
  },
  methods: {
    toggleNav() {
      this.navHidden = !this.navHidden
    },
    closeMenu() {
      this.navHidden = true
    },
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
._mobile-nav {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: flex-end;
  height: 100%;
  width: 100vw;
  background-color: $dark;

  &__logo {
    position: absolute;
    left: 1rem;
    top: 0;
    margin: 25px;
    width: 50px;
    height: 50px;
    z-index: 100;

    img {
      width: 100%;
      height: 100%;
    }
  }

  ._burger-menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    margin-right: 0rem;

    span {
      display: block;
      content: '';
      width: 30%;
      height: 3px;
      background-color: white;
      margin-bottom: 3px;
    }

    @media screen and (max-width: 375px) {
      margin-right: 1rem;
    }
  }
}

._menu-content {
  position: absolute;
  z-index: 99;
  top: 100%;
  right: 0;
  width: 100%;
  min-height: 100vh;
  padding-top: 3rem;
  color: white;
  background-color: $dark;

  box-shadow: inset 0 20px 20px -15px rgba(0, 0, 0, 0.5);

  ul {
    list-style: none;
    color: white;
    text-align: right;

    li {
      color: white;
      font-size: 1.5rem;

      ul {
        color: white;
        margin-bottom: 1rem;

        li {
          margin-left: 3rem;
        }
      }
    }
  }
}
</style>

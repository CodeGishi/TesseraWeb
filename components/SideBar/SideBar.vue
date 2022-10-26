<template>
  <div
    class="__sidebar"
    :class="{ '--collapsed': navHidden }"
    @click="closeMenu"
  >
    <div class="__sidebar__header">
      <div class="__sidebar__header__logo">
        <img src="~/assets/img/logo-white.png" alt="logo" />
      </div>
    </div>
    <div class="__sidebar__body" :class="{ '--collapsed': navHidden }">
      <div class="__sidebar__body__item">
        <nuxt-link to="/storage">
          <span class="__sidebar__body__item__text"> Storage </span>
          <span class="material-icons __sidebar__body__item__icon">
            storage
          </span>
        </nuxt-link>
      </div>
      <div class="__sidebar__body__item">
        <nuxt-link to="/calculate">
          <span class="__sidebar__body__item__text"> Calculate </span>
          <span class="material-icons __sidebar__body__item__icon">
            calculate
          </span>
        </nuxt-link>
      </div>
      <div class="__sidebar__body__item">
        <nuxt-link to="/about">
          <span class="__sidebar__body__item__text"> About </span>
          <span class="material-icons __sidebar__body__item__icon"> info </span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  components: {},
  data() {
    return {
      navHidden: false,
      menuItems: [
        {
          name: 'Storage',
          path: '/storage',
        },
        {
          name: 'Calculate',
          path: '/calculate',
        },
        {
          name: 'About',
          path: '/about',
        },
      ],
    }
  },
  methods: {
    closeMenu() {
      this.navHidden = !this.navHidden
    },
  },
}
</script>

<style lang="scss" scoped>
.__sidebar {
  background-color: #fff;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  transform: translateX(0%);
  transition: transform 0.3s ease-in-out;

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 101%;
    background-color: #161b1e;
    &__logo {
      width: 50px;
      height: 50px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &__title {
      color: #fff;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }
  }
  &__body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: calc(100% - 50px);
    width: 100%;
    &.--collapsed {
      transform: translateX(-90%);
    }
    &__item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #e0e0e0;
      &__text {
        font-size: 1.2rem;
        font-weight: 700;
        color: #161b1e;
        margin-left: 1rem;
      }
      &__icon {
        font-size: 1.5rem;
        color: #161b1e;
        margin-left: auto;
        margin-right: 1rem;
      }
    }
  }
}
</style>

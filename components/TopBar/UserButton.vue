<template>
  <div v-if="isLoggedIn" class="account">
    <span class="__dropdown">
      <span class="material-icons-outlined"> account_circle </span>
      {{ user }}
      <span class="__dropdown__content">
        <nuxt-link class="account__button --out" to="/" @click.native="logout">
          <span class="material-icons-outlined"> logout </span>
          sign out
        </nuxt-link>
      </span>
    </span>
  </div>
  <div v-else>
    <nuxt-link class="account__button" to="/login">Sign in</nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'UserButton',
  data() {
    return {}
  },
  computed: {
    user() {
      const username = this.$store.getters['auth/username']
      return username
    },
    isLoggedIn() {
      if (this.$store.getters['auth/username']) {
        return true
      }
      return false
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('vault/clearVaultData')
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>

<style lang="scss" scoped>
.account {
  @include flex-center;
  color: $primary;
  height: 100%;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  span {
    font-size: 1.2rem;
  }

  &__button {
    @include flex-center;
    max-height: 3rem;
    padding: 0.7rem 1.5rem;
    color: $dark;
    border-radius: 5px;
    border: 1px solid $dark;

    &:hover {
      border-color: $primary;
      color: $primary;
    }

    &:active {
      transform: scale(0.98);
    }

    &.--out {
      border-color: transparent;
      font-weight: 300;
      font-size: 1rem;
    }
  }

  a {
    height: 100%;
    text-decoration: none;
  }
}
.__dropdown {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .material-icons-outlined {
    font-size: 2rem;
    margin-right: 1rem;
  }

  .__dropdown__content {
    @include flex-center;
    display: none;
    position: absolute;
    top: 100%;
    left: 00%;
    background-color: #f9f9f9;
    min-width: 160px;
    width: 10rem;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    margin-left: 0;

    a {
      @include flex-center;
      width: 100%;
      height: 3rem;
      color: #333;
      text-decoration: none;
      margin-left: 0;
      transition: color 0.2s ease-in-out;
      &:hover {
        color: $primary;
      }
    }
  }
  &:hover .__dropdown__content {
    display: flex;
  }
}
</style>

<template>
  <div class="__search" :class="{ '--active': isActive }">
    <div class="__search__input">
      <button @click="isActive = !isActive">
        <span class="material-icons"> search </span>
      </button>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search"
        @keyup="search"
      />
      <div v-if="searchQuery.length > 0" class="__search__input__clear">
        <span class="material-icons" @click="clearSearch"> close </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VaultSearch',
  components: {},
  props: {},
  data() {
    return {
      searchQuery: '',
      isActive: true,
    }
  },
  methods: {
    search() {
      this.$store.dispatch('vault/searchVaultItems', this.searchQuery)
    },
    clearSearch() {
      this.searchQuery = ''
      this.$store.dispatch('vault/searchVaultItems', this.searchQuery)
    },
  },
}
</script>

<style lang="scss" scoped>
.__search {
  display: flex;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 4rem;
  background-color: $white;
  border: 1px solid $primary;
  transition: all 0.3s ease-in-out;

  &.--active {
    width: 17rem;
    .__search__input {
      width: 100%;
      input {
        display: flex;
      }
      button {
        width: 3rem;
        span {
          color: $primary;
        }
        color: $primary;
      }
    }
  }

  &__input {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    color: $dark;

    input {
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
      border-radius: 1rem;
      color: $dark;
      background-color: $white;
      display: none;
    }

    button {
      @include flex-center;
      width: 3rem;
      height: 100%;
      outline: none;
      cursor: pointer;

      span {
        @include flex-center;
        width: 100%;
        height: 100%;

        &:hover {
          color: $primary;
          transform: scale(1.05);
        }
      }
    }

    &__clear {
      @include flex-center;
      width: 3rem;
      height: 100%;
      outline: none;

      span {
        @include flex-center;
        width: 100%;
        height: 100%;

        &:hover {
          color: $primary;
          transform: scale(1.05);
        }
      }

      cursor: pointer;
    }
  }
}
</style>

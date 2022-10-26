<template>
  <div class="__list">
    <!-- CONTORLS -->
    <div class="__list__controls">
      <div class="__list__controls__left">
        <!-- SEARCH -->
        <vault-search />
      </div>
      <div class="__list__controls__right">
        <!-- NEW -->
        <button @click="showCreateModal">
          add
          <span class="material-icons-outlined"> add </span>
        </button>
        <button v-if="!isProduction" @click="clearStorage">
          DEV:clear
          <span class="material-icons-outlined"> code </span>
        </button>
        <button v-if="!isProduction" @click="populateStorage">
          DEV:populate
          <span class="material-icons-outlined"> code </span>
        </button>
      </div>
    </div>
    <!-- NAV -->
    <storage-side-nav
      class="__storage__side"
      @click="sortVaultItems('date', 'desc')"
    />
    <!-- LIST -->
    <div v-if="$fetchState.pending">
      <loading-component v-if="$fetchState.pending" />
    </div>
    <div v-else class="__list__items">
      <lazy-vault-list-item
        v-for="(item, index) in vaultItems"
        :key="index"
        :data="item"
      />
    </div>
  </div>
</template>

<script>
import StorageSideNav from '../StorageSideNav/StorageSideNav.vue'
import LazyVaultListItem from './LazyVaultListItem.vue'
import VaultSearch from './VaultSearch.vue'

export default {
  name: 'VaultList',
  components: { LazyVaultListItem, VaultSearch, StorageSideNav },
  props: {},
  async fetch() {
    if (this.$store.getters['vault/getVaultItems'].length === 0) {
      await this.$store.dispatch('vault/fetchVaultData')
    } else {
      return this.vaultItems
    }
  },
  computed: {
    vaultItems() {
      return this.$store.getters['vault/getVaultItems']
    },
    isProduction() {
      return process.env.NODE_ENV === 'production'
    },
  },
  watch: {
    '$store.state.vault.vault': {
      handler() {
        // console.log('vaultItems changed')
      },
      deep: true,
    },
  },
  beforeDestroy() {
    this.$nuxt.$off('refreshStorage')
  },
  methods: {
    showCreateModal() {
      this.$store.dispatch('modal/openModal', 'create')
    },
    clearStorage() {
      this.$store.dispatch('vault/clearVaultData')
    },
    populateStorage() {
      const { vault } = require('~/test/mock/vault.js')
      for (let i = 0; i < vault.length; i++) {
        this.$store.dispatch('vault/createVaultItem', vault[i])
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.__list {
  @include flex-column;
  width: 100%;
  height: 100%;
  padding-top: 1rem;

  &__controls {
    @include flex-row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 2rem;
    margin-bottom: 1rem;
    padding: 0 1rem;

    @media screen and (max-width: 800px) {
      flex-direction: column;
      align-items: flex-end;
      height: fit-content;
    }

    &__left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 50%;
      height: 100%;
    }

    &__right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 50%;
      height: 100%;

      button {
        @include flex-center;
        border-radius: 1rem;
        padding: 0.2rem 1rem;
        border: 1px solid $primary;
        opacity: 1;
        &:hover {
          border-right-width: 3px;
        }
      }
    }
  }

  &__items {
    $columns: 4;
    $gaps: $columns - 1;
    $gap: 2rem;
    @include flex-row;
    flex-wrap: wrap;
    gap: $gap;
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 3rem;
    width: calc($columns * $vault-item-width + $gaps * $gap);
    height: 100%;

    @media screen and (max-width: 1440px) {
      $columns: 3;
      width: calc($columns * $vault-item-width + $gaps * $gap);
    }
    @media screen and (max-width: 800px) {
      $columns: 2;
      width: calc($columns * $vault-item-width + $gaps * $gap);
    }
    @media screen and (max-width: 800px) {
      $columns: 1;
      $gap: 0rem;
      width: calc($columns * $vault-item-width + $gaps * $gap);
    }
  }
}
</style>

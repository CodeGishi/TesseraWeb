<template>
  <div class="__page __storage">
    <card-section
      class="__storage__center"
      title="Storage"
      subtitle="Add, browse, and manage your secrets freely"
      :class="{ '--blur': $store.getters['modal/isOpen'] }"
    >
      <template #content>
        <vault-list />
      </template>
    </card-section>

    <div
      v-if="$store.getters['modal/isOpen']"
      class="__page__modals"
      :style="pageHeight"
      @click.self="closeModals"
    >
      <create-modal />
      <item-modal />
      <edit-modal />
    </div>
  </div>
</template>

<script>
import CardSection from '~/components/CardSection/CardSection.vue'
import CreateModal from '~/components/CreateModal/CreateModal.vue'
import EditModal from '~/components/EditModal/EditModal.vue'
import ItemModal from '~/components/ItemModal/ItemModal.vue'
import VaultList from '~/components/Vault/VaultList.vue'

export default {
  name: 'StoragePage',
  components: {
    VaultList,
    CardSection,
    CreateModal,
    ItemModal,
    EditModal,
  },
  data() {
    return {}
  },
  async fetch() {},
  computed: {
    showCreateModal() {
      return this.$store.getters['modal/isOpen']
    },
    pageHeight() {
      const height = this.$store.getters['site/getPageHeight']
      return `height: ${height}px`
    },
  },
  beforeDestroy() {
    this.$store.dispatch('modal/closeModal')
    this.$store.dispatch('vault/clearFilters')
  },
  methods: {
    closeModals() {
      this.$store.dispatch('modal/closeModal')
    },
  },
}
</script>

<style lang="scss" scoped>
.__storage {
  @include flex-row;
  justify-content: flex-start;
  align-items: flex-start;
  width: var(--container-width);
  height: 100%;
  padding-top: 5rem;
  margin-bottom: 7rem;

  @media screen and (max-width: 1000px) {
    padding-top: 0rem;
  }

  &__side {
    width: 00%;
    height: 100%;
    min-height: 50vh;
    margin-top: 150px;
    margin-right: 1rem;
    padding: 1rem;
    background-color: #e3e3e3;
    border-radius: 1rem;

    &__button {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 3rem;
      padding: 0 1rem;
      margin-bottom: 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: $dark;
        color: $white;
      }
    }
  }

  &__center {
    width: 100%;
    height: 100%;
  }
}

.__page__modals {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.3);
}
</style>

<template>
  <div class="__sidenav">
    <ul>
      <li
        v-for="(tag, index) in tags"
        :key="tag.name"
        :class="{ '--selected': index === selectedIndex }"
        @click="selectItem(index)"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StorageSideNav',
  components: {},
  props: {},
  data() {
    return {
      tags: [
        { name: 'All' },
        { name: 'Banking' },
        { name: 'Email' },
        { name: 'Entertainment' },
        { name: 'Finance' },
        { name: 'Health' },
        { name: 'Misc' },
        { name: 'Shopping' },
        { name: 'Social' },
        { name: 'Other' },
      ],
      selectedIndex: 0,
    }
  },
  methods: {
    selectItem(index) {
      this.selectedIndex = index
      this.$store.dispatch('vault/filterVaultItems', this.tags[index].name)
    },
  },
}
</script>

<style lang="scss" scoped>
.__sidenav {
  @include flex-column;
  flex-wrap: wrap;
  width: 100%;
  height: fit-content;
  padding: 0 2rem;
  margin-bottom: 1rem;
  color: $dark;

  @media screen and (max-width: 800px) {
    padding: 0 1rem;
  }

  span {
    opacity: 0;
  }

  ul {
    @include flex-row;
    flex-wrap: wrap;
    gap: 1rem;
    min-height: 4rem;
    height: fit-content;
    padding: 0.5rem;

    @media screen and (max-width: 800px) {
      gap: 0.25rem;
    }

    li {
      @include flex-center;
      height: 2rem;
      margin: 0;
      padding: 0;
      font-size: 1rem;
      font-weight: 300;
      margin: 0;
      padding: 0;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      background-color: #fff;
      border-radius: 2rem;
      padding: 0.5rem 1rem;

      &.--selected {
        color: $white;
        font-size: 1rem;
        background-color: $primary;
      }
    }
  }
}
</style>

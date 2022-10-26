<template>
  <nav class="__nav">
    <ul>
      <li v-for="(item, index) in menuItems" :key="index">
        <nav-button :name="item.name" :path="item.path" />
      </li>
    </ul>
  </nav>
</template>

<script>
import NavButton from './NavButton.vue'

export default {
  name: 'MainNav',
  components: { NavButton },
  data() {
    return {
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
}
</script>

<style lang="scss" scoped>
.__nav {
  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: $topbar-height;
    list-style: none;

    &:hover {
      li {
        a {
          opacity: 0.6;
        }
      }
    }

    li {
      display: flex;
      height: 100%;
    }
  }
}
</style>

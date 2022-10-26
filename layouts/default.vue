<template>
  <div v-if="isDesktop" class="__desktop">
    <top-bar />
    <Nuxt />
    <site-footer />
    <scroll-top />
  </div>
  <div v-else-if="isTablet" class="__tablet">
    <mobile-menu />
    <!-- <top-bar /> -->
    <Nuxt />
    <site-footer />
    <scroll-top />
  </div>
  <div v-else class="__mobile">
    <mobile-menu />
    <!-- <top-bar /> -->
    <Nuxt />
    <site-footer />
    <scroll-top />
  </div>
</template>

<script>
import SiteFooter from '../components/SiteFooter/SiteFooter.vue'
import ScrollTop from '../components/ScrollTop/ScrollTop.vue'
import TopBar from '@/components/TopBar/TopBar.vue'
import MobileMenu from '@/components/NavMenu/MobileMenu.vue'

export default {
  name: 'DefaultLayout',
  components: { TopBar, SiteFooter, ScrollTop, MobileMenu },
  data() {
    return {
      observer: false,
    }
  },
  head() {
    return {
      title: this.pageTitle(),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageDescription(),
        },
        /* FACEBOOK OPEN GRAPH */
        {
          property: 'og:url',
          content: `https://tessera-web.eu${this.pageURL()}`,
        },
        {
          property: 'og:title',
          content: `${this.pageTitle()}`,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:description',
          content: `${this.pageDescription()}`,
        },
        {
          property: 'og:image',
          content:
            'https://cdn.discordapp.com/attachments/394416493288357899/1032772792975900722/thumb.jpg',
        },
        /* GOOGLE ITEMPROP */
        {
          itemprop: 'name',
          content: `${this.pageTitle()}`,
        },
        {
          itemprop: 'description',
          content: `${this.pageDescription()}`,
        },
        {
          itemprop: 'image',
          content:
            'https://cdn.discordapp.com/attachments/394416493288357899/1032772792975900722/thumb.jpg',
        },
        /* TWITTER META */
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: `${this.pageTitle()}`,
        },
        {
          name: 'twitter:description',
          content: `${this.pageDescription()}`,
        },
        {
          name: 'twitter:image',
          content:
            'https://cdn.discordapp.com/attachments/394416493288357899/1032772792975900722/thumb.jpg',
        },
      ],
    }
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
  },
  mounted() {
    this.ResizeObserver()
  },
  beforeDestroy() {
    console.log('%% ~ beforeDestroy ~ beforeDestroy Layout')
    this.observer.disconnect()
  },
  methods: {
    ResizeObserver() {
      this.observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const cr = entry.contentRect
          this.$store.commit('site/SET_DEVICE', cr.width)
          this.$store.commit('site/SET_PAGE_HEIGHT', cr.height)
        }
      })
      this.observer.observe(document.body)
    },
    pageTitle() {
      return 'TesseraWeb'
    },
    pageDescription() {
      const desc =
        'Never worry about password leaks again with our client-side encryption. TesseraWeb gives you the power to create passwords that are stronger and more difficult to crack, while making it easy to manage them.'
      return desc
    },
    pageURL() {
      const pageURL = this.$nuxt.$route.path
      return pageURL
    },
  },
}
</script>

<style lang="scss" scoped>
.__desktop {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.__tablet {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.__mobile {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<style>
/* Page-transition styles must be global */
/* page is used by default */
.page-leave-active,
.page-enter-active {
  transition: opacity 0.3s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>

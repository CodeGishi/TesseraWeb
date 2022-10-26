<template>
  <div class="nuxt-error __page">
    <component :is="errorPage" :error="error" />
  </div>
</template>

<script>
import error404 from '~/components/ErrorComponents/Error-404.vue'
import error500 from '~/components/ErrorComponents/Error-500.vue'

export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    errorPage() {
      if (this.error.statusCode === 404) {
        return error404
      }
      // catch everything else
      return error500
    },
  },
}
</script>

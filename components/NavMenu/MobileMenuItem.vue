<template>
  <div>
    MobileMenuItem
    {{ name }}
    {{ path }}
  </div>
</template>

<script>
export default {
  name: 'MobileMenuItem',
  components: {},
  props: {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>

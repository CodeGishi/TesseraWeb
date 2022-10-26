<template>
  <div class="__page">
    <login-form redirect="/storage" />
  </div>
</template>

<script>
import LoginForm from '~/components/LoginForm/LoginForm.vue'
export default {
  name: 'LoginPage',
  components: { LoginForm },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped></style>

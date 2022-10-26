<template>
  <div class="__page">
    <login-form />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm/LoginForm.vue'
export default {
  name: 'LoginPage',
  components: { LoginForm },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn']
    },
    credentials() {
      return this.$store.getters['user/getCredentials']
    },
  },
  methods: {
    async login() {
      const result = await this.$store.dispatch('user/login', {
        username: this.username,
        password: this.password,
      })
      if (result) {
        this.$router.push({ path: '/' })
      } else {
        console.log('Login failed')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>

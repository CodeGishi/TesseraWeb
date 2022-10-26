<template>
  <div class="error-page error-500">
    <span class="icon material-icons"> error </span>
    <h1>An error occurred <span> (UNKNOWN)</span></h1>
    <p>
      A network error occurred.
      <br />
      This could be a CORS issue or a dropped internet connection.
      <br />
      It is not possible for us to know
    </p>
    <br />
    <nuxt-link to="/"> Go to home page </nuxt-link>
  </div>
</template>
<script>
export default {
  name: 'ErrorComponentUnk',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  methods: {},
}
</script>

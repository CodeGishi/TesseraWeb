<template>
  <div class="error-page error-404">
    <span class="icon material-icons"> error_outline </span>
    <h1>Ooops.</h1>
    <p>This page doesn't exist <span> (404)</span></p>
    <br />
    <div class="buttons">
      <nuxt-link to="/" class="btn">home page </nuxt-link>
      <button class="btn" @click="navigateBack">Go back</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorComponent404',
  components: {},
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    navigateBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
.error-page {
  @include flex-column;
  @include center;
  width: 100%;
  height: 100%;
  height: 80vh;
  color: #333;
  font-size: 1.5rem;
  font-weight: 300;
  text-align: center;
  font-weight: bold;

  h1 {
    font-size: 4rem;
    margin: 0;
    padding: 0;
  }

  span.icon {
    font-size: 7rem;
  }

  p {
    color: #666;
    width: 50%;
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-style: italic;
  }
}

.buttons {
  @include flex-row;
  @include center;
  button {
    margin: 0 1rem;
  }
}

.btn {
  @include button;
  border: 1px solid $primary;

  &:hover {
    color: $primary;
  }
}

.error-404 {
  span.icon {
    font-size: 7rem;
    color: $primary;
  }
}
</style>

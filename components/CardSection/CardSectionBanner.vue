<template>
  <div class="__card__banner">
    <div class="__card__banner__header">
      <h2 class="__card__banner__header__title">{{ text }}</h2>
      <p class="__card__banner__header__subtitle">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSectionBanner',
  components: {},
  props: {
    text: {
      type: String,
      default: 'default text',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.__card__banner {
  display: flex;
  justify-content: flex-start;
  height: 150px;
  background: url('../../assets/img/banner2.jpg') no-repeat center;
  background-size: cover;
  overflow: hidden;

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    color: $dark;

    &__title {
      font-size: 3rem;
      font-weight: 700;
      margin-left: 5rem;
      color: $white;

      @media screen and (max-width: 800px) {
        font-size: 2rem;
        margin-left: 1rem;
      }
    }

    &__subtitle {
      color: $white;
      font-size: 1rem;
      font-weight: 300;
      margin: 0;
      margin-left: 5rem;
      padding: 0;

      @media screen and (max-width: 800px) {
        margin-left: 1rem;
        width: 70%;
        font-size: 0.8rem;
      }
    }
  }
}
</style>

<template>
  <section class="__card">
    <card-section-banner :text="title" :subtitle="subtitle" />

    <div class="__card__content">
      <slot name="content"></slot>
    </div>
  </section>
</template>

<script>
import CardSectionBanner from './CardSectionBanner.vue'
export default {
  name: 'CardSection',
  components: { CardSectionBanner },
  props: {
    title: {
      type: String,
      default: 'def title',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
section.__card {
  min-height: 150vh;
  background-color: $white;
  border-radius: 0.5rem;
  overflow: hidden;

  @media screen and (max-width: 800px) {
    border-radius: 0;
  }

  &__content {
    @include flex-column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 2rem;
    background-color: yellow;
  }
}
</style>

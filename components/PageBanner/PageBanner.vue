<template>
  <div class="__page_banner">
    <div class="banner" :style="bannerStyle"></div>
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: 'PageBanner',
  props: {
    image: {
      type: String,
      default: 'https://picsum.photos/1920/1080',
    },
  },
  computed: {
    bannerStyle() {
      if (this.$store.getters['site/isMobile']) {
        return {
          background: `url(${require(`@/assets/img/${this.image}`)})`,
          backgroundSize: '500% 90%',
          backgroundPosition: '50% top',
          backgroundRepeat: 'no-repeat',
        }
      } else if (this.$store.getters['site/isTablet']) {
        return {
          background: `url(${require(`@/assets/img/${this.image}`)})`,
          backgroundSize: '200% 100%',
          backgroundPosition: '70% 100%',
          backgroundRepeat: 'no-repeat',
        }
      } else {
        return {
          background: `url(${require(`@/assets/img/${this.image}`)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.__page_banner {
  display: flex;
  width: 100%;
  min-height: 650px;
  padding: 0;
  margin: 0;
  height: 650px;
  max-height: 650px;
  overflow: hidden;

  .banner {
    position: absolute;
    width: 100%;
    height: 100%;
    max-height: 650px;
    z-index: -1;
  }

  @media screen and (max-width: 500px) {
    @include flex-column;
    width: 100%;
  }
}

.__banner__content {
  margin: 0;
  padding: 0;
  padding-top: 10rem;
  width: var(--container-width);
  margin: 0 auto;
  color: white;
  max-height: 650px;

  &__title {
    font-size: 3rem;
    width: 60%;

    span {
      color: $primary;
    }
  }

  &__subtitle {
    width: 42%;
    margin-top: 1.51rem;
  }

  &__buttons {
    @include flex-row;
    margin-top: 4rem;
    height: 4rem;

    button {
      width: 15rem;
    }
  }

  @media screen and (max-width: 1400px) {
    @include flex-column;
    padding-left: 1rem;
    width: 80%;
    padding-top: 5rem;
  }

  @media screen and (max-width: 500px) {
    @include flex-column;
    padding-left: 2rem;
    width: 90%;
    padding-top: 5rem;

    &__title {
      font-size: 2.2rem;

      span {
        color: $primary;
      }
    }

    &__subtitle {
      width: 92%;
      margin-top: 0.51rem;
    }
  }
}
</style>

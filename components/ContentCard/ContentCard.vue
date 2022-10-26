<template>
  <section class="__content" :class="{ shifted: shift }">
    <div class="__content__left">
      <slot name="left"></slot>
    </div>
    <div class="__content__center">
      <slot name="center"></slot>
    </div>
    <div class="__content__right">
      <slot name="right"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContentCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    shift: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.__content {
  position: relative;
  @include flex-row;
  width: 350px;
  margin-bottom: 3rem;
  margin-top: 1rem;
  margin-left: 350px;

  height: fit-content;
  border-radius: 1rem;

  @media screen and (max-width: 500px) {
    @include flex-column;
    margin-left: 0px;
    width: 100%;
  }

  @media screen and (max-width: 500px) {
    width: 300px;
    top: 0%;
    right: 0%;

    .body {
      @include flex-column;
      align-items: center;
      text-align: center;
      margin-right: 0rem;

      .__subtitle {
        justify-content: center;
        align-self: center;
        text-align: center;
      }
    }
  }

  &__left {
    @include flex-column;
    justify-content: center;
    align-items: flex-end;
    position: absolute;
    top: 0;
    right: 100%;
    text-align: right;
    height: 100%;
    width: 400px;

    .body {
      @include flex-column;
      margin-right: 3rem;

      .__subtitle {
        justify-content: flex-end;
        align-self: flex-end;
        text-align: right;
      }
    }

    @media screen and (max-width: 500px) {
      position: relative;
      align-items: center;
      text-align: center;
      width: 300px;
      top: 00%;
      right: 0%;

      .body {
        @include flex-column;
        margin-right: 0rem;
        margin-bottom: 2rem;

        .__subtitle {
          justify-content: center;
          align-self: center;
          text-align: center;
        }
      }
    }
  }

  &__right {
    @include flex-column;
    @include center;
    position: absolute;
    top: 0;
    left: 100%;
    text-align: left;
    height: 100%;
    width: 400px;

    .body {
      @include flex-column;
      margin-left: 3rem;

      .__subtitle {
        justify-content: flex-start;
        align-self: flex-start;
        text-align: left;
      }
    }

    @media screen and (max-width: 500px) {
      position: relative;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 300px;
      top: 100%;
      right: 0%;
      left: 0%;
      margin-top: 2rem;

      .body {
        @include flex-column;
        margin-left: 0rem;

        .__subtitle {
          width: 100%;
          text-align: center;
        }
      }
    }
  }

  .__title {
    font-size: 2.4rem;
    line-height: 2rem;
    text-transform: uppercase;
    width: 100%;
  }

  .__subtitle {
    @include flex-column;
    font-weight: 300;
    font-size: 1rem;
    width: 80%;
    margin-top: 1rem;
  }

  &__image {
    @include flex-center;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 1rem;
      box-shadow: 0 15px 16px -12px rgba(0, 0, 0, 0.9);
    }
  }
}

.shifted {
  margin-left: 0;
}
</style>

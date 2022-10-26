<template>
  <div class="__page">
    <div class="__card">
      <div class="__card__content">
        <div class="__card__content__image">
          <cube-logo :id="addvalue + counter" />
        </div>
        <div class="__card__content__text">
          <h1 class="name">Tessera<span class="web">Web</span></h1>
          <a href="mailto:help.tesseraweb@gmail.com"
            >help.tesseraweb@gmail.com</a
          >
          <span class="muted"> Jonatan Dalasiński &copy; 2022</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CubeLogo from '../components/CubeLogo/CubeLogo.vue'
export default {
  name: 'ContactPage',
  components: { CubeLogo },
  data() {
    return {
      counter: 0,
      timer: null,
      addvalue: 0,
    }
  },
  computed: {},
  mounted() {
    this.counter = 0
    this.counter2 = 0

    this.startTimer()
  },
  beforeDestroy() {
    this.stopTimer()
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.counter += 7
        if (this.counter >= 7 * 7) {
          this.counter = 0
          this.addvalue++
        }
      }, 1000)
    },
    stopTimer() {
      clearInterval(this.timer)
    },
  },
}
</script>

<style lang="scss" scoped>
.__page {
  @include flex-center;
}
.__card {
  @include card;
  width: 30rem;
  margin-top: -5rem;
  background-color: $white;

  &__content {
    @include flex-center;
    flex-direction: column;
    padding: 2rem;

    &__image {
      width: 90px;
      margin-bottom: 1rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        opacity: 0.2;
      }
    }

    &__text {
      @include flex-center;
      flex-direction: column;
      width: 90%;
      text-align: center;
      padding: 1rem;
      height: fit-content;

      h1 {
        font-size: 2rem;
      }

      p {
        font-size: 1.2rem;
      }

      .name {
        opacity: 0.5;
      }

      a {
        color: $primary;
        display: flex;
        padding-bottom: 2rem;
      }
    }
  }
}
</style>

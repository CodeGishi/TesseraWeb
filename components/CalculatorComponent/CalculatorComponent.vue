<template>
  <div class="__calculator">
    <div class="__calculator__input">
      <div class="__calculator__input__header">
        <h1>
          Password
          <br />
          <span>$Tr3ngh7</span>
          <br />
          calculator
        </h1>
        <div class="__calculator__input__field">
          <input
            v-model="input"
            :type="fieldType"
            placeholder="password goes here"
          />
          <button
            @mousedown="showPassword = true"
            @mouseup="showPassword = false"
            @mouseleave="showPassword = false"
          >
            <span v-if="showPassword" class="material-icons-outlined">
              visibility
            </span>
            <span v-else class="material-icons"> visibility_off </span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="passwordData" class="__calculator__info">
      <div class="__calculator__info__cracktime">
        <h1>
          Crack time
          <span class="material-icons"> history </span>
        </h1>
        <div class="offline">
          <div class="__calculator__info__cracktime__attack">
            <h3>Offline (Slow hash)</h3>
            <p class="display">
              {{ offlineSlow.display }}
            </p>
            <p class="seconds">{{ offlineSlow.seconds }}s</p>
          </div>

          <div class="__calculator__info__cracktime__attack">
            <h3>Offline (Fast hash)</h3>
            <p class="display">
              {{ offlineFast.display }}
            </p>
            <p class="seconds">{{ offlineFast.seconds }}s</p>
          </div>
        </div>

        <div class="online">
          <div class="__calculator__info__cracktime__attack">
            <h3>Online (no throttling)</h3>
            <p class="display">
              {{ onlineFast.display }}
            </p>
            <p class="seconds">{{ onlineFast.seconds }}s</p>
          </div>

          <div class="__calculator__info__cracktime__attack">
            <h3>Online (throttling)</h3>
            <p class="display">
              {{ onlineSlow.display }}
            </p>
            <p class="seconds">{{ onlineSlow.seconds }}s</p>
          </div>
        </div>
      </div>

      <div class="__calculator__info__methods">
        <h1>Methods <span class="material-icons"> build_circle </span></h1>
        <div
          v-for="method in methods"
          :key="method.id"
          class="__calculator__info__methods__method"
        >
          <p>{{ method.pattern }}</p>
        </div>
      </div>
      <div v-if="suggestions.length > 0" class="__calculator__info__feedback">
        <h1>Feedback <span class="material-icons"> reviews </span></h1>
        <div class="__calculator__info__feedback__warnings">
          <h3>Warning</h3>
          <p class="__calculator__info__feedback__warnings__item">
            {{ warnings }}
          </p>
        </div>
        <div class="__calculator__info__feedback__suggestions">
          <h3>Suggestions</h3>
          <p
            v-for="suggestion in suggestions"
            :key="suggestion.id"
            class="__calculator__info__feedback__suggestions__item"
          >
            {{ suggestion }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculatorComponent',
  components: {},
  props: {},
  data() {
    return {
      input: 'P@ssw0rd',
      strength: 0,
      passwordData: null,
      showPassword: false,
    }
  },
  computed: {
    offlineSlow() {
      const result = {
        display:
          this.passwordData.crack_times_display
            .offline_slow_hashing_1e4_per_second,
        seconds: this.numberDigits(
          this.passwordData.crack_times_seconds
            .offline_slow_hashing_1e4_per_second
        ),
      }
      return result
    },
    offlineFast() {
      const result = {
        display:
          this.passwordData.crack_times_display
            .offline_fast_hashing_1e10_per_second,
        seconds: this.numberDigits(
          this.passwordData.crack_times_seconds
            .offline_fast_hashing_1e10_per_second
        ),
      }
      return result
    },
    onlineSlow() {
      const result = {
        display:
          this.passwordData.crack_times_display.online_throttling_100_per_hour,
        seconds: this.numberDigits(
          this.passwordData.crack_times_seconds.online_throttling_100_per_hour
        ),
      }
      return result
    },
    onlineFast() {
      const result = {
        display:
          this.passwordData.crack_times_display
            .online_no_throttling_10_per_second,
        seconds: this.numberDigits(
          this.passwordData.crack_times_seconds
            .online_no_throttling_10_per_second
        ),
      }
      return result
    },
    methods() {
      const result = this.passwordData.sequence
      return result
    },
    methodsCount() {
      const result = this.passwordData.sequence.length
      return result
    },
    suggestions() {
      const result = this.passwordData.feedback.suggestions
      return result
    },
    warnings() {
      const result = this.passwordData.feedback.warning
      return result
    },
    fieldType() {
      if (!this.showPassword) {
        return 'password'
      } else {
        return 'text'
      }
    },
  },
  watch: {
    input() {
      this.calculateStrength()
    },
  },
  mounted() {
    this.calculateStrength()
  },
  methods: {
    async calculateStrength() {
      const res = await this.$store.dispatch('zxcvbn/calculate', this.input)
      this.strength = res.score
      this.passwordData = res
    },
    numberDigits(number) {
      if (number > 100) {
        return number.toFixed(0)
      }
      if (number > 0) {
        return number.toFixed(3)
      } else {
        return number.toFixed(3)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.__calculator {
  @include flex-column;
  margin-top: 5rem;

  &__input {
    @include flex-column;
    @include center;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 3rem;

    &__header {
      @include flex-row;
      align-items: center;
      width: 100%;

      h1 {
        font-size: 5rem;
        line-height: 4.5rem;
        font-weight: 700;
        margin: 0;
        color: $dark;
        text-align: right;
        padding-right: 3rem;

        span {
          color: $white;
          background-color: $dark;
        }
      }

      p {
        font-size: 1rem;
        font-weight: 400;
        margin: 0;
      }
    }

    h1 {
      margin-bottom: 1rem;
    }

    &__field {
      @include flex-center;

      input {
        width: 90%;
        font-size: 2rem;
        padding: 2rem;
        border: 3px solid $dark;
        color: $dark;
      }

      span {
        color: $dark;
        margin-left: 1rem;
        font-size: 3rem;
      }
    }
  }

  &__info {
    @include flex-column;
    @include center;
    width: 100%;

    span {
      color: $dark;
      font-size: 3rem;
      margin-left: 1rem;
    }

    h1 {
      font-size: 2rem;
      font-weight: 300;
      margin: 0;
    }

    &__cracktime {
      @include flex-row;
      width: 100%;
      border-bottom: 1px solid $dark;
      margin-bottom: 1rem;

      h1 {
        @include flex-center;
        justify-content: flex-end;
        min-width: 20rem;
      }

      .offline {
        @include flex-column;
        width: 100%;
      }

      .online {
        @include flex-column;
        width: 100%;
      }

      &__attack {
        @include flex-column;
        @include center;
        width: 100%;
        height: 100px;

        h3 {
          font-size: 1rem;
          margin-bottom: 0.51rem;
        }

        p {
          font-size: 1rem;
        }
      }
    }

    &__methods {
      @include flex-row;
      width: 100%;
      border-bottom: 1px solid $dark;
      padding-bottom: 1rem;
      margin-bottom: 1rem;

      h1 {
        @include flex-center;
        justify-content: flex-end;
        min-width: 20rem;
      }

      &__method {
        @include flex-center;
        width: 100%;
        height: 100px;

        p {
          padding: 1rem 2rem;
          border-radius: 2rem;
          background-color: rgb(111, 184, 181);
        }
      }
    }

    &__feedback {
      @include flex-row;

      width: 100%;

      h1 {
        @include flex-center;
        justify-content: flex-end;
        min-width: 20rem;
      }

      &__warnings {
        @include flex-column;
        @include center;
        width: 100%;

        &__item {
          text-align: center;
          width: 70%;
          margin-top: 1rem;
        }
      }

      &__suggestions {
        @include flex-column;
        @include center;
        width: 100%;

        &__item {
          text-align: center;
          width: 70%;
          margin-top: 1rem;
        }
      }
    }
  }
}
</style>

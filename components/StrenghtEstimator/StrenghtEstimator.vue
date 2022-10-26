<template>
  <div class="__strenght">
    <div class="__strenght__content">
      <div class="__strenght__content__bar">
        <div
          class="__strenght__content__bar__progress"
          :style="progressStyle"
          :class="progressClass"
        ></div>
      </div>
      <div class="__strenght__content__text">
        <p>{{ strengthClass }}</p>
      </div>
      <div v-if="showSuggestions" class="__strenght__content__help">
        <div
          class="__strenght__content__help__header"
          @click="showHelp = !showHelp"
        >
          <h3>Quick tips</h3>
          <span v-if="!showHelp" class="material-icons-outlined">
            visibility_off
          </span>
          <span v-else class="material-icons-outlined"> visibility </span>
        </div>
        <div
          v-if="warnings.warning && showHelp"
          class="__strenght__content__help__warnings"
        >
          <h3>Warning</h3>
          <ul>
            <li>
              {{ warnings.warning }}
            </li>
          </ul>
          <!-- {{ warnings.warning }} -->
        </div>
        <div
          v-if="showSuggestions && showHelp"
          class="__strenght__content__help__suggestion"
        >
          <h3>Suggestions</h3>
          <ul>
            <li v-for="suggestion in warnings.suggestions" :key="suggestion">
              {{ suggestion }}
            </li>
          </ul>
          <!-- {{ warnings.suggestions }} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StrenghtEstimator',
  props: {
    password: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      strength: 0,
      showHelp: true,
    }
  },
  computed: {
    strengthClass() {
      if (this.strength < 1) {
        return 'obviously weak'
      } else if (this.strength < 2) {
        return 'weak'
      } else if (this.strength < 3) {
        return 'medium'
      } else if (this.strength < 4) {
        return 'medium strong'
      } else {
        return 'strong'
      }
    },
    progressStyle() {
      return {
        width: `${this.strength * 25}%`,
      }
    },
    progressClass() {
      if (this.strength < 1) {
        return 'bad'
      } else if (this.strength < 2) {
        return 'weak'
      } else if (this.strength < 3) {
        return 'medium'
      } else if (this.strength < 4) {
        return 'medium-strong'
      } else {
        return 'strong'
      }
    },

    warnings() {
      return this.$store.getters['zxcvbn/feedback']
    },
    showSuggestions() {
      return this.warnings.suggestions.length > 0
    },
  },
  watch: {
    password() {
      this.calculateStrength()
    },
  },
  mounted() {
    this.calculateStrength()
  },
  methods: {
    async calculateStrength() {
      const res = await this.$store.dispatch('zxcvbn/calculate', this.password)
      this.strength = res.score
    },
  },
}
</script>

<style lang="scss" scoped>
.__strenght {
  width: 95%;

  &__content {
    display: flex;
    justify-content: center;
    flex-direction: column;

    &__bar {
      width: 100%;
      height: 1rem;
      background-color: #d1d1d1;
      border-radius: 0.5rem;
      overflow: hidden;

      &__progress {
        height: 100%;
        background-color: #484f74;
        border-radius: 0.5rem;
        transition: all 0.5s ease-in-out;
      }
    }

    &__text {
      margin-top: 0.21rem;

      &__text {
        font-size: 1.2rem;
        font-weight: 500;
      }
    }

    &__help {
      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f5f5f5;
        border-radius: 1rem;
        padding: 0.2rem 1rem;
        cursor: pointer;
        margin-top: 1rem;
        margin-bottom: 0.5rem;

        h3 {
          font-size: 1rem;
          font-weight: 500;
        }
        span {
          font-size: 1.2rem;
          opacity: 0.5;
        }
      }

      &__warnings {
        padding: 0.5rem;
        margin-top: 0.5rem;

        h3 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: #fd9559;
        }
        ul {
          list-style: disc;
          li {
            color: #333;
            margin-bottom: 0.5rem;
          }
        }
      }

      &__suggestion {
        padding: 0.5rem;
        margin-top: 0.5rem;
        h3 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: #328a73;
        }
        ul {
          list-style: disc;
          li {
            color: #333;
            margin-bottom: 0.5rem;
          }
        }
      }

      &__fine {
        padding: 0.5rem;
        margin-top: 0.5rem;
        h3 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: #333;
        }
      }
    }
  }
}

.bad {
  background-color: #464241;
}

.weak {
  background: rgb(6, 43, 50);
  background: linear-gradient(
    90deg,
    rgba(6, 43, 50, 1) 0%,
    rgba(25, 86, 92, 1) 20%,
    rgba(95, 244, 116, 1) 100%,
    rgba(69, 252, 132, 1) 100%
  );
}

.medium {
  background: rgb(6, 43, 50);
  background: linear-gradient(
    90deg,
    rgba(6, 43, 50, 1) 0%,
    rgba(25, 86, 92, 1) 20%,
    rgba(95, 244, 116, 1) 100%,
    rgba(69, 252, 132, 1) 100%
  );
}

.medium-strong {
  background: rgb(6, 43, 50);
  background: linear-gradient(
    90deg,
    rgba(6, 43, 50, 1) 0%,
    rgba(25, 86, 92, 1) 20%,
    rgba(95, 244, 116, 1) 100%,
    rgba(69, 252, 132, 1) 100%
  );
}

.strong {
  background: rgb(6, 43, 50);
  background: linear-gradient(
    90deg,
    rgba(6, 43, 50, 1) 0%,
    rgba(25, 86, 92, 1) 20%,
    rgba(95, 244, 116, 1) 100%,
    rgba(69, 252, 132, 1) 100%
  );
}
</style>

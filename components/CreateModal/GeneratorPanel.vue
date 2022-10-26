<template>
  <div class="__generator__settings">
    <!-- generator type -->
    <!-- passphrase -->
    <div class="__generator__settings__passphrase">
      <div class="__generator__settings__passphrase__content__checkbox"></div>
      <div class="__generator__settings__passphrase__title">
        <div class="radio">
          <input
            id="Passphrase"
            v-model="method"
            value="Passphrase"
            type="radio"
          />
          <label for="Passphrase">Passphrase</label>
        </div>
      </div>
      <div class="__generator__settings__passphrase__content">
        <div v-if="method === 'Passphrase'" class="__settings">
          <div class="__settings__lenght">
            <label for="wordCount">Words</label>
            <input
              id="wordCount"
              v-model="wordCount"
              type="number"
              min="1"
              max="10"
              name="wordCount"
            />
          </div>
          <div class="__settings__delimiter">
            <label for="delimiter">Delimeter</label>
            <input
              id="delimiter"
              v-model="delimiter"
              type="text"
              name="delimiter"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- generator type -->
    <!-- random -->
    <div class="__generator__settings__random">
      <div class="__generator__settings__random__title">
        <div class="radio">
          <input
            id="Randomized"
            v-model="method"
            value="Randomized"
            type="radio"
          />
          <label for="Randomized">Randomized</label>
        </div>
      </div>
      <div class="__generator__settings__random__content">
        <div v-if="method === 'Randomized'" class="__settings">
          <div class="__settings__set">
            <label for="characterTypes">Character Set</label>
            <select
              id="characterTypes"
              v-model="characterTypes"
              name="characterTypes"
            >
              <option value="ALPHA">Alphabet</option>
              <option value="ALPHANUMERIC">Alphanumeric</option>
              <option value="ALPHANUMERICSYMBOL">Alphanumeric + Symbols</option>
              <option value="NUMERIC">Digits</option>
            </select>
          </div>
          <div class="__settings__lenght">
            <label for="length">Length</label>
            <input
              id="length"
              v-model="length"
              type="number"
              min="1"
              max="100"
              name="length"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeneratorPanel',
  props: {},
  data() {
    return {
      method: 'Passphrase',
      wordCount: 4,
      delimiter: '-',
      characterTypes: 'ALPHANUMERICSYMBOL',
      length: 16,
    }
  },
  computed: {
    settings() {
      return {
        method: this.method,
        wordCount: this.wordCount,
        delimiter: this.delimiter,
        characterTypes: this.characterTypes,
        length: this.length,
      }
    },
  },
  watch: {
    method() {
      this.$store.dispatch('generator/setMethod', this.method)
    },
    wordCount() {
      this.$store.dispatch('generator/setWordcount', this.wordCount)
    },
    delimiter() {
      this.$store.dispatch('generator/setDelimeter', this.delimiter)
    },
    characterTypes() {
      this.$store.dispatch('generator/setCharacterTypes', this.characterTypes)
    },
    length() {
      this.$store.dispatch('generator/setLength', this.length)
    },
  },
  mounted() {
    const settings = this.$store.getters['generator/getSettings']
    this.method = settings.method
    this.wordCount = settings.wordCount
    this.delimiter = settings.delimiter
    this.characterTypes = settings.characterTypes
    this.length = settings.length
  },
}
</script>

<style lang="scss" scoped>
.__generator {
  &__settings {
    &__passphrase,
    &__random {
      &__title {
        display: flex;
        flex-direction: row;
        align-items: center;

        .radio {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 2rem;
          margin-bottom: 1rem;

          label {
            margin: 0;
            color: $primary;
          }

          input {
            margin-right: 0.5rem;
            margin-bottom: 0rem;
          }
        }
      }

      label {
        color: #333;
        justify-content: flex-start;
      }

      input,
      select {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>

<template>
  <div class="__loading">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="__loading__text">
      <h3>{{ displayText }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingComponent',
  props: {
    running: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: true,
      startTime: 0,
      elapsedTime: 0,
      index: 1,
      info: [
        'Loading...',
        'Fetching data...',
        'Please wait...',
        'Just a moment...',
        'Working on it...',
        'Almost done...',
      ],
      displayText: '',
      loop: null,
    }
  },
  mounted() {
    this.startLoop()
    this.switchText()
  },
  beforeDestroy() {
    this.stopLoop()
  },
  methods: {
    switchText() {
      const randomIndex = this.index % this.info.length
      this.displayText = this.info[randomIndex]
      this.index++
    },

    startLoop() {
      this.loop = setInterval(() => {
        this.switchText()
      }, 1000)
    },

    stopLoop() {
      clearInterval(this.loop)
    },
  },
}
</script>

<style lang="scss" scoped>
.__loading {
  display: flex;
  flex-direction: column;
  height: 20rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  &__text {
    color: #333;
  }

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid $primary;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: $primary transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>

<template>
  <div class="__register">
    <div class="__register__card">
      <div class="__register__card__side">
        <img src="../../assets/img/login3.jpg" alt="" />
      </div>
      <div class="__register__card__content">
        <div class="__register__card__content__header">
          <h1 class="__register__card__content__header__title">Register</h1>
          <!-- <p class="__register__card__content__header__subtitle">
            Welcome to our service!
          </p> -->
        </div>
        <div class="__register__card__content__body">
          <span v-if="error" class="__register__card__content__body__error">
            <!-- <span class="material-icons-outlined"> error_outline </span> -->
            {{ error }}
          </span>
          <div class="__register__card__content__body__form">
            <div class="__register__card__content__body__form__group">
              <label for="username">Username</label>
              <input
                id="username"
                v-model="username"
                type="text"
                placeholder="Enter your username"
              />
            </div>
            <div class="__register__card__content__body__form__group">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div class="__register__card__content__body__form__group">
              <label for="password">Password</label>
              <div class="compound">
                <input
                  id="password"
                  v-model="password"
                  :type="fieldType"
                  placeholder="Enter your password"
                />
                <button @click="showPassword = !showPassword">
                  <span class="material-icons-outlined"> visibility </span>
                </button>
              </div>
            </div>
            <div
              v-if="passwordTooWeak"
              class="__register__card__content__body__form__group"
            >
              <label for="password">Strenght Warning</label>
              <p>Your master-password is too weak</p>
              <div class="compound--risk">
                <!-- checkobx accept -->
                <input id="accept" v-model="accept" type="checkbox" />
                <label for="accept">I am aware of the risk</label>
              </div>
            </div>
            <div class="__register__card__content__body__form__group">
              <button
                class="__register__card__content__body__form__group__button btn"
                @click="register"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
        <div class="__register__card__content__footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  components: {},
  data() {
    return {
      username: '',
      password: '',
      email: '',
      error: '',
      showPassword: false,
      accept: false,
      passwordTooWeak: false,
    }
  },
  computed: {
    fieldType() {
      return this.showPassword ? 'text' : 'password'
    },
    passwordWarning() {
      return this.password.length < 8
    },
  },
  methods: {
    async formValidate() {
      await this.calculateStrength()
      if (this.username === '' || this.password === '' || this.email === '') {
        this.error = 'Please fill all the fields'
        return false
      }
      // check lenght of username
      if (this.username.length < 3) {
        this.error = 'Username must be at least 3 characters'
        return false
      }
      // check special characters
      if (!this.username.match(/^[a-zA-Z0-9]+$/)) {
        this.error = 'Username must not contain special characters'
        return false
      }
      // check lenght of password
      if (this.password.length < 8) {
        this.error = 'Password must be at least 8 characters'
        return false
      }
      // check email
      if (
        !this.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ) {
        this.error = 'Please enter a valid email'
        return false
      }
      // password strength
      if (this.passwordTooWeak) {
        return this.accept
      }

      return true
    },

    async register() {
      if (await this.formValidate()) {
        const result = await this.$store.dispatch('auth/register', {
          username: this.username,
          password: this.password,
          email: this.email,
        })
        if (result?.success) {
          this.$router.push('/')
        } else {
          const msg =
            result?.message || 'User validation failed: Something went wrong'

          // split string with :
          const msgArr = msg.split(':')
          // remove first element
          msgArr.shift()
          // capitalize first letter
          this.error = msgArr
            .join('')
            .trim()
            .replace(/^\w/, (c) => c.toUpperCase())
        }
      }
    },

    async calculateStrength() {
      const result = await this.$store.dispatch(
        'zxcvbn/calculate',
        this.password
      )
      if (result && result.score < 3) {
        this.passwordTooWeak = true
      } else {
        this.passwordTooWeak = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.__register {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  margin-top: 5rem;
  margin-bottom: 5rem;

  .__register__card {
    @include flex-row;
    width: 700px;
    min-height: 500px;
    max-height: 550px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 20px 15px -10px rgba(52, 71, 64, 0.58);

    @media screen and (max-width: 1000px) {
      width: 100%;
    }

    @media screen and (max-width: 500px) {
      width: 100%;
      margin: 1rem;
      max-height: fit-content;
    }

    &__side {
      width: 80%;
      min-height: 500px;
      max-height: 550px;
      border-radius: 5px 0 0 5px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      @media screen and (max-width: 1000px) {
        display: none;
      }
    }

    &__content {
      @include flex-column;
      width: 100%;
      padding: 1rem;

      &__header {
        padding: 20px;
        border-bottom: 1px solid #eee;

        &__title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 5px;
        }

        &__subtitle {
          font-size: 1rem;
          font-weight: 400;
          color: #999;
        }
      }

      &__body {
        padding: 1.5rem;

        &__error {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
          margin-bottom: 1rem;
          color: #c64f75;

          .material-icons-outlined {
            margin-right: 5px;
          }
        }

        &__form {
          &__group {
            label {
              justify-content: flex-start;
              text-align: left;
            }

            input {
              width: 89%;
              margin-bottom: 1rem;
            }

            .compound {
              display: flex;
              align-items: center;
              margin-bottom: 1rem;

              input {
                width: 100%;
                margin-right: 1rem;
                margin-bottom: 0rem;
              }

              button {
                &:hover {
                  color: $primary;
                }

                &:active {
                  transform: scale(0.9);
                }
              }
            }

            .compound--risk {
              @include flex-row;
              @include center;
              justify-content: flex-end;
              margin: 0;
              margin-top: 0.5rem;
              margin-right: 1rem;
              margin-bottom: 1rem;

              input {
                width: 16px;
                height: 16px;
                margin: 0;
                margin-right: 1rem;
              }

              label {
                margin: 0;
                color: #c64f75;
              }
            }

            .btn {
              @include button;
              margin-left: auto;
              margin-top: 2rem;
              border: 1px solid $primary;

              &:hover {
                color: $primary;
              }

              @media screen and (max-width: 500px) {
                margin-right: auto;
              }
            }
          }
        }
      }

      &__footer {
        padding: 20px;
        border-top: 1px solid #eee;

        &__text {
          font-size: 0.9rem;
          font-weight: 400;
          text-align: center;

          a {
            color: #333;
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>

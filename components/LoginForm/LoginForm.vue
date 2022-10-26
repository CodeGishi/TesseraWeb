<template>
  <div class="__login">
    <div class="__login__card">
      <div class="__login__card__side">
        <img src="../../assets/img/login4.jpg" alt="" />
      </div>
      <div class="__login__card__content">
        <div class="__login__card__content__header">
          <h1 class="__login__card__content__header__title">Login</h1>
          <p class="__login__card__content__header__subtitle">Welcome back!</p>
        </div>
        <div class="__login__card__content__body">
          <span v-if="error" class="__login__card__content__body__error">
            <!-- <span class="material-icons-outlined"> error_outline </span> -->
            {{ error }}
          </span>
          <div class="__login__card__content__body__form">
            <div class="__login__card__content__body__form__group __username">
              <label for="username">Username</label>
              <input
                id="username"
                v-model="username"
                type="text"
                placeholder="Enter your username"
              />
            </div>
            <div class="__login__card__content__body__form__group">
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

            <div class="__login__card__content__body__form__group">
              <button
                class="__login__card__content__body__form__group__button btn"
                @click.prevent="login"
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <div class="__login__card__content__footer">
          <p class="__login__card__content__footer__text">
            Don't have an account?
            <nuxt-link to="/register">Register</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  components: {},
  props: {
    redirect: {
      type: String,
      default: '/',
    },
  },
  data() {
    return {
      username: '',
      password: '',
      error: '',
      showPassword: false,
    }
  },
  computed: {
    fieldType() {
      return this.showPassword ? 'text' : 'password'
    },
  },
  methods: {
    async login() {
      if (this.username === '' || this.password === '') {
        this.error = 'Please fill in all fields'
        return
      }
      try {
        const result = await this.$store.dispatch('auth/login', {
          username: this.username,
          password: this.password,
        })
        if (result.success) {
          this.$router.push({ path: this.redirect })
        } else {
          this.error = result.message
        }
      } catch (error) {
        console.log('%% ~ login ~ error', error)
        this.error = error.response.data.message
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.__login {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  margin-top: 5rem;
  margin-bottom: 5rem;

  .__login__card {
    @include flex-row;
    width: 700px;
    height: 500px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 20px 15px -10px rgba(52, 71, 64, 0.58);

    @media screen and (max-width: 1000px) {
      width: 100%;
    }

    @media screen and (max-width: 500px) {
      width: 100%;
      margin: 1rem;
    }

    &__side {
      width: 80%;
      height: 100%;
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
              margin-bottom: 1rem;
            }

            .compound {
              display: flex;
              align-items: center;
              margin-bottom: 3rem;

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
          }

          .__username {
            input {
              width: 88%;
            }
          }

          .btn {
            @include button;
            margin-left: auto;
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

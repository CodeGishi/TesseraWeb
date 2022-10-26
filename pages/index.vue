<template>
  <div class="__page">
    <page-banner :image="'banner2.jpg'">
      <div class="__banner__content">
        <h1 class="__banner__content__title">
          Your password safety with Tessera<span>Web</span>
        </h1>
        <p class="__banner__content__subtitle">
          Secure and easy to use web password manager that allows you to store
          all your passwords in one place wherever you go.
        </p>
        <div class="__banner__content__buttons">
          <n-button v-if="!isLoggedIn">
            <nuxt-link to="/register"> Sign up </nuxt-link>
          </n-button>
          <n-button v-if="isLoggedIn">
            <nuxt-link to="/storage">
              Go to Storage
              <span class="material-icons"> navigate_next </span></nuxt-link
            >
          </n-button>
          <n-button v-if="!isLoggedIn" type="secondary">
            <a href="#content-start "> Read more </a>
          </n-button>
        </div>
      </div>
    </page-banner>

    <div class="__page__content">
      <section id="content-start" class="__page__content__section">
        <span class="__page__content__section__spacer"></span>
        <h1 class="__page__content__section__title">
          Stronger passwords,
          <br />
          simpler management
        </h1>
        <p class="__page__content__section__paragraph">
          TesseraWeb is a password manager that allows you to store all your
          passwords in one place wherever you go. It is a secure and easy to use
          web password manager that allows you to store all your passwords in
          one place wherever you go.
        </p>
        <span class="__page__content__section__spacer"></span>
      </section>

      <section class="__page__content__cards">
        <content-card>
          <template #left>
            <div class="body">
              <h2 class="__title">Storage Simplified</h2>
              <p class="__subtitle">
                TesseraWeb has a simple and straightforward user interface, so
                you can spend more time on what you love.
              </p>
            </div>
          </template>
          <template #center>
            <div class="__content__image">
              <img src="../assets/img/content3.jpg" alt="" />
            </div>
          </template>
        </content-card>

        <content-card v-if="$store.getters['site/isDesktop']" :shift="true">
          <template #center>
            <div class="__content__image">
              <img src="../assets/img/content2.jpg" alt="" />
            </div>
          </template>
          <template #right>
            <div class="body">
              <h2 class="__title">Client-side encryption</h2>
              <p class="__subtitle">
                The encryption is done at the device level, protecting your data
                even if the database is breached.
              </p>
            </div>
          </template>
        </content-card>

        <content-card v-else>
          <template #center>
            <div class="__content__image">
              <img src="../assets/img/content2.jpg" alt="" />
            </div>
          </template>
          <template #left>
            <div class="body">
              <h2 class="__title">Client-side encryption</h2>
              <p class="__subtitle">
                The encryption is done at the device level, protecting your data
                even if the database is breached.
              </p>
            </div>
          </template>
        </content-card>

        <content-card>
          <template #center>
            <div class="__content__image">
              <img src="../assets/img/content1.jpg" alt="" />
            </div>
          </template>
          <template #left>
            <div class="body">
              <h2 class="__title">Stronger passwords</h2>
              <p class="__subtitle">
                TesseraWeb gives you the power to create passwords that are
                stronger.
              </p>
            </div>
          </template>
        </content-card>
      </section>

      <section class="__page__content__start">
        <!-- start using tessera web -->
        <div class="__page__content__start__content">
          <h1 class="__page__content__start__content__title">Give it a try!</h1>
          <p class="__page__content__start__content__subtitle">
            Start protecting your data for free.
          </p>
          <div class="__page__content__start__content__buttons">
            <nuxt-link v-if="!isLoggedIn" to="/register">
              <button>
                Create Account
                <span class="material-icons"> navigate_next </span>
              </button>
            </nuxt-link>

            <nuxt-link v-if="isLoggedIn" to="/storage">
              <button>
                Go to Storage
                <span class="material-icons"> navigate_next </span>
              </button>
            </nuxt-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ContentCard from '../components/ContentCard/ContentCard.vue'
import PageBanner from '../components/PageBanner/PageBanner.vue'

export default {
  name: 'IndexPage',
  components: { PageBanner, ContentCard },
  data() {
    return {}
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn']
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.__page {
  margin-bottom: 7rem;

  &__content {
    @include flex-column;
    @include center;
    padding: 2rem;
    min-height: 90vh;

    @media screen and (max-width: 768px) {
      width: 100vw;
      padding: 2rem 5rem;
    }

    @media screen and (max-width: 500px) {
      width: 100vw;
      padding: 0rem 1rem;
    }

    &__section {
      @include flex-column;
      @include center;
      width: var(--container-width);
      margin-top: 2rem;
      margin-bottom: 3rem;
      overflow: hidden;

      &__title {
        font-size: 4rem;
        font-weight: 800;
        text-align: center;

        @media screen and (max-width: 500px) {
          font-size: 2.5rem;
        }
      }

      &__paragraph {
        font-size: 1.5rem;
        text-align: center;
        font-weight: 200;
        margin-top: 2rem;
        width: 80%;
      }

      &__spacer {
        display: flex;
        height: 5rem;
        width: 2px;
        margin-top: 2rem;
        margin-bottom: 1rem;
        background-color: $dark;
      }

      @media screen and (max-width: 500px) {
        margin-top: -3rem;
        &__paragraph {
          width: 95%;
        }
      }
    }

    &__cards {
      @include flex-column;
      display: flex;
    }

    &__start {
      @include flex-column;
      @include center;
      width: var(--container-width);
      margin-top: 2rem;
      margin-bottom: 3rem;
      @media screen and (max-width: 500px) {
        margin-top: 5rem;
      }

      &__content {
        @include flex-column;
        @include center;
        width: 100%;
        margin-top: 2rem;
        margin-bottom: 3rem;

        &__title {
          font-size: 4rem;
          font-weight: 800;
          text-align: center;
        }

        &__subtitle {
          font-size: 1.5rem;
          text-align: center;
          font-weight: 200;
          margin-top: 2rem;
          width: 80%;
        }

        &__buttons {
          @include flex-row;
          @include center;
          margin-top: 2rem;
          margin-bottom: 3rem;

          button {
            @include button;
            background-color: $primary;
            border-color: $primary;
            color: $white;
            padding: 2rem 4rem;

            span {
              transition: all 0.3s ease-in-out;
            }

            &:hover {
              border-color: $primary;
              border-left-width: 5px;
              background-color: rgb(191, 214, 191);
              color: $primary;
              span {
                transform: translateX(0.5rem);
              }
            }

            &:active {
              border-color: $primary;
            }
          }
        }
      }
    }
  }
}
</style>

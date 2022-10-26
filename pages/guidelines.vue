<template>
  <div class="__page">
    <page-banner image="banner10.jpg">
      <div class="__banner__content">
        <h1 class="__banner__content__title">
          Password Security
          <br />
          Guidelines
        </h1>
        <p class="__banner__content__subtitle">
          Password security starts with it's creation. Learn more about how to
          create a strong password.
        </p>
        <div class="__banner__content__buttons">
          <n-button type="secondary">
            <a href="#content-start"> Read </a>
          </n-button>
        </div>
      </div>
    </page-banner>

    <div class="__page__content">
      <calculator-component v-if="$store.getters['site/isDesktop']" />

      <div id="content-start" class="__page__content__guidelines">
        <h1 class="__page__content__guidelines__title">
          Guidelines for Password Management
        </h1>
        <!-- length > complexity -->
        <article class="rule">
          <div class="rule__header">
            <div class="rule__header__number">00</div>
            <div class="rule__header__title">length > complexity</div>
          </div>

          <div class="rule__content">
            <div class="rule__content__body">
              <p>Make the password <b>at least</b> 12 characters long.</p>

              <p>
                With 8 characters being recomended minimum, security experts
                suggest a <b>“passphrase”</b> rather than simply a password.
              </p>
              <p>
                Phrase should be relatively long and consist of seemingly random
                words linked together with numbers, symbols or upper and lower
                case letters. Think of something that you can remember but
                others couldn’t guess.
              </p>
            </div>
          </div>
        </article>

        <!-- Think outside the box -->
        <article class="rule">
          <div class="rule__header">
            <div class="rule__header__number">01</div>
            <div class="rule__header__title">Think outside the box</div>
          </div>

          <div class="rule__content">
            <div class="rule__content__body">
              <p>Strong Passwords Aren't as easy as adding 123.</p>
              <p>
                Avoid <b>common words and character combinations</b> in your
                password. The goal is to create a password that someone else
                won't know or be able to easily guess.
              </p>
              <p>
                Stay away from common words and phrases like "password" and
                "mypassword".
              </p>
              <p>
                <b>Keyboard sequences</b> are also quite predictable. Stay away
                from "qwerty" or "12345678."
              </p>
            </div>
          </div>
        </article>

        <!-- It's nothing personal -->
        <article class="rule">
          <div class="rule__header">
            <div class="rule__header__number">02</div>
            <div class="rule__header__title">It's nothing personal</div>
          </div>

          <div class="rule__content">
            <div class="rule__content__body">
              <p>Don’t use <b>personal</b> information</p>
              <p>
                Using names, birthdays, addresses, or phone numbers in your
                password could jeopardize its effectiveness against
                cyberattacks.
              </p>

              <p>
                Also avoid using your pet's name, dates, street numbers or
                anything <b>associated</b> with you that someone could find out
                from <b>social media</b>, or from a heartfelt talk with a
                stranger on an airplane or at the bar.
              </p>
            </div>
          </div>
        </article>

        <!-- Don't fail before you've even started -->
        <article class="rule">
          <div class="rule__header">
            <div class="rule__header__number">03</div>
            <div class="rule__header__title">Have a good start</div>
          </div>

          <div class="rule__content">
            <div class="rule__content__body">
              <p>Avoid using passwords known to be stolen.</p>
              <p>
                Hackers can effortlessly use previously stolen or otherwise
                exposed passwords in automated login attempts called
                <b>credential stuffing</b> to break into an account.
              </p>

              <p>
                If you want to check if a password you're considering using has
                already been <b>exposed</b> in a hack, go to
                <a href="#"> Have I Been Pwned </a> and enter the password.
              </p>

              <p>
                Mozilla's Firefox Monitor and Google's Password Checkup can also
                show you which of your email addresses and passwords have been
                compromised in a <b>data breach</b> so you can take action.
              </p>
            </div>
          </div>
        </article>

        <!-- Don't repeat yourself -->
        <article class="rule">
          <div class="rule__header">
            <div class="rule__header__number">04</div>
            <div class="rule__header__title">Don't repeat yourself</div>
          </div>

          <div class="rule__content">
            <div class="rule__content__body">
              <p>
                Use <b>different</b> passwords on different services and
                accounts.
              </p>
              <p>
                If you use the same password for multiple accounts, a hacker
                could break into one of your accounts and then stuff the same
                thing into other <b>linked accounts</b>.
              </p>
              <p>
                There is also no real need to periodically reset your password.
              </p>
              <p>
                Microsoft now recommends that unless you suspect your passwords
                have been exposed, you don't need to change them.
              </p>
              <p>
                Frequent changes led to <b>bad habits</b> of creating
                easy-to-remember passwords or writing them on sticky notes and
                putting them on our monitors.
              </p>
            </div>
          </div>
        </article>

        <!-- Seek Help -->
        <article class="rule">
          <div class="rule__header">
            <div class="rule__header__number">05</div>
            <div class="rule__header__title">Seek Help</div>
          </div>

          <div class="rule__content">
            <div class="rule__content__body">
              <p>Consider using a <b>password manager</b>.</p>
              <p>
                Programs or web services on personal computers and mobile
                devices, let you create <b>randomized</b>, very
                <b>strong</b> password for each of your sites.
              </p>
              <p>
                You only have to remember <b>one</b> password to access the
                program or secure site that stores your passwords for you.
              </p>
              <p>
                Make sure that you have a very strong password for your password
                manager because, if it’s breached, it can be used to access all
                of your accounts.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import CalculatorComponent from '../components/CalculatorComponent/CalculatorComponent.vue'
import PageBanner from '../components/PageBanner/PageBanner.vue'

export default {
  name: 'GuidelinesPage',
  components: { PageBanner, CalculatorComponent },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.__banner__content__subtitle {
  width: 60%;
  margin: 0;
  margin-top: 1rem;
}

.__page {
  &__content {
    width: var(--container-width);
    padding: 2rem;
    margin: 2rem;

    @media screen and (max-width: 768px) {
      width: 100%;
      padding: 0;
      margin: 0;
    }

    &__guidelines {
      padding: 2rem;
      margin: 2rem;
      margin-top: 10rem;

      @media screen and (max-width: 768px) {
        width: 100%;
        padding: 1rem;
        margin: 0;
      }

      &__title {
        font-size: 5rem;
        font-weight: 600;
        margin-bottom: 2rem;

        @media screen and (max-width: 768px) {
          font-size: 2.5rem;
        }
      }

      &__subtitle {
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: 2rem;
      }
    }
  }
}

.rule {
  @include flex-column;
  position: relative;
  margin-bottom: 4rem;
  border-top: 2px solid #ccc;

  &__header {
    @include flex-column;
    position: sticky;
    top: 0;
    width: 30%;
    transition: all 0.2s ease-in;

    @media screen and (max-width: 768px) {
      width: 10%;
      top: 40%;
    }

    &__number {
      text-align: right;
      font-size: 10rem;
      font-weight: 700;
      color: $dark;

      @media screen and (max-width: 768px) {
        font-size: 3rem;
      }
    }

    &__title {
      text-align: right;
      font-size: 1.5rem;
      font-weight: 400;
      text-transform: uppercase;
      color: $dark;

      @media screen and (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }

  &__content {
    min-height: 50vh;
    width: 63%;
    margin-left: auto;

    @media screen and (max-width: 768px) {
      width: 65%;
    }

    &__body {
      margin-top: -10rem;
      font-size: 2rem;
      font-weight: 400;
      color: $dark;

      @media screen and (max-width: 768px) {
        margin-top: -5rem;
      }

      p:first-of-type {
        font-size: 2rem;
        font-weight: 600;

        @media screen and (max-width: 768px) {
          font-size: 1rem;
        }
      }

      b {
        font-weight: 900;
      }

      p {
        font-size: 2rem;
        line-height: 30px;
        margin-bottom: 2rem;

        @media screen and (max-width: 768px) {
          font-size: 1rem;
          line-height: 16px;
        }
      }

      a {
        color: $primary;
        text-decoration: underline;
      }
    }
  }
}
</style>

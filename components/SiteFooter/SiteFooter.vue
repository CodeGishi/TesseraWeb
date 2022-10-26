<template>
  <div class="__footer">
    <div class="__footer__background"></div>
    <div class="__footer__container">
      <div class="__footer__container">
        <div class="__footer__container__links">
          <div class="__footer__container__links__list">
            <ul>
              <li class="__footer__container__links__list__item">
                <nuxt-link to="/storage">Storage</nuxt-link>
              </li>
              <li class="__footer__container__links__list__item">
                <nuxt-link to="/guidelines">Guidelines</nuxt-link>
              </li>
              <li class="__footer__container__links__list__item">
                <nuxt-link to="/contact">Contact</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="__footer__container__social">
          <div class="__footer__container__social__list">
            <ul>
              <li>
                <a href="#">
                  <facebook-icon color="#fff" />
                </a>
              </li>
              <li>
                <a href="#">
                  <linkedin-icon color="#fff" />
                </a>
              </li>
              <li>
                <a href="#">
                  <youtube-icon color="#fff" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FacebookIcon from '../../assets/icons/FacebookIcon.vue'
import LinkedinIcon from '../../assets/icons/LinkedinIcon.vue'
import YoutubeIcon from '../../assets/icons/YoutubeIcon.vue'

export default {
  name: 'SiteFooter',
  components: { FacebookIcon, LinkedinIcon, YoutubeIcon },
}
</script>

<style lang="scss" scoped>
.__footer {
  position: relative;
  background: rgb(136, 224, 180);
  background: radial-gradient(
    circle,
    rgba(136, 224, 180, 1) 0%,
    rgba(61, 144, 142, 1) 56%,
    rgba(14, 33, 33, 1) 100%
  );
  width: 100%;
  height: $footer-height;
  mix-blend-mode: multiply;

  &__background {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    mix-blend-mode: screen;
    background-position: center left;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('../../assets/img/footer.png');
    opacity: 0.7;
  }

  &__container {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 3rem;
    color: white;

    &__links {
      &__list {
        ul {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;

          li {
            padding: 0.2rem 1rem;
            margin: 0.2rem;
            margin-right: 6rem;
            font-size: 1.2rem;
            text-transform: uppercase;
            font-weight: bold;
            border: 1px solid rgb(255, 255, 255);
            border-left-width: 2rem;
            transition: all 0.2s ease-in-out;
          }

          @media screen and (max-width: 1024px) {
            flex-direction: column;
            li {
              margin-right: 0;
            }
          }
        }

        &__item {
          &:hover {
            border-left-width: 5rem;
          }
        }
      }
    }

    &__social {
      margin-left: auto;

      @media screen and (max-width: 600px) {
        display: none;
      }

      &__list {
        ul {
          display: flex;
          gap: 1rem;

          li {
            a {
              svg {
                width: 2rem;
                height: 2rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>

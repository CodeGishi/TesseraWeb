<template>
  <div
    v-show="isOpen"
    class="__preview"
    :class="{ '--open': isOpen }"
    @mousedown.self="closeModal"
  >
    <div class="__preview__card">
      <!-- header -->
      <div class="__preview__card__header">
        <h2
          v-if="$store.getters['site/isDesktop']"
          class="__preview__card__header__title"
        >
          Preview
        </h2>
        <h2 v-else class="__preview__card__header__title">
          {{ itemData.title }}
        </h2>
        <button class="__preview__card__header__close" @click="closeModal">
          <span class="material-icons"> close </span>
        </button>
      </div>
      <!-- body -->
      <div class="__preview__card__body">
        <!-- left -->
        <div
          v-if="$store.getters['site/isDesktop']"
          class="__preview__card__body__left"
        >
          <div class="__preview__card__body__left__title">
            <h3>{{ itemData.title }}</h3>
          </div>
          <div class="__preview__card__body__left__icon">
            <cube-logo :id="itemData.icon" />
          </div>
          <!-- taglist -->
          <div class="__preview__card__body__left__taglist">
            <div class="__preview__card__body__left__taglist__item">
              <!-- <span class="material-icons-outlined"> label </span> -->
              <span>{{ itemData.category }}</span>
            </div>
          </div>
          <div class="__preview__card__body__left__datetime">
            <div
              v-if="itemData.createdAt"
              class="__preview__card__body__left__item __date"
            >
              <h4>created</h4>
              <p class="__date">{{ parseDate(itemData.createdAt) }}</p>
            </div>
            <div
              v-if="itemData.createdAt"
              class="__preview__card__body__left__item __date"
            >
              <h4>updated</h4>
              <p class="__date">{{ parseDate(itemData.updatedAt) }}</p>
            </div>
          </div>
        </div>
        <!-- right -->
        <div class="__preview__card__body__right">
          <div
            v-if="itemData.username"
            class="__preview__card__body__right__item __username"
          >
            <h4>Username</h4>
            <input v-model="itemData.username" type="text" disabled />
          </div>
          <div class="__preview__card__body__right__item __password">
            <h4>Password</h4>
            <div class="__compound">
              <input v-model="itemData.password" :type="filedType" disabled />
              <!-- checkbox preview -->
              <div class="__compound__buttons">
                <button @click="showPassword = !showPassword">
                  <span class="material-icons-outlined"> visibility </span>
                </button>
                <button
                  v-tooltip="{
                    content: 'copy to clipboard',
                    placement: 'right',
                    delay: 500,
                  }"
                  @click="clipboardCopy"
                >
                  <span class="material-icons-outlined"> content_copy </span>
                </button>
              </div>
            </div>
          </div>
          <div
            v-if="itemData.url"
            class="__preview__card__body__right__item __url"
          >
            <h4>URL</h4>
            <div class="__compound">
              <p>{{ itemData.url }}</p>
              <button
                v-tooltip="{
                  content: 'navigate to website',
                  placement: 'right',
                  delay: 500,
                }"
                @click="navigateToURL"
              >
                <span class="material-icons-outlined">
                  call_missed_outgoing
                </span>
              </button>
            </div>
          </div>
          <div
            v-if="itemData.notes"
            class="__preview__card__body__right__item __notes"
          >
            <h4>Notes</h4>
            <p>{{ itemData.notes }}</p>
          </div>
        </div>
      </div>
      <!-- footer -->
      <div class="__preview__card__footer">
        <button
          class="__preview__card__footer__button --delete"
          @click.prevent="deleteItem"
        >
          <span v-if="!waiting" class="material-icons-outlined"> delete </span>
          <span v-else class="material-icons-outlined waiting">
            hourglass_empty
          </span>
          delete
        </button>
        <button
          class="__preview__card__footer__button --edit"
          @click.prevent="editItem"
        >
          <span class="material-icons-outlined"> edit_note </span>
          edit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemModal',
  data() {
    return {
      showPassword: false,
      waiting: false,
    }
  },
  computed: {
    isOpen() {
      return this.$store.getters['modal/preview']
    },
    itemData() {
      return this.$store.getters['modal/modalData']
    },
    hidePassword() {
      if (this.showPassword) {
        return this.itemData.password
      } else {
        return '***********'
      }
    },
    filedType() {
      if (this.showPassword) {
        return 'text'
      } else {
        return 'password'
      }
    },
    pageHeight() {
      const height = this.$store.getters['site/getPageHeight']
      return `height: ${height}px`
    },
  },
  methods: {
    closeModal() {
      this.waiting = false
      this.$store.dispatch('modal/closeModal')
    },
    async deleteItem() {
      this.waiting = true

      const alertText =
        'Are you sure about deleting this item?\nThis action is permanent.\n'
      if (confirm(alertText) === true) {
        await this.$store
          .dispatch('vault/deleteVaultItem', this.itemData._id)
          .then(() => {
            this.closeModal()
          })
      } else {
        this.waiting = false
      }
    },
    editItem() {
      if (window) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }

      this.closeModal()
      this.$store.dispatch('modal/openModal', 'edit')
    },
    navigateToURL() {
      window.open(this.itemData.url, '_blank')
    },
    async clipboardCopy() {
      const content = this.itemData.password
      try {
        await this.$copyText(content)
      } catch (e) {
        console.error(e)
      }
    },
    parseDate(datetime) {
      return datetime.replace('Z', '  ').replace('T', '  ')
    },
  },
}
</script>

<style lang="scss" scoped>
.__preview {
  @include flex-column;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: fit-content;
  transition: all 0s;
  transform: scale(0);
  opacity: 0;
  filter: blur(0);

  @media screen and (max-width: 500px) {
    position: absolute;
  }

  &.--open {
    opacity: 1;
    transform: scale(1);

    .__preview__card {
      transform: scale(1);
    }
  }

  &__card {
    position: sticky;
    top: 0;
    width: calc(var(--container-width) - 25vw);
    min-height: 25rem;
    height: fit-content;
    margin: 0 auto;
    margin-top: 7rem;
    background-color: white;
    border-radius: 1rem;
    transform: translateY(100%);
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    box-shadow: 0 0 1rem 0.1rem rgba(0, 0, 0, 0.2);

    @media screen and (max-width: 500px) {
      position: absolute;
      width: 100%;
      padding: 0rem;
    }

    &__header {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 150px;
      padding: 1rem 2rem;
      color: $white;
      background-color: $dark;
      overflow: hidden;
      border-radius: 1rem;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;

      &__title {
        color: $white;
        font-size: 2rem;
        font-weight: 700;

        @media screen and (max-width: 500px) {
          font-size: 1.5rem;
        }
      }

      &__close {
        transition: all 0.2s ease-in-out;
        cursor: pointer;

        span {
          font-size: 2rem;
          font-weight: 500;
        }

        &:hover {
          transform: scale(1.5);
        }
      }

      &::before {
        content: '';
        background-image: url('../../assets/img/banner2.jpg');
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
      }
    }

    &__body {
      @include flex-row;
      width: 100%;
      min-height: 15rem;
      height: fit-content;
      padding: 1rem 2rem;
      overflow: auto;

      @media screen and (max-width: 500px) {
        padding: 1rem;
      }

      &__left {
        @include flex-column;
        @include center;
        max-width: 50%;
        min-width: 40%;
        height: 100%;

        &__icon {
          transform: scale(1.5);
        }

        &__title {
          text-align: center;
          max-width: 100%;
          margin-bottom: 2rem;
          margin-top: 2rem;

          h3 {
            font-size: 1.5rem;
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        &__taglist {
          @include flex-column;
          justify-content: center;
          flex-wrap: wrap;
          width: 80%;
          height: 2.5rem;
          padding: 0rem 2rem;
          margin-top: 2rem;

          &__item {
            @include flex-row;
            align-items: center;
            justify-content: center;
            margin: 0.5rem;
            padding: 0.5rem 1rem;
            color: $white;
            background-color: $primary;
            opacity: 0.9;
            border-radius: 1rem;
            overflow: hidden;

            span {
              font-size: 1rem;
              font-weight: 500;
            }
          }
        }

        &__datetime {
          margin-top: 2rem;
          h4 {
            font-size: 0.8rem;
            font-weight: 500;
            margin-bottom: 0.2rem;
            opacity: 0.5;
          }
          p {
            font-size: 0.8rem;
            font-weight: 500;
            margin-bottom: 0.2rem;
          }
        }
      }

      &__right {
        @include flex-column;
        @include center;
        width: 100%;
        height: 100%;
        padding-top: 2rem;
        padding-left: 2rem;

        @media screen and (max-width: 500px) {
          padding: 1rem;
        }

        &__item {
          width: 100%;
          height: fit-content;
          margin-bottom: 1rem;

          h4 {
            font-size: 0.8rem;
            font-weight: 400;
            opacity: 0.4;
          }

          p {
            font-size: 1.2rem;
            font-weight: 500;
            height: 2rem;
          }

          &.__date {
            font-size: 0.8rem;
            font-weight: 400;
            opacity: 0.4;
          }

          &.__title {
            opacity: 1;
          }
          &.__username {
            opacity: 1;
            h4 {
              font-size: 1.1rem;
            }
            input {
              background-color: transparent;
              font-size: 1.5rem;
              min-height: 2rem;
            }
            p {
              font-size: 1.5rem;
              min-height: 2rem;
              height: fit-content;
              word-break: break-all;
            }
          }
          &.__password {
            opacity: 1;
            h4 {
              font-size: 1.1rem;
            }
            input {
              background-color: transparent;
              font-size: 1.5rem;
              min-height: 2rem;
              max-width: 100%;
              overflow: hidden;
            }
            p {
              font-size: 1.5rem;
              min-height: 2rem;
              height: fit-content;
              word-break: break-all;
            }
          }
          &.__url {
            opacity: 1;
            p {
              font-size: 1rem !important;
            }
          }
          &.__notes {
            height: fit-content;

            p {
              margin-top: 0.5rem;
              border-radius: 1rem;
              padding: 1rem;
              border: 1px solid #ddd;
              font-size: 1rem;
              height: fit-content;
            }

            @media screen and (max-width: 500px) {
              overflow: hidden;
            }
          }
        }

        .__compound {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: fit-content;

          p {
            font-size: 1.2rem;
            font-weight: 500;
          }

          &__buttons {
            @include flex-center;
            gap: 1rem;
            margin-left: 1rem;
          }

          button {
            @include flex-center;
            border: none;
            color: $dark;
            font-size: 1rem;
            transition: all 0.2s ease-in-out;
            cursor: pointer;

            &:hover {
              color: $primary;
            }

            &:active {
              transform: scale(0.9);
            }
          }
        }
      }
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 3rem;
      padding: 0 2rem;
      margin-bottom: 2rem;

      @media screen and (max-width: 500px) {
        justify-content: center;
      }

      &__button {
        @include button;
        @include flex-center;
        font-size: 1rem;
        height: 2rem;
        color: $primary;
        border: 1px solid $primary;
        border-color: $primary;

        span {
          transition: all 0.2s ease-in-out;
          margin-right: 1rem;
        }

        &:hover {
          color: $primary;
        }

        &.--delete {
          color: rgb(187, 75, 99);
          border-color: rgb(187, 75, 99);
        }
      }
    }
  }
}
</style>

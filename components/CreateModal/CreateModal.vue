<template>
  <div
    v-show="isOpen"
    class="__create"
    :class="{ '--open': isOpen }"
    @mousedown.self="closeModal"
  >
    <div class="__create__card">
      <!-- header -->
      <div class="__create__card__header">
        <h2 class="__create__card__header__title">Create New Item</h2>
        <button class="__create__card__header__close" @click="closeModal">
          <span class="material-icons"> close </span>
        </button>
      </div>
      <!-- body -->
      <div class="__create__card__body">
        <div
          v-if="$store.getters['site/isDesktop']"
          class="__create__card__body__left"
        >
          <div class="__create__card__body__item">
            <label for="">Preview</label>
            <lazy-vault-list-item
              :data="formData"
              :custom-icon="Number(icon)"
            />
          </div>
          <div class="__create__card__body__item">
            <label
              >Password strenght
              <span
                v-tooltip="{
                  content:
                    'Read our guidelines to see how we calculate password strength',
                  placement: 'right',
                }"
                class="material-icons-outlined"
                @click="$router.push('/guidelines')"
              >
                info
              </span></label
            >
            <strenght-estimator :password="password" />
          </div>

          <div v-show="generatorSettings" class="__create__card__body__item">
            <label for="">Generator settings</label>
            <generator-panel />
          </div>
          <!-- <div class="__create__card__body__item">
             <label for="title">Preview data</label> -
             {{ formData }}
          </div> -->
        </div>
        <div class="__create__card__body__right">
          <div class="__create__card__body__item --split">
            <div class="__create__card__body__item --split --left">
              <label for="icon">Icon</label>
              <!-- numeric value 0 to 45 -->
              <div class="icon_input">
                <input
                  id="icon"
                  v-model="icon"
                  type="number"
                  min="0"
                  max="45"
                  placeholder="0"
                />
                <button @click="randomizeIcon">
                  <span class="material-icons-outlined"> autorenew </span>
                </button>
              </div>
            </div>
            <div class="__create__card__body__item --split --right">
              <label for="category">Category</label>
              <!-- select category -->
              <select id="category" v-model="categorySelect">
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.name"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="__create__card__body__item">
            <label for="title">
              Title
              <span v-if="titleError" class="--error"> {{ titleError }} </span>
            </label>
            <input
              id="title"
              v-model="title"
              type="text"
              placeholder="Title"
              @keyup="validateForm()"
            />
          </div>
          <div class="__create__card__body__item">
            <label for="username">Username</label>
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div class="__create__card__body__item">
            <label for="password"
              >Password
              <span v-if="passwordError" class="--error">{{
                passwordError
              }}</span>
            </label>
            <div class="password_item">
              <input
                id="password"
                v-model="password"
                type="text"
                placeholder="Password"
                @keyup="validateForm()"
              />
              <button @click="generatePassword">
                <span class="material-icons-outlined"> autorenew </span>
              </button>
              <button @click="generatorSettings = !generatorSettings">
                <span class="material-icons-outlined"> settings </span>
              </button>
            </div>
          </div>
          <div class="__create__card__body__item">
            <label for="url">URL</label>
            <input id="url" v-model="url" type="text" placeholder="URL" />
          </div>
          <div class="__create__card__body__item">
            <label for="notes">Notes</label>
            <textarea
              id="notes"
              v-model="notes"
              placeholder="Additonal information"
            ></textarea>
          </div>
        </div>
      </div>
      <!-- footer -->
      <div class="__create__card__footer">
        <button
          class="__create__card__footer__button"
          @click.prevent="createItem"
        >
          <span v-if="!waiting" class="material-icons-outlined">
            add_circle_outline
          </span>
          <span v-else class="material-icons-outlined waiting">
            hourglass_empty
          </span>
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StrenghtEstimator from '../StrenghtEstimator/StrenghtEstimator.vue'
import LazyVaultListItem from '../Vault/LazyVaultListItem.vue'
import GeneratorPanel from './GeneratorPanel.vue'

export default {
  name: 'CreateModal',
  components: { LazyVaultListItem, StrenghtEstimator, GeneratorPanel },
  data() {
    return {
      icon: 0,
      title: 'ServiceName',
      categorySelect: 'Default',
      username: '',
      password: '',
      url: 'http://www.test.pl/',
      notes: '',
      categories: [
        { name: 'Default' },
        { name: 'Banking' },
        { name: 'Email' },
        { name: 'Entertainment' },
        { name: 'Finance' },
        { name: 'Health' },
        { name: 'Misc' },
        { name: 'Shopping' },
        { name: 'Social' },
        { name: 'Other' },
      ],
      generatorSettings: false,
      titleError: '',
      passwordError: '',
      waiting: false,
    }
  },
  computed: {
    isOpen() {
      return this.$store.getters['modal/create']
    },
    formData() {
      const data = {
        uuid: this.$getUUID(),
        icon: this.icon || 0,
        title: this.title,
        category: this.categorySelect,
        username: this.username || '',
        password: this.password,
        url: this.url || '',
        notes: this.notes || '',
      }
      return data
    },
  },
  mounted() {
    this.randomizeIcon()
  },
  beforeDestroy() {},
  methods: {
    validateForm() {
      if (this.title.length < 3) {
        this.titleError = 'must be at least 3 characters long'
        return false
      } else {
        this.titleError = ''
      }
      if (this.password.length <= 0) {
        this.passwordError = " cant't be empty"
        return false
      } else {
        this.passwordError = ''
      }
      return true
    },
    clearModal() {
      this.icon = 0
      this.title = 'ServiceName'
      this.categorySelect = 'Default'
      this.username = ''
      this.password = ''
      this.url = 'http://www.test.pl/'
      this.notes = ''
      this.generatorSettings = true
      this.titleError = ''
      this.passwordError = ''
      this.randomizeIcon()
    },
    closeModal() {
      this.waiting = false
      this.$store.dispatch('modal/closeModal')
    },
    async createItem() {
      this.waiting = true
      if (this.validateForm()) {
        await this.$store
          .dispatch('vault/createVaultItem', this.formData)
          .then(() => {
            this.clearModal()
            this.closeModal()
          })
      }
    },
    randomizeIcon() {
      this.icon = Math.floor(Math.random() * 45)
    },
    async generatePassword() {
      this.password = await this.$store.dispatch('generator/generatePassword')
    },
  },
}
</script>

<style lang="scss" scoped>
.__create {
  @include flex-column;
  position: sticky;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  height: fit-content;
  background-color: rgba(250, 250, 250, 0.199);
  transition: all 0s;
  transform: scale(0);
  opacity: 0;
  filter: blur(0);

  @media screen and (max-width: 500px) {
    padding: 0 0rem;
  }

  &.--open {
    opacity: 1;
    transform: scale(1);

    .__create__card {
      transform: scale(1);
    }
  }

  &__card {
    position: sticky;
    top: 0;
    width: calc(var(--container-width) - 25vw);
    min-height: 20rem;
    margin: 0 auto;
    margin-top: 7rem;
    background-color: white;
    border-radius: 1rem;
    transform: translateY(100%);
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    box-shadow: 0 0 1rem 0.1rem rgba(0, 0, 0, 0.2);

    @media screen and (max-width: 500px) {
      padding: 0 0rem;
      width: 100%;
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

      &__title {
        font-size: 1.5rem;
        font-weight: 700;
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
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
      }
    }

    &__body {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      padding: 1rem 2rem;

      @media screen and (max-width: 500px) {
        padding: 1rem;
      }

      &__left {
        @include flex-column;
        @include center;
        width: 70%;
        max-width: 274px;
        height: 100%;
        padding-top: 0.5rem;

        .__create__card__body__item {
          span {
            margin-left: 0.2rem;
            font-size: 1rem;
            color: $primary;
            &:hover {
              transform: none;
            }
          }
        }
      }

      &__right {
        @include flex-column;
        min-width: 50%;
        width: 100%;
        height: 100%;
        min-height: 20rem;

        @media screen and (max-width: 500px) {
          padding: 0 0rem;
        }

        .password_item {
          @include flex-row;
          width: 100%;
          input {
            width: 100%;
          }
          button {
            width: 30px;
          }
        }
      }

      &__item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        min-height: 3rem;
        margin-bottom: 1rem;
        border-radius: 0.5rem;
        padding: 0.51rem;

        @media screen and (max-width: 500px) {
          padding: 0 0rem;
        }

        &.--split {
          min-height: 3rem;
          width: 100%;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          margin-bottom: 0.5rem;

          &.--left {
            flex-direction: column;
            width: 50%;
            margin-bottom: 0rem;

            .icon_input {
              @include flex-row;
            }
          }

          &.--right {
            flex-direction: column;
            width: 50%;
            margin-bottom: 0rem;

            select {
              @include flex-center;
              height: 32px !important;
              padding: 0.32rem 1rem;
              width: 100%;
            }
          }
        }

        label {
          height: 1.5rem;
        }
      }

      .material-icons-outlined {
        @include flex-center;
        font-size: 1.5rem;
        color: $dark;
        cursor: pointer;

        transition: all 0.2s ease-in-out;
        &:hover {
          color: $primary;
          transform: rotate(90deg);
        }
        &:active {
          transform: rotate(190deg);
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

      &__button {
        @include button;
        @include flex-center;
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
      }
    }
  }
}

.--error {
  @include flex-row;
  align-items: center;
  height: 100%;
  color: rgb(255, 170, 0);
  font-size: 1rem;
  font-weight: 300;
}
</style>

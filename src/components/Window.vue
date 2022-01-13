<template>
  <div class="window">
    <div class="window__container">
      <h3 class="window__title">Форма обратной связи</h3>
      <div class="window__form">
        <div class="window__wrap">
          <p class="window__name">
            Имя <span class="window__cicle" />
          </p>
          <input
            class="window__field"
            v-model="text"
            type="text"
            placeholder="Введите имя"
            :class="[ text && v$.text.$dirty && v$.text.$invalid ? 'window__field-error' : '']"
            @input="v$.text.$touch()"
          />
          <span
            :class="[text && v$.text.$dirty && v$.text.$invalid ? 'window__text-error' : '']"
            class="window__text"
          >
            Поле является обязательным
          </span>
        </div>
        <div class="window__wrap">
          <p class="window__name">
            Почта <span class="window__cicle" />
          </p>
          <input
            class="window__field"
            v-model="email"
            type="email"
            placeholder="Введите почту"
            :class="[email && v$.email.$dirty && v$.email.$invalid ? 'window__field-error' : '']"
            @input="v$.email.$touch()"
          />
          <span
            :class="[email && v$.email.$dirty && v$.email.$invalid ? 'window__text-error' : '']"
            class="window__text"
          >
            Поле является обязательным
          </span>
        </div>
        <div class="window__wrap">
          <p class="window__name">
            Номер телефона <span class="window__cicle" />
          </p>
          <input
            class="window__field"
            v-model="number"
            placeholder="Введите номер телефона"
            v-mask="mask"
            :class="[number && v$.number.$dirty && v$.number.$invalid ? 'window__field-error' : '']"
            @input="v$.number.$touch()"
          />
          <span
            :class="[number && v$.number.$dirty && v$.number.$invalid ? 'window__text-error' : '']"
            class="window__text"
          >
            Поле является обязательным
          </span>
        </div>
        <div class="window__wrap">
          <p class="window__name">
            Комментарий
          </p>
          <textarea
            class="window__field window__field-wide"
            v-model="description"
            placeholder="Дополнительная информация"
          />
        </div>
        <button
          @click="addCard"
          class="window__btn"
        >
          Добавить товар
        </button>
        <p :class="[isValid ? '' : 'open']" class="window__text-valid">Ваша заявка успешно обработана</p>
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'

export default {
  props:['onForm'],
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: '',
      text: '',
      description: '',
      number: '',
      timerCount: 10,
      isValid: false,
      mask: "+ 7(###) ## ## ###",
    }
  },
  validations() {
    return {
      text: {
        required,
        minLength: minLength(2)
      },
      email: {
        required,
        email,
        minLength: minLength(8)
      },
      number: {
      required,
      minLength: minLength(18),
    },
    }
  },
  methods: {
    addCard() {
      this.v$.$validate()
      if(!this.v$.$invalid) {
        this.onForm({
          text: this.text,
          email: this.email,
          description: this.description,
          number: this.number
        })
        this.text=''
        this.email=''
        this.description=''
        this.number=''
        this.timerAnswer()
        console.log(this.timerCount)
        return
      }
    },
    timerAnswer() {
      if (this.timerCount > 0) {
          setTimeout(() => {
            this.timerCount--
            this.isValid = true
            this.timerAnswer()
            console.log(this.timerCount)
          }, 1000)
        } else if (this.timerCount < 1) {
          this.isValid = false
          this.timerCount = 10
        }
    }
  }
}
</script>
<style scoped lang="scss">
  input, textarea, textarea:focus, textarea:active:focus, textarea.active:focus,
  textarea.focus, textarea:active.focus, textarea.active.focus {
    outline: none;
    box-shadow: none;
  }
  .window {
    font-family: Raleway;
    font-style: normal;
    color: #3F3F3F;
    max-width: 430px;
    margin: 0 auto;
    @media (max-width: 1150px) {
      min-width: 260px;
    }

    &__title {
      font-weight: 600;
      font-size: 28px;
      line-height: 35px;
      text-align: center;
    }
    &__form {
      background: #FFFEFB;
      box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
      border-radius: 4px;
      margin: 16px 16px 0 0;
      padding: 24px;
      @media (min-width: 280px) and (max-width: 768px) {
        flex-wrap: wrap;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      @media (min-width: 420px) and (max-width: 768px) { 
        max-height: 330px;
      }
    }
    &__field{
      font-weight: normal;
      font-size: 12px;
      line-height: 15px;
      max-width: 340px;
      min-height: 36px;
      width: 100%;
      background: #FFFEFB;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      margin-bottom: 16px;
      padding: 5px 0 0px 16px;
      word-wrap: break-word;
      word-break: break-all;
      resize: none;
      overflow: auto;
      transition: 0.7s;
      border: 1px solid #FFFEFB;
      @media (max-width: 768px) { 
        padding: 10px 0 0px 8px;
        min-height: 32px;
        font-size: 10px;
        line-height: 15px;
      }
      &:focus {
        background: rgb(211 211 211 / 20%);
        border: 1px solid rgb(211 211 211 / 20%);
      }
      &:hover {
        background: rgb(211 211 211 / 20%);
        border: 1px solid rgb(211 211 211 / 20%);
      }
    }
    &__field-error {
      border: 1px solid #FF8484 !important;
    }
    &__name {
      font-weight: normal;
      font-size: 10px;
      line-height: 13px;
      letter-spacing: -0.02em;
      margin-bottom: 4px;
      display: flex;
    }
    &__cicle {
      display: block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background:rgba(255, 132, 132, 1);
    }
    &__field-wide {
      min-height: 108px;
      height: 100%;
      font-family: Raleway;
    }
    &__btn {
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      letter-spacing: -0.02em;
      background: #32c51b;
      color: #FFFFFF;
      border-radius: 10px;
      width: 100%;
      padding: 15px 0 15px 0;
      transition: 0.9s;
      border: 0;
      cursor: pointer;
      @media (max-width: 768px) {
        width: 40%;
      }
      &:hover {
        background: #218012
      }
    }
    &__text {
      font-weight: normal;
      font-size: 8px;
      line-height: 10px;
      letter-spacing: -0.02em;
      color: #FF8484;
      opacity: 0;
      transition: .55s opacity;
      position: absolute;
      bottom: 6px;
      left: 0;
    }
    &__text-valid {
      font-weight: normal;
      font-size: 12px;
      line-height: 10px;
      letter-spacing: -0.02em;
      color: #54dd38;
      opacity: 1;
      transition: .55s opacity;
      margin: 10px 0;
    }
    &__text-error {
      opacity: 1;
    }
    &__wrap {
      position: relative;
      @media (max-width: 768px) {
        margin-right: 15px;
      }
    }
  }
 .open {
   opacity: 0;
  }
 .answer-window {
   position: absolute;
   top: 200px;
   font-family: Raleway;
 }
  
</style>

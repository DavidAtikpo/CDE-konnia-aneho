<template>
  <div class="page-content">
    <div class="bg-img" :class="{ blurred: popupVisible }">
      <img src="../assets/images/351383360_263196149601539_6741866346631895392_n.jpg" />
      <h2 class="img-text">
        Test l'pplication<br /> CDE koinonia Aneho Nlessi
      </h2>
    </div>
    <div class="right-content" :class="{ blurred: popupVisible }">
      <div class="nav">
        <a href="http://localhost:5173/">
          <img class="logo" src="../assets/images/logo.jpeg" alt="Logo " />
        </a>
      </div>
      <form @submit.prevent="registerStudent()">
        <div class="form-field">
          <div class="top-content">
            <h2>Enregistrez</h2>
            <div class="user-pic">
            </div>
            <!-- <p>Student</p> -->
          </div>
          <div class="full-name">
            <div>
              <label class="first-name" for="fName">Nom<span>* </span> </label>
              <input
                class="input-field name"
                type="text"
                name="fName"
                id="fName"
                required
                placeholder="John"
                v-model="data.firstName"
                @input="clearfirstNameError"
                :class="{ 'is-invalid': firstNameError }"
              />
              <div class="error" v-if="firstNameError">{{ firstNameError }}</div>
            </div>

            <div>
              <label class="last-name" for="lName">Prenom<span>* </span></label>
              <input
                class="input-field name"
                type="text"
                name="lName"
                id="lName"
                required
                placeholder="Doe"
                v-model="data.lastName"
                @input="clearlastNameError"
                ref="lastNameInput"
                :class="{ 'is-invalid': lastNameError }"
              />
              <div class="error" v-if="lastNameError">{{ lastNameError }}</div>
            </div>
          </div>

          <div>
            <label for="email">Email<span>* </span></label>
            <input
              type="email"
              class="input-field"
              name="email"
              id="email"
              required
              placeholder="example@email.com"
              v-model="data.email"
              @input="clearemailError"
              ref="emalInput"
              :class="{ 'is-invalid': emailFormatError || emailExistError }"
            />
          </div>
          <div class="error" v-if="emailFormatError">{{ emailFormatError }}</div>
          <div class="error" v-else>{{ emailExistError }}</div>

          <div>
            <label for="phone">Telephone<span>* </span></label>
            <input
              class="input-field"
              type="tel"
              name="phone"
              id="phone"
              placeholder="0123456789"
              required
              v-model="data.phoneNumber"
              @input="clearphoneNumberError"
              ref="phoneNumberInput"
              :class="{ 'is-invalid': phoneNumberError }"
            />
            <div class="error" v-if="phoneNumberError">{{ phoneNumberError }}</div>
          </div>
          <div>
            <label for="password">Mot de passe<span>* </span></label>
            <div class="password-container">
              <input
                class="input-field"
                :type="passwordFieldType"
                name="password"
                id="password"
                placeholder="Enter password"
                v-model="data.password"
                @input="clearpasswordError"
                :class="{ 'is-invalid': passwordError }"
              />
              <i
                class="toggle-password-icon"
                :class="{ 'fas fa-eye-slash': !showPassword, 'fas fa-eye': showPassword }"
                @click="PasswordVisibility"
              >
              </i>
            </div>
            <div class="error" v-if="passwordError">{{ passwordError }}</div>
          </div>

          <div>
            <label for="confirm-password">Confirme Mot de passe<span>* </span></label>
            <div class="password-container">
              <input
                class="input-field inner-pswd"
                :type="comfirmPasswordFieldType"
                name="confirm-password"
                id="confirm-password"
                required
                placeholder="Confirm password"
                v-model="data.confirmPassword"
                @input="clearconfirmPasswordError"
                ref="confirmPasswordInput"
                :class="{ 'is-invalid': confirmPasswordError }"
              />
              <i
                class="toggle-password-icon"
                :class="{
                  'fas fa-eye-slash': !showconfirmPassword,
                  'fas fa-eye': showconfirmPassword
                }"
                @click="comfirmPasswordVisibility"
              >
              </i>
            </div>
            <div class="error" v-if="confirmPasswordError">{{ confirmPasswordError }}</div>
          </div>
          <button type="submit">Submit</button>
          <span class="login"
            >Avez vous deja un compte?<a @click="goToLogin" href="">Connectez</a></span
          >
        </div>
      </form>
      <!-- <div v-else class="activate-msg">
        <h1>Verify Your Email</h1>
        <p>We've sent an email which contains an activation link to your email</p>
        <p>Check your email</p>
        <p>{{ data.email }}</p>
      </div> -->
    </div>
  </div>
  <div class="popup" id="popup">
    <img class="check" src="../assets/images/check.png" />
    <h2>Sign Up Successful</h2>
    <p>
      A verification link has been sent to
      <span style="font-weight: bold">{{ this.data.email }}</span>
    </p>
    <button @click="closePopup" type="button">OK</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      popupVisible: false,
      showPassword: false,
      showconfirmPassword: false,
      signupSuccesful: false,
      data: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        role: 'user'
        // gender: ''
      },
      firstNameError: '',
      lastNameError: '',
      phoneNumberError: '',
      emailFormatError: '',
      emailExistError: '',
      passwordError: '',
      confirmPasswordError: ''
    }
  },
  computed: {
    passwordFieldType() {
      return this.showPassword ? 'text' : 'password'
    },
    comfirmPasswordFieldType() {
      return this.showconfirmPassword ? 'text' : 'password'
    }
  },

  methods: {
    openPopup() {
      popup.classList.add('open-popup')
      this.popupVisible = true
    },
    closePopup() {
      popup.classList.remove('open-popup')
      this.popupVisible = false
      this.$router.push('/login')
    },
    PasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    comfirmPasswordVisibility() {
      this.showconfirmPassword = !this.showconfirmPassword
    },
    registerStudent() {
      axios
        .post('http://localhost:8000/user/register', this.data)
        .then((res) => {
          if (res.status === 201) {
            this.openPopup()
            
            this.signupSuccesful = true
          }
        })
        .catch((error) => {
          console.log("$$$$$$$",error);
          if (error.response.data.message) {
            this.emailExistError = error.response.data.message
          } else {
            this.firstNameError = error.response.data.errors.firstName
            this.lastNameError = error.response.data.errors.lastName
            this.phoneNumberError = error.response.data.errors.phoneNumber
            this.emailFormatError = error.response.data.errors.email
            this.passwordError = error.response.data.errors.password
            this.confirmPasswordError = error.response.data.errors.confirmPassword
          }

          // console.log(error.response.data)
          console.log(error)
          // console.log(this.emailFormatError)
        })
    },
    clearfirstNameError() {
      this.firstNameError = ''
    },
    clearlastNameError() {
      this.lastNameError = ''
    },
    clearphoneNumberError() {
      this.phoneNumberError = ''
    },
    clearemailError() {
      this.emailFormatError = ''
      this.emailExistError = ''
    },
    clearpasswordError() {
      this.passwordError = ''
    },
    clearconfirmPasswordError() {
      this.confirmPasswordError = ''
    },
    goToLogin() {
      this.$router.push('/login')
    },
    goTohomePage() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.page-content {
  display: flex;
  padding: 0;
  margin: 0;
  gap: 3%;
  height: 100vh;
}

.blurred {
  filter: blur(5px); /* adjust the blur amount as needed */
}
.bg-img {
  display: flex;
  background: black;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 55%;
  /* height: 100vh; */
}
.img-text {
  position: absolute;
  /* top: 50%;
  left: 16.188rem; */
  color: white;
  font-size: 3.5rem;
}

.bg-img img {
  object-fit: cover;
  width: 100%;
  height: 100vh;
  opacity: 0.5;
}
.right-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  /* border: 1px solid black; */
}
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  width: 100%;
}
.logo {
  width: 100px;
}

form {
  height: 100hv;
  width: 36em;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0;
}

.top-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top: 1em; */
}
form .form-field {
  height: 100%;
  width: 100%;
  padding: 1em;
  display: flex;
  flex-direction: column;
  row-gap: 0.75em;
  justify-content: center;
  align-items: center;
}
form .form-field h2 {
  font-size: 2.5rem;
  color: #1f2bd3;
}

.user-pic {
  width: 4rem;
  margin-top: 1rem;
}
.user-pic img {
  border-radius: 2rem;
}

.input-field {
  width: 26rem;
  height: 2.844rem;
  padding-left: 0.5em;
  border: solid 1px;
  border-radius: 0.25em;
  border: 1px solid #ccc;
}
.input-field:focus {
  border: none;
}
/* #password.input-field:not(:focus):invalid,
#confirm-password.input-field:not(:focus):invalid,
#email.input-field:not(:focus):invalid {
  border: solid 2px red;
  color: red;
}

#password.input-field:invalid,
#confirm-password.input-field:invalid,
#email.input-field:invalid {
  border: solid 2px red;
} */
.is-invalid {
  border: 2px solid red;
}

.input-field,
.error {
  --left: 0;
  left: var(--left);
  position: relative;
}
.error {
  color: red;
  text-align: center;
  font-size: 12px;
  animation: error-shake 600ms;
}

@keyframes error-shake {
  0% {
    --left: -10px;
  }
  20% {
    --left: 8px;
  }
  40% {
    --left: -6px;
  }
  60% {
    --left: 4px;
  }
  80% {
    --left: -2px;
  }
  100% {
    --left: 0;
  }
}

.full-name {
  display: flex;
  gap: 1rem;
}
.input-field.name {
  width: 12.5rem;
}
.first-name,
.last-name,
label {
  display: block;
}

form button {
  width: 26rem;
  height: 3rem;
  border: none;
  background-color: #1f2bd3;
  border-radius: 0.25em;
  cursor: pointer;
  color: white;
  font-weight: bold;
}
form button:hover {
  background-color: #1bf008;
  transition: 0.3s;
}
.login a {
  color: #1f2bd3;
  font-weight: bold;
}
.login a:hover {
  color: #06d73a;
}

.password-container {
  display: flex;
  border: solid 1px;
  border-color: #cccccc;
  border-radius: 0.25rem;
  position: relative;
}

.password-container:invalid {
  border: solid 2px red;
}

.toggle-password-icon {
  border: none;
  position: absolute;
  right: 0.375rem;
  top: 0.875rem;
  cursor: pointer;
}
.activate-msg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid black; */
  height: 100%;
  width: 100%;
}

.activate-msg h1 {
  padding-bottom: 2rem;
}
.activate-msg p {
  padding-bottom: 1rem;
}

@media only screen and (max-width: 600px) {
  .page-content {
    display: flex;
    justify-content: center;
  }
  .bg-img {
    display: none;
  }
  .right-content {
    justify-content: center;
  }
  .logo {
    width: 100px;
  }

  .user-pic {
    display: flex;
    justify-content: center;
    margin-top: 1em;
  }
  .user-pic img {
    width: 3rem;
  }
  form {
    width: 100%;
  }
  form .form-field h2 {
    font-size: 1.5rem;
    color: #79a00a;
  }
  form .form-field p {
    font-size: 1rem;
  }
  .full-name {
    display: flex;
    flex-direction: column;
    gap: 0.75em;
  }
  .input-field.name {
    width: 20rem;
    height: 2rem;
  }
  .input-field {
    width: 20rem;
    height: 2rem;
  }

  form button {
    width: 20rem;
    height: 2rem;

    border-radius: 0.5em;
  }
  .toggle-password-icon {
    top: 0.5rem;
  }
}

.check {
  width: 100px;
  margin-top: -50px;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.popup {
  width: 400px;
  background: #fff;
  border-radius: 6px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.1);
  text-align: center;
  padding: 0 30px 30px;
  color: #333;
  visibility: hidden;
  z-index: 1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.4s,
    top 0.4s;
}

.open-popup {
  visibility: visible;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
}

.popup h2 {
  font-size: 38px;
  font-weight: 500;
  margin: 30px 0 10px;
}

.popup button {
  width: 30%;
  margin-top: 50px;
  padding: 10px 0;
  background: #32c671;
  color: #fff;
  border: 0;
  outline: none;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>

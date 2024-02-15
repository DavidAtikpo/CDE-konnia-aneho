<template>
  <div class="overall">
    <div class="login-pic-container" :class="{ blurred: popupVisible }">
      <img class="login-pic" src="../assets/images/309430577_431589382413805_5270125874633532938_n.jpg" alt="login-picture" />
      <div class="login-intro">La compassion Togo<br />Aneho Nlessi.</div>
    </div>
    <div class="login-container" :class="{ blurred: popupVisible }">
      <div>
        <a href="http://localhost:5173/">
          <img class="login-logo" src="../assets/images/logo.jpeg" alt="logo" />
        </a>
      </div>
      <h2 class="login-title">Connectez ici</h2>
      <div class="login-user">
        <img class="user-logo" src="" alt="" />
      </div>
      <form class="login-form" @submit.prevent="handleLogin">
        <input
          v-model="loginData.email"
          class="form-input"
          type="email"
          name="email"
          placeholder="Email"
          @input="clearError"
          required
        />
        <div class="password-container">
          <input
            id="password"
            class="form-input inner-pswd"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            v-model="loginData.password"
            placeholder="Password"
            :class="{ 'is-invalid': errorMessage }"
            @input="clearError"
            required
          />
          <i
            class="toggle-password-icon"
            :class="{ 'fas fa-eye-slash': !showPassword, 'fas fa-eye': showPassword }"
            @click="togglePasswordVisibility"
          >
          </i>
        </div>
        <span class="error" v-if="errorMessage">{{ errorMessage }}</span>
        <div>
          <a class="forgot" @click="gotToForgot">Mot de passe oublie?</a>
        </div>

        <button class="form-button" type="submit" @click="handleLogin" :disabled="loading">
          <i v-if="loading" class="fas fa-circle-notch fa-spin"></i>
          <span v-else>Connecte</span>
        </button>
        <div class="login-p">
          Vous n'avez pas de compte?
          <a @click="goToRegister" class="sign-up-link" href="#">Inscription</a>
        </div>
      </form>
    </div>
    <div class="popup" id="popup">
      <img class="check" src="" />
      <h2>Login was successful</h2>
      <button @click="closePopup" type="button">OK</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
//import '@fortawesome/fontawesome-free/css/all.css'
export default {
  data() {
    return {
      loading: false,
      showPassword: false,
      popupVisible: false,
      loginData: {
        email: '',
        password: '',
        loading: false
      },
      // startValidate: false,
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      errorMessage: '',
      showError: false
    }
  },
  methods: {
    gotToForgot() {
      this.$router.push('/forgot-password')
    },
    openPopup() {
      popup.classList.add('open-popup')
      this.popupVisible = true
    },
    closePopup() {
      popup.classList.remove('open-popup')
      this.popupVisible = false
      this.$router.push('/student/analytics')
    },
    goToRegister() {
      this.$router.push('/user/signup')
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    handleLogin() {
      this.startValidate = true
      this.loading = true
      let popup = document.getElementById('popup')
 //const apiUrl = `https://ced4-41-78-136-120.ngrok-free.app`;
      axios
        .post('http://localhost:8000/user/login', this.loginData)
      
        .then((res) => {
          localStorage.setItem('token', res.data.token,)
          //localStorage.setItem('user', res.data.firstName);
          console.log(res.data.token);
          if (res.status == 200) {
            // this.openPopup()
            this.$router.push('/user/userDashboard')
          }
        })
        .catch((error) => {
          console.log('Error submitting login:', error)
          this.errorMessage = error.response.data.message
          console.log(this.errorMessage)
        })
        .finally(() => {
          this.loading = false
        })
    },
    clearError() {
      this.errorMessage = ''
    }
  }
}
</script>

<style scoped>
.overall {
  display: flex;
  padding: 0;
  margin: 0;
  gap: 2em;
  height: 100vh;
}
.blurred {
  filter: blur(5px); /* adjust the blur amount as needed */
}

.login-pic-container {
  display: flex;
  background: black;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 56em;
}
.login-pic {
  object-fit: cover;
  width: 100%;
  height: 100vh;
  opacity: 0.5;
}

.login-intro {
  position: absolute;
  /* top: 50%;
  left: 16.188rem; */
  color: white;
  font-size: 3.5rem;
}

.login-title {
  color: #1f2bd3;
  font-size: 2.25rem;
  padding-top: 0.625rem;
}

.login-logo {
  padding-top: 1rem;
  width: 100px;
  
}
/* .user-logo {
  padding-top: 1rem;
  border-radius: 30px;
} */

.login-user {
  padding-top: 0.313rem;
  font-size: 1.5rem;
  font-weight: 700;
  padding-bottom: 3.125rem;
}

.login-container {
  text-align: center;
  height: 100dvh;
  width: 34rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1.25rem;
  width: 100%;
}

.form-input {
  width: 26rem;
  height: 2.844rem;
  padding-left: 0.5em;
  border: solid 1px;
  border-radius: 0.25em;
  border: 1px solid #ccc;
}
.is-invalid {
  border: 2px solid red;
}

.error {
  display: block;
  font-size: 1rem;
  margin-top: 1px;
  color: red;
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

.inner-pswd {
  border: none;
  display: inline-block;
  width: 26rem;
}

.inner-pswd:active {
  border: none;
}

.inner-pswd:invalid {
  border: none;
}

label {
  text-align: start;
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

.form-button {
  width: 26rem;
  height: 3rem;
  border: none;
  background-color: #1f2bd3;
  border-radius: 0.25em;
  cursor: pointer;
  color: white;
  font-weight: bold;
}

.form-button:hover{
  background-color: #06d73a;
}

.fa-spinner {
  font-size: 25px;
}
.login-p {
  color: grey;
  font-size: 14px;
}

.forgot {
  color: black;
  text-decoration: none;
  font-size: 1rem;
  display: inline;
  display: block;
  margin-bottom: 0;
}

.forgot:hover {
  color: red;
  cursor: pointer;
}

.sign-up-link {
  color: #1f2bd3;
  font-weight: 900;
  font-size: 1rem;
  text-decoration: underline;
}

.sign-up-link:hover {
  color: #06d73a;
}

/* Mobile View */
@media only screen and (max-width: 600px) {
  .overall {
    display: flex;
    justify-content: center;
    height: 100dvh;
  }
  .login-pic-container {
    display: none;
  }
  .login-logo {
    /* padding-right: 0; */
    padding-top: 0rem;
    margin-bottom: 4rem;
    width: 100px;
  }
  .login-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-top: 0%;
  }
  .form-input {
    width: 20rem;
    height: 2rem;
  }
  .form-button {
    width: 20rem;
    height: 2rem;
  }
  .login-title {
    font-size: 1.5rem;
  }
  .user-logo {
    width: 3rem;
  }
  .toggle-password-icon {
    top: 0.6rem;
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

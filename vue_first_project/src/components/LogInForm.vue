<template>
  <div>
    <AppNavbar />
    <div class="login-form-container">
      <form @submit.prevent="login" class="login-form">
        <label for="email">Email:</label>
        <input v-model="email" id="email" required />
        <label for="password">Password:</label>
        <input v-model="password" id="password" type="password" required />

        <div class="button-container">
          <button type="submit">Login</button>
          <div class="errorMessage">{{ errorMessage }}</div>
        </div>
      </form>
      <div class="signup-message">
        <p>Don't have an account?</p>
        <router-link to="/">Sign Up</router-link>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import axios from 'axios';
import AppNavbar from './AppNavbar.vue';
import AppFooter from './AppFooter.vue';

export default {
  name: 'LogInForm',
  components: {
    AppNavbar,
    AppFooter,
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    login() {
      const data = {
        email: this.email,
        password: this.password,
      };

      axios.post('http://localhost:8000/login/', data, { withCredentials: true })
        .then((response) => {
          if (response.data.status === 'success') {
            this.errorMessage = '';
            localStorage.setItem('token', response.data.token);
            this.$router.push({ name: 'HomePage' });
          } else {
            this.errorMessage = response.data.message;
          }
        })
        .catch((error) => {
          this.errorMessage = error.response && error.response.data
            ? error.response.data.message
            : error.message;
          console.error(this.errorMessage);
        });
    },
  },
};
</script>

<style scoped>
/* Existing styles... */

.signup-message {
  text-align: center;
  margin-top: 20px;
}

.signup-message p {
  margin-bottom: 10px;
}

.signup-message router-link {
  color: #4caf50;
  text-decoration: underline;
  cursor: pointer;
}

.errorMessage {
  color: red;
  margin-top: 10px;
}

.login-form-container {
  max-width: 400px;
  margin: 16vh auto; /* Add top margin in viewport height units */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.login-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #4caf50;
}

.button-container {
  text-align: center;
}

.button-container button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.button-container button:hover {
  background-color: #45a049;
}
</style>



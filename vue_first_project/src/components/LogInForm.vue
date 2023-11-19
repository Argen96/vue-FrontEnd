<!-- src/components/LogInForm.vue -->
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
      </div>
    </form>
  </div>
    <AppFooter />
  </div>
</template>

<script>
import axios from 'axios'
import AppNavbar from './AppNavbar.vue'
import AppFooter from './AppFooter.vue'

export default {
  name: "LogInForm",
  components: {
    AppNavbar,
    AppFooter,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const data = {
        email: this.email,
        password: this.password,
      };

      axios.post("http://localhost:8000/login/", data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
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



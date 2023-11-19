<template>
  <div>
    <AppNavbar />
    <div class="signup-form-container">
      <form @submit.prevent="signup" class="signup-form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input v-model="username" id="username" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" id="email" type="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input v-model="password" id="password" type="password" required />
        </div>
        <div class="button-container">
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <div class="errorMessage">{{ error }}</div>
      <div class="login-message">
        <p>Already have an account? <router-link to="/login" class="login-link">Log In</router-link></p>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import axios from "axios";
import AppNavbar from './AppNavbar.vue'
import AppFooter from './AppFooter.vue'

export default {
  name: "SignUpForm",
  components: {
    AppNavbar,
    AppFooter,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    signup() {
      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      axios.post("http://localhost:8000/signup/", data)
        .then((response) => {
          console.log(response.data);
          if (response.data.status === "success") {
            this.error = null;
            alert("Sign Up successful!");
            this.$router.push({ name: "LogInForm" });
          } else {
            this.error = "Sign up failed. Please try again.";
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.data && error.response.data.message) {
            this.error = error.response.data.message; // Display the server's error message
          } else {
            this.error = "Sign Up failed. Please try again.";
          }
        });
    },
  },
};
</script>

<style scoped>
.login-message {
  text-align: center;
  margin-top: 20px;
}

.login-message p {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.login-link {
  margin-left: 5px;
  color: #4caf50;
  text-decoration: underline;
  cursor: pointer;
}

.errorMessage {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.signup-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
  margin-top: 10vh; /* Adjust the top margin as needed */
}

.signup-form {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-container {
  text-align: center;
  margin-top: 16px;
}

button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
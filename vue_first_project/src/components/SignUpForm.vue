<!-- src/components/SignupForm.vue -->
<template>
 <div>
 <AppNavbar />
  <div class="signup-form-container">
    <form @submit.prevent="signup" class="signup-form">
      <label for="username">Username:</label>
      <input v-model="username" id="username" required />
      <label for="email">Email:</label>
      <input v-model="email" id="email" type="email" required />
      <label for="password">Password:</label>
      <input v-model="password" id="password" type="password" required />
       <div class="button-container">
        <button type="submit">Sign Up</button>
         <div class = "errorMessage"> {{error }}  </div>
      </div>
    </form>
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
            this.error = null
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
.signup-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.signup-form {
  max-width: 400px;
  width: 90%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
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

.errorMessage{
  color: red;
  margin-top:10px
}

</style>

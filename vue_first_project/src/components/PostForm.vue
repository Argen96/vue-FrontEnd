<!-- components/PostForm.vue -->
<template>
<div>
<AppAccountNavBar/>
  <div class="post-form-container">
    <form @submit.prevent="createPost" class="post-form">
      <label for="title">Title:</label>
      <input v-model="title" id="title" required />
      <label for="content">Content:</label>
      <textarea v-model="content" id="content" required></textarea>
      <div class="button-container">
        <button type="submit">Create Post</button>
      </div>
      <div class="errorMessage">{{ error }}</div>
    </form>
  </div>
    <AppFooter />
  </div>
</template>

<script>
import axios from "axios";
import AppAccountNavBar from './AppAccountNavBar.vue';
import AppFooter from './AppFooter.vue'

export default {
  name: "PostForm",
  components: {
    AppAccountNavBar,
    AppFooter,
  },
  data() {
    return {
      title: "",
      content: "",
      error: null,
    };
  },
  methods: {
    createPost() {
      // Retrieve the access token from localStorage
      const accessToken = localStorage.getItem("token");

      if (!accessToken) {
        // Redirect the user to the login page or handle the case where there is no token
        this.$router.push({ name: 'LogInForm' });
        return;
      }

      const data = {
        title: this.title,
        content: this.content,
      };

      axios.post("http://localhost:8000/posts/", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          console.log(response.data);
          // Check if the response contains the expected properties
          if (response.data && response.data.title && response.data.content) {
            this.error = null;
            alert("Post created successfully!");
          } else {
            this.error = "Failed to create post. Please try again.";
          }
        })
        .catch((error) => {
          console.error(error);
          this.error = "Failed to create post. Please try again.";
        });
    },
  },
};
</script>


<style scoped>
.post-form-container {
  max-width: 400px; /* Adjust the max-width to make the form smaller */
  margin: 15vh auto; /* Center the form vertically with some gap from the top */
  padding: 20px;
  border: 1px solid #dddfe2;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

label {
  font-size: 1.2em;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #dddfe2;
  border-radius: 5px;
}

.button-container {
  text-align: center;
}

button {
  padding: 12px 20px;
  font-size: 1.2em;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
}

button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.errorMessage {
  color: #ff0000;
  font-size: 1em;
  margin-top: 10px;
}
</style>
<template>
  <div>
    <AppAccountNavBar />
    <div class="post-list-container">
      <h2>Posts</h2>
      <ul class="post-list">
        <li v-for="post in posts" :key="post.id" class="post-item">
          <div class="post-content">
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-text">{{ post.content }}</p>
          </div>
          <div class="post-buttons">
         <router-link to="/edit-post"><button class="edit-button">Edit</button></router-link> 
            <button class="delete-button" @click="deletePost(post.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="create-post-container">
      <router-link to="/create-post">Create Post</router-link>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppAccountNavBar from './AppAccountNavBar.vue';
import AppFooter from './AppFooter.vue';
import axios from "axios";

export default {
  name: "HomePage",
  components: {
   AppAccountNavBar,
    AppFooter,
  },
  data() {
    return {
      posts: [],
      accessToken: null, // Add accessToken as a data property
    };
  },
  mounted() {
    // Fetch posts when the component is mounted
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      // Retrieve the access token from localStorage
      this.accessToken = localStorage.getItem("token");

      if (!this.accessToken) {
         this.$router.push({ name: 'LogInForm' });
      }

      // Make an API request to fetch posts
      axios.get("http://localhost:8000/posts/", {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deletePost(postId) {
      // Make an API request to delete the post
      axios.delete(`http://localhost:8000/posts/${postId}/`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .then(() => {
        // Remove the deleted post from the local posts array
        this.posts = this.posts.filter(post => post.id !== postId);
        console.log(`Post with ID ${postId} deleted successfully`);
      })
      .catch((error) => {
        console.error(error);
      });
    },
  },
};
</script>

<style scoped>
.post-list-container {
  max-width: 800px;
  margin: auto;
  margin-bottom: 40px;
}

.post-list {
  list-style-type: none;
  padding: 0;
}

.post-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 5px;
  display: flex;
  flex-direction: column; /* Change to column layout */
}

.post-content {
  flex-grow: 1;
  overflow: hidden; /* Hide overflow content */
}

.post-title {
  margin: 0;
  font-size: 1.5em;
  color: #333; /* Dark gray color for a more professional look */
  font-family: 'Arial', sans-serif; /* Change font family to Arial for a more standard look */
}

.post-text {
  margin-top: 10px;
  font-size: 1.2em;
  color: #555;
  white-space: normal; /* Allow text to wrap */
  border-bottom: 1px solid #ccc; /* Add border below content */
}

.post-buttons {
  display: flex;
  margin-top: 10px; /* Add margin between content and buttons */
}

.edit-button,
.delete-button {
  padding: 8px 16px;
  margin-right:6vh; /* Add gap between edit and delete buttons */
  font-size: 1em;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
}

.edit-button {
  background-color: #007bff; /* Blue color */
  margin-left:40vh
}

.delete-button {
  background-color: #ff0000; /* Red color */
}

.edit-button:hover,
.delete-button:hover {
  transform: scale(1.05);
}

.create-post-container {
  text-align: center;
  margin-top: 20px;
}

.create-post-container a {
  padding: 15px 30px;
  font-size: 1.2em;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  background-color: #4caf50; /* Green color */
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
}

.create-post-container a:hover {
  background-color: #45a049; /* Darker green on hover */
  transform: scale(1.05);
}
</style>






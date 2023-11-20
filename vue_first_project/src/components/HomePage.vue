<!-- HomePage.vue -->
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
            <!-- Pass post.id to the editPost method -->
            <button class="edit-button" @click="editPost(post.id)">Edit</button>
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
      accessToken: null,
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      this.accessToken = localStorage.getItem("token");

      if (!this.accessToken) {
        this.$router.push({ name: 'LogInForm' });
        return;
      }

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
      axios.delete(`http://localhost:8000/post/${postId}/`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .then(() => {
        this.posts = this.posts.filter(post => post.id !== postId);
      })
      .catch((error) => {
        console.error(error);
      });
    },
    editPost(postId) {
      localStorage.setItem('editPostId', postId);
      this.$router.push({ name: 'EditPostForm' });
    },
  },
};
</script>


<style scoped>
/* Container for the list of posts */
.post-list-container {
  max-width: 800px;
  margin: auto;
  margin-bottom: 40px;
}

/* Style for the list of posts */
.post-list {
  list-style-type: none;
  padding: 0;
}

/* Style for each individual post item */
.post-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Content section of each post item */
.post-content {
  flex-grow: 1;
  overflow: hidden;
}

/* Title of the post */
.post-title {
  margin: 0;
  font-size: 1.5em;
  color: #333;
  font-family: 'Arial', sans-serif;
}

/* Text content of the post */
.post-text {
  margin-top: 10px;
  font-size: 1.2em;
  color: #555;
  white-space: normal;
  border-bottom: 1px solid #ccc;
}

/* Buttons section for each post */
.post-buttons {
  display: flex;
}

/* Edit and delete buttons */
.edit-button,
.delete-button {
  padding: 8px 16px;
  font-size: 1em;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
}

/* Edit button style */
.edit-button {
  background-color: #007bff;
}

/* Delete button style */
.delete-button {
  background-color: #ff0000;
}

/* Hover effect for buttons */
.edit-button:hover,
.delete-button:hover {
  transform: scale(1.05);
}

/* Container for the "Create Post" link */
.create-post-container {
  text-align: center;
  margin-top: 20px;
}

/* Style for the "Create Post" link */
.create-post-container a {
  padding: 15px 30px;
  font-size: 1.2em;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  background-color: #4caf50;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
}

/* Hover effect for the "Create Post" link */
.create-post-container a:hover {
  background-color: #45a049;
  transform: scale(1.05);
}
</style>







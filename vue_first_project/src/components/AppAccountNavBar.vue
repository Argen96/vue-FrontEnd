<template>
  <header class="custom-header">
    <h1 class="custom-header-text" @click="goToHomePage">
      Argen First-Vue_App
    </h1>
    <div class="header-controls">
      <div class="header-controls-right">
        <i class="material-icons" @click="goToHomePage">home</i>
        <i class="material-icons" @click="logout">exit_to_app</i>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppAccountNavbar',
  methods: {
    goToHomePage() {
      this.$router.push({ name: 'HomePage' });
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'LogInForm' });
    },
  },
};
</script>

<style scoped>
.custom-header {
  background-color: #1e87f0;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-header-text {
  margin: 0; /* Remove default margin for the h1 element */
  font-size: 24px;
  cursor: pointer;
}

.header-controls {
  display: flex;
  align-items: center;
}

.header-controls-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px; /* Increase the gap between elements */
}

.material-icons {
  cursor: pointer;
  font-size: 30px; /* Increase the font size */
  color: white;
}
</style>


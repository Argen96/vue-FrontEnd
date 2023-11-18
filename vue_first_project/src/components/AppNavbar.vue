<template>
  <header class="custom-header">
    <h1 class="custom-header-text">
      Argen First-Vue_App
    </h1>
    <div class="header-controls">
      <div class="header-controls-right">
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppNavbar'
}
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
  gap: 10px; /* Adjust the gap between elements as needed */
}

@media (min-width: 768px) {
  .custom-header {
    flex-direction: row;
    justify-content: space-between;
  }

  .header-controls {
    margin-top: 0;
  }
}

</style>


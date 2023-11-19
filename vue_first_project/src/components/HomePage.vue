<template>
  <div>
    <AppNavbar />
    <div>
      Hi
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from './AppNavbar.vue';
import AppFooter from './AppFooter.vue';

export default {
  name: "HomePage",
  components: {
    AppNavbar,
    AppFooter,
  },
  data() {
    return {};
  }, // Add a comma here
};
</script>

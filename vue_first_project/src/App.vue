<template>
 <div>
    <AppNavbar />
    <SignUpForm />
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'
import SignUpForm from './components/SignUpForm.vue'

export default {
  name: 'App',
 components: {
    AppNavbar,
    AppFooter,
    SignUpForm
  }
}
</script>

<style>
</style>

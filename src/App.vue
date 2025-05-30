<template>
  <div id="app" class="bg-dark-bg text-text-primary font-inter">
    <Navbar />
    <Transition name="page" mode="out-in">
      <router-view />
    </Transition>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style>
@import './assets/styles/main.css';
</style>
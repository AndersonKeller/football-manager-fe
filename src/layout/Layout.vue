<script setup lang="ts">
import Footer from "../components/footer/Footer.vue";
import Header from "../components/header/Header.vue";
</script>
<template>
  <Header />
  <main>
    <slot></slot>
  </main>
  <Footer />
</template>
<style scoped>
main {
  /* display: flex; */
  gap: 24px;
  width: 90%;
  padding: 24px 0;
  margin: 0 auto;
  min-height: 83vh;
  align-items: center;
}
</style>

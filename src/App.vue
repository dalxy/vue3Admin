<template>
  <div>
    <router-view />
    <Counter />
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>
<script setup lang="ts">
// import HelloWorld from "./components/HelloWorld.vue";
import Counter from "@/components/Counter/index.vue";
</script>

<style scoped></style>

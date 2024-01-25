<template>
  <div>
    <h1>Guide page</h1>
    <div @click="aaa">222</div>
  </div>
</template>
<script lang="ts" setup>
import axios from "axios";
axios
  .post("https://152.136.150.189/reactAdmin/authorityList", { a:1})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
axios
  .get("https://152.136.150.189/public/getSlider")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
const aaa = () => {
  console.log(222);
};
</script>

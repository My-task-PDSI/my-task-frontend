<template>
  <div v-if="loaded" class="app-container">
    <notifications position="top right" class="my-notification" />
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return { loaded: false };
  },
  async mounted() {
    await this.$store.dispatch("initialCredentialCheck");
    this.loaded = true;
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  min-height: 100vh;
}
#app {
  font-family: Poppins;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.my-notification {
  margin-top: 80px;
}
/* global defs */
.no-user-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>

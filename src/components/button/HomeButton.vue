<template>
  <div class="home-container" @click="onClick">
    <i class="fas fa-home"></i>
  </div>
</template>

<script>
export default {
  name: "HomeButton",
  methods: {
    onClick() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.home-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border: 2px solid rgba(44, 43, 43, 0.8);
  border-radius: 10px;
  background-color: white;
  margin-right: 10px;
  margin-left: 10px;
}
.home-container i {
  font-size: 24px;
}
.home-container i:hover {
  cursor: pointer;
}
</style>
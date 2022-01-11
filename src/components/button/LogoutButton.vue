<template>
  <button class="logout-container" @click="logout">
    <i class="fas fa-sign-out-alt"></i>
  </button>
</template>

<script>
export default {
  name: "LogoutButton",
  methods: {
    logout() {
      const store = this.$store;
      alert("Seção encerrada");
      store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.logout-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border: 2px solid rgba(44, 43, 43, 0.8);
  border-radius: 10px;
  margin-right: 10px;
  margin-left: 10px;
  background-color: #ffff;
}
.logout-container i {
  font-size: 24px;
  color: rgb(255, 53, 53);
}
</style>
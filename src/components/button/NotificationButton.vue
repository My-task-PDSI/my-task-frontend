<template>
  <div class="notification-container" :class="{ notify }" @click="onClick">
    <i class="fas fa-bell"></i>
  </div>
</template>

<script>
export default {
  name: "NotificationButton",
  props: {
    notify: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$router.push("/notifications");
    },
  },
};
</script>

<style scoped>
.notification-container {
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
.notification-container i {
  font-size: 24px;
}
.notification-container i:hover {
  cursor: pointer;
}
.notify::before {
  position: absolute;
  content: "";
  height: 10px;
  width: 10px;
  background-color: red;
  border-radius: 50%;
  left: 100%;
  top: 5px;
  transform: translateX(-15px);
}
</style>
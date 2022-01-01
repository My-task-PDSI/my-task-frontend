<template>
  <div class="notification-container">
    <i class="fas fa-bell"></i>
  </div>
</template>

<script>
export default {
  name: "NotificationButton",
};
</script>

<style scoped>
.notification-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border: 2px solid rgba(44, 43, 43, 0.8);
  border-radius: 10px;
  background-color: white;
}
.notification-container i {
  font-size: 24px;
}
</style>
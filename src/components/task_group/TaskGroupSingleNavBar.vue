<template>
  <div class="task-group-navbar">
    <div class="user-info">
      <div class="avatar-container">
        <div class="img-container">
          <img
            src="https://media.istockphoto.com/photos/bearded-man-is-meditating-outdoor-in-the-park-with-face-raised-up-to-picture-id1202966610?b=1&k=20&m=1202966610&s=170667a&w=0&h=iAqOeZgkfX4DlIfBl7Z_G1vpaKax4DK2ngt5vXVWpXA="
            alt="avatar"
          />
        </div>
      </div>
    </div>
    <div class="notification-container">
      <i class="fas fa-bell"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskGroupSingleNavBar",
};
</script>

<style scoped>
.task-group-navbar {
  min-height: 90px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgb(237, 236, 247);
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  flex-wrap: wrap;
}
.user-info {
  display: flex;
  width: 90px;
  height: 90px;
}
.user-info .avatar-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 90px;
}

.avatar-container .img-container {
  position: relative;
  height: 50px;
  width: 50px;
  border-radius: 10px;
  overflow: hidden;
}
.avatar-container .img-container img {
  position: absolute;
  height: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.notification-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border: 2px solid black;
  border-radius: 10px;
}
.notification-container i {
  font-size: 24px;
}
</style>
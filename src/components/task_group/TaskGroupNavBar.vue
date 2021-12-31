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
      <div class="header">
        <h1>Inicio</h1>
        <h3>{{currentDay}}</h3>
      </div>
    </div>
    <div class="search-container">
      <input type="search" name="search" placeholder="Pesquise por tarefas..." />
    </div>
    <div class="notification-container">
      <i class="fas fa-bell"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskGroupNavBar",
  data(){
    
    return {
      currentDay: (new Date()).toLocaleDateString('pt-BR',{month: 'long', day: 'numeric'})
    }
  },
};
</script>

<style scoped>
.task-group-navbar {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgb(254, 238, 233);
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}
.user-info {
  display: flex;
  width: 240px;
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
  position:relative;
  height: 50px;
  width: 50px;
  border-radius:10px;
  overflow:hidden;
}
.avatar-container .img-container img {
  position:absolute;
  height: 50px;
  top:50%;
  left:50%;
  transform : translate(-50%, -50%);
}
.user-info .header {
  width: 210px;
  height: 90px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.user-info .header > h1 {
  color: black;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
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
.search-container {
  height: 90px;
  width: calc(100% - 300px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-container input {
  height: 40px;
  width: 90%;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.2);
  background:transparent;
  font-size: 16px;
  padding-left:10px;
}
</style>
<template>
  <div class="home">
    <img src="../../assets/wallpaper.jpeg" alt="">
    <div class="landing">
      <h2>ORGANIZE SEU DIA COM O MY TASKS</h2>
      <p>O My Tasks é uma plataforma para gerenciamento de tarefas. Aqui você pode ter um melhor 
        controle sobre suas atividades de casa, tabalho e o que mais desejar. 
        Clique no botão abaixo para entrar no sistema.</p>
      <router-link to="/login"> <ButtonComp msg="Get Started"/> </router-link>
    </div>
  </div>
</template>

<script>
  import ButtonComp from '../ButtonComp.vue'
  export default {
    name:"HomePage",
    components: {
      ButtonComp
    }
  }
</script>

<style scoped>
.home {
  display: flex;
}
img {
  width: 600px;
}
.landing {
  text-align: center;
  margin: auto;
  width: 500px;
}
.landing p {
  margin: 30px;
}
</style>
<template>
  <div class="home">
    <img src="../../assets/wallpaper.jpeg" alt="">
    <div class="landing">
      <h2>ORGANIZE SEU DIA COM O MY TASKS</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum dictum tempus, interdum at dignissim metus. Ultricies.</p>
      <router-link to="/login"> <ButtonComp msg="Get Started"/> </router-link>
    </div>
  </div>
</template>

<script>
  import ButtonComp from '../ButtonComp.vue'
  export default {
    components: {
      ButtonComp
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
<template>
  <div>
    <NavBar />
    <div class="loginContainer">
      <h4 class="title">Faça login com sua conta My tasks</h4>
      <input class="username" type="email" placeholder="E-mail" v-model="userLogged.email"> <br>
      <input class="password" type="password" placeholder="Senha" v-model="userLogged.password"> <br>
      <ButtonComp msg="Fazer login" v-on:click="login"/> <br> <br>
      <span>Não possui uma conta? <router-link to="/signup"><button>Cadastre-se</button></router-link></span>
    </div>
  </div>
</template>

<script>
import NavBar from '../NavBar.vue'
import ButtonComp from '../ButtonComp.vue'

export default {
  components: {
    NavBar,
    ButtonComp
  },
  data() {
    return {
      userLogged: { email: "", password: "" }
    }
  },
  methods: {
    login() {
      if( this.userLogged.eail == "" || this.userLogged.password == "" ) {
        this.$notify({ type: "error", text: "Preencha todos os campos!" })
      }
    }
  },
}
</script>
<style scoped>
* {
  text-align: center;
}
.loginContainer {
  margin-top: 100px;
}
.title {
  margin: 20px;
  font-weight: bold;
}
input {
  text-align: left;
  border-radius: 20px;
  margin: 10px;
  background-color: #e9e9e9;
  height: 30px;
  width: 20%;
  padding: 20px;
  outline: 0;
  border: 0 none;
}

span {
  font-size: 12px;
  text-decoration: none;
}
span button {
  border: none;
  font-weight: bold;
  color: #1649FF;
  background-color: #ffff;
}

span button:hover {
  color: #5076ff;
  cursor: pointer;
}
</style>
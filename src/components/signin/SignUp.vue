<template>
  <div>
    <NavBar />
    <div class="signupContainer">
      <div class="headerMsg">
        <h4 class="title">Bem vindo(a) ao My Tasks</h4> <br>
        <span class="msg">Vamos ajudá-lo a organizar suas tarefas. <br> Cadastre-se já!</span> <br>
      </div>
      <input type="text" placeholder="Nome Completo" v-model="newUser.name"> <br>
      <input class="username" type="email" placeholder="E-mail" v-model="newUser.email"> <br>
      <input class="password" type="password" placeholder="Senha" v-model="newUser.password"> <br>
      <input class="confirmPassword" type="password" placeholder="Confirme sua senha" v-model="newUser.confirmPassword"> <br>
      <ButtonComp msg="Cadastre-se" v-on:click="signup"/> <br> <br>
      <span>Já possui uma conta? <router-link to="/login"><button>Faça login</button></router-link></span>
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
      newUser: { name: "", email: "", password: "", confirmPassword: "" }
    }
  },
  methods: {
    signup() {
      if (this.newUser.name=="" || this.newUser.email=="" ) {
        this.$notify({ type: "error", text: "Preencha os campos corretamente!" })
      } else if (this.newUser.password != this.newUser.confirmPassword) {
          this.$notify({ type: "error", text: "Senhas devem ser iguais!" })
      } else {
        this.$notify({ type: "success", text: "Cadastro realizado com sucesso!" })
      }
    }
  },
}
</script>
<style scoped>
* {
  text-align: center;
}
.signupContainer {
  margin-top: 100px;
}
.signupContainer .headerMsg {
  margin: 20px;
}
.signupContainer .headerMsg .title {
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

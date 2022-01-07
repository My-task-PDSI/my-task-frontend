<template>
  <div>
    <BaseNavBar />
    <div class="loginContainer">
      <h4 class="title">Faça login com sua conta My tasks</h4>
      <input
        class="username"
        type="text"
        placeholder="Nome de usuário"
        v-model="userLogged.username"
      />
      <br />
      <input
        class="password"
        type="password"
        placeholder="Senha"
        v-model="userLogged.password"
      />
      <br />
      <ButtonComp msg="Fazer login" v-on:click="login" /> <br />
      <br />
      <span
        >Não possui uma conta?
        <router-link to="/signup"
          ><button>Cadastre-se</button></router-link
        ></span
      >
    </div>
  </div>
</template>

<script>
import Api from "../../services/api.js";
import BaseNavBar from "../BaseNavBar.vue";
import ButtonComp from "../ButtonComp.vue";

export default {
  components: {
    BaseNavBar,
    ButtonComp,
  },
  data() {
    return {
      userLogged: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      if (this.userLogged.username == "" || this.userLogged.password == "") {
        this.$notify({ type: "error", text: "Preencha todos os campos!" });
      } else {
        console.log(this.userLogged);
        const store = this.$store;
        const response = await Api.post("user/login", this.userLogged);
        const { user, error } = response.data;

        if (response.status === 200) {
          console.log(user);
          store.commit("setUser", user);
          store.commit("setloggedIn", true);
          this.$router.push("/task-groups");
        } else {
          console.error(error);
          this.$notify({ type: "error", text: error });
          store.commit("setUser", null);
          store.commit("setloggedIn", false);
        }
      }
    },
  },
};
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
  color: #1649ff;
  background-color: #ffff;
}

span button:hover {
  color: #5076ff;
  cursor: pointer;
}
</style>
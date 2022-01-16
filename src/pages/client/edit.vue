<template>
  <div>
    <BaseNavBar bg-color="#edecf7">
    <div class="profile">
      <Avatar />
      <TheTitleAndDate :title="'Perfil'"/>
    </div>
      <div class="nav-btns">
        <HomeButton />
        <NotificationButton :notify="hasNotification" />
        <GroupsButton />
        <UserButton />
        <ChangePasswordButton />
        <LogoutButton />
      </div>
    </BaseNavBar>
    <div class="signupContainer">
      <div class="headerMsg">
        <h4 class="title">Alteração de informações</h4>
      </div>
      <input type="text" placeholder="Nome Completo" v-model="newUser.name" />
      <br />
      <input
        class="email"
        type="email"
        placeholder="E-mail"
        v-model="newUser.email"
      />
      <br />
      <input
        class="username"
        type="text"
        placeholder="Nome de usuário"
        :readonly="true"
        v-model="newUser.username"
      />
      <br />
      <Button msg="Alterar" v-on:click="alter" /> <br />
      <br />
    </div>
  </div>
</template>

<script>
import BaseNavBar from "../../components/BaseNavBar.vue";

import Avatar from "../../components/Avatar.vue";
import ChangePasswordButton from "../../components/button/ChangePasswordIcon.vue"
import Button from "../../components/button/Button.vue";
import Api from "../../services/api";
import LogoutButton from "../../components/button/LogoutButton.vue";
import HomeButton from "../../components/button/HomeButton.vue";
import NotificationButton from "../../components/button/NotificationButton.vue";
import GroupsButton from "../../components/button/GroupsButton.vue"

import TheTitleAndDate from '../../components/TheTitleAndDate.vue'

function IsEmail(email) {
  var reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
  if (reg.test(email)) {
    return true;
  }
  return false;
}
export default {
  components: {
    BaseNavBar,
    Avatar,
    ChangePasswordButton,
    GroupsButton,
    Button,
    LogoutButton,
    TheTitleAndDate,
    HomeButton,
    NotificationButton,
  },
  props: {
    title: String,
    id: Number,
    idUser: Number,
  },
  mounted: function () {
    this.getUser();
  },
  data() {
    return {
      newUser: {
        name: "",
        email: "",
        username: "",
        newPassword: "",
      },
    };
  },
  methods: {
    async getUser() {
      console.log("123333", `user/username/` + this.$store.state.user.username);
      const response = await Api.get(
        `user/username/` + this.$store.state.user.username
      );
      if (response.status === 200) {
        this.newUser.username = response.data.username;
        this.newUser.name = response.data.name;
        this.newUser.email = response.data.email;
      }
    },
    getUsername() {
      return this.$store.state.user.username;
    },

    alter() {
      if (this.newUser.name == "" || this.newUser.email == "") {
        this.$notify({
          type: "error",
          text: "Preencha os campos corretamente!",
        });
      } else if (!IsEmail(this.newUser.email)) {
        this.$notify({
          type: "error",
          text: "Digite um email valido",
        });
      } else if (this.newUser.name.length < 3) {
        this.$notify({
          type: "error",
          text: "O nome do usuário deve ter ao menos 5 caracteres",
        });
      } else if (this.newUser.username.length < 5) {
        this.$notify({
          type: "error",
          text: "O username deve ter ao menos 5 caracteres",
        });
      } else {
        Api.put("user/signup/" + this.newUser.username, this.newUser)
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              this.$notify({
                type: "success",
                text: "Cadastro realizado com sucesso!",
              });
            } else {
              console.log("TXT ", response);
              this.$notify({ type: "error", text: "Usário já existente" });
            }
          })
          .catch((error) => {
            console.log(error);
            this.$notify({ type: "error", text: "Usário já existente" });
          });
      }
    },
  },
};
</script>
<style scoped>
* {
  text-align: center;
}
.signupContainer {
  margin-top: 40px;
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
  color: #1649ff;
  background-color: #ffff;
}
.profile {
  display: flex;
}

span button:hover {
  color: #5076ff;
  cursor: pointer;
}

.task-menu-container {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding-left: 10px;
  padding-right: 10px;
}
.task-groups-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  flex-wrap: wrap;
}

.user-info {
  display: flex;
  width: 180px;
  height: auto;
}

.task-menu-container {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding-left: 10px;
  padding-right: 10px;
}
.task-groups-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  flex-wrap: wrap;
}
.task-menu-container > h3 {
  margin-right: 10px;
  word-break: break-all;
}
.user-info {
  display: flex;
  width: 180px;
  height: auto;
}
.nav-btns {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>

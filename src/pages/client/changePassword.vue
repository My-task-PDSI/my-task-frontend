<template>
  <div>
    <BaseNavBar bg-color="#edecf7">
      <Avatar />
      <div class="nav-btns">
        <HomeButton />
        <GroupsButton />
        <NotificationButton :notify="hasNotification" />
        <UserButton />
        <ChangePasswordButton />
        <LogoutButton />
      </div>
    </BaseNavBar>
    <div class="signupContainer">
      <div class="headerMsg">
        <h4 class="title">Alteração de senha</h4>
      </div>
      <input
        type="password"
        placeholder="Senha atual"
        v-model="password.actual"
      />
      <br />
      <input
        class="password"
        type="password"
        placeholder="Nova senha"
        v-model="password.newPassword"
      />
      <br />
      <input
        class="confirmPassword"
        type="password"
        placeholder="Repita a nova senha"
        v-model="password.confirmPassword"
      />
      <br />
      <Button msg="Alterar Senha" v-on:click="alter" /> <br />
      <br />
    </div>
  </div>
</template>

<script>
import BaseNavBar from "../../components/BaseNavBar.vue";

import Avatar from "../../components/Avatar.vue";
import ChangePasswordButton from "../../components/button/ChangePasswordIcon.vue";
import UserButton from "../../components/button/UserButton.vue";
import Button from "../../components/button/Button.vue";
import Api from "../../services/api";
import LogoutButton from "../../components/button/LogoutButton.vue";
import HomeButton from "../../components/button/HomeButton.vue";
import NotificationButton from "../../components/button/NotificationButton.vue";

export default {
  components: {
    BaseNavBar,
    UserButton,
    Avatar,
    ChangePasswordButton,
    Button,
    LogoutButton,
    HomeButton,
    NotificationButton,
  },
  props: {
    title: String,
    id: Number,
    idUser: Number,
  },
  data() {
    return {
      password: {
        actual: "",
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    getUsername() {
      return this.$store.state.user.username;
    },

    alter() {
      console.log("this -> ", this.password.newPassword.length);
      if (
        this.password.confirmPassword == "" ||
        this.password.actual == "" ||
        this.password.newPassword == ""
      ) {
        this.$notify({
          type: "error",
          text: "Preencha os campos corretamente!",
        });
      } else if (this.password.actual.length < 6) {
        this.$notify({
          type: "error",
          text: "Senha atual incorreta",
        });
      } else if (this.password.newPassword.length < 6) {
        this.$notify({
          type: "error",
          text: "A nova senha deve ter ao menos 6 caracteres",
        });
      } else if (this.password.confirmPassword !== this.password.newPassword) {
        this.$notify({
          type: "error",
          text: "As Senhas devem ser iguais!",
        });
      } else {
        Api.put(
          "user/signup/password/" + this.$store.state.user.username,
          this.password
        )
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              this.$notify({
                type: "success",
                text: "Senha alterada com sucesso!",
              });
            } else if (response.status == 400) {
              this.$notify({
                type: "error",
                text: "Senha atual incorreta",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            this.$notify({ type: "error", text: "Senha atual incorreta" });
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

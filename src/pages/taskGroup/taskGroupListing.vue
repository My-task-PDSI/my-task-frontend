<template>
  <div class="page-container">
    <BaseNavBar bg-color="#feeee9">
      <div class="user-info">
        <Avatar />
        <TheTitleAndDate />
      </div>
      <TheSearch @search="startSearch" />
      <HomeButton />
      <UserButton />
      <NotificationButton :notify="hasNotification" />
      <LogoutButton />
    </BaseNavBar>
    <div class="task-menu-container">
      <h3>My Tasks</h3>
      <ButtonAdd @click="createNewGroup" />
    </div>
    <div v-if="isFetchTaskGroups" class="task-groups-container">
      <h1>fetch groups</h1>
    </div>
    <div else class="task-groups-container">
      <TaskGroupCard
        v-for="group in filtredGroups"
        :id="group.id"
        :title="group.title"
        :id-user="group.idUser"
        :key="group.id"
        @remove="onRemove"
      />
    </div>
  </div>
</template>

<script>
import BaseNavBar from "../../components/BaseNavBar.vue";
import Avatar from "../../components/Avatar.vue";
import TheSearch from "../../components/TheSearch.vue";
import TheTitleAndDate from "../../components/TheTitleAndDate.vue";
import LogoutButton from "../../components/button/LogoutButton.vue";
import HomeButton from "../../components/button/HomeButton.vue";
import NotificationButton from "../../components/button/NotificationButton.vue";
import TaskGroupCard from "../../components/taskGroup/TaskGroupCard.vue";
import ButtonAdd from "../../components/button/ButtonAdd.vue";
import UserButton from "../../components/button/UserButton.vue";
import Api from "../../services/api";
export default {
  name: "taskGroupListing",

  components: {
    TaskGroupCard,
    Avatar,
    UserButton,
    BaseNavBar,
    LogoutButton,
    NotificationButton,
    TheSearch,
    TheTitleAndDate,
    ButtonAdd,
    HomeButton,
  },
  data() {
    return {
      taskGroups: [],
      hasNotification: false,
      isFetchTaskGroups: true,
      searchValue: "",
    };
  },
  computed: {
    idUser() {
      return this.$store.state.user.id;
    },
    filtredGroups() {
      const searchValue = this.searchValue.toLowerCase();
      const compare = searchValue === "";
      return this.taskGroups.filter((group) => {
        const title = group.title.toLowerCase();
        return compare || title.includes(searchValue);
      });
    },
  },
  async mounted() {
    const taskGroups = await Api.get(`task-groups/user/${this.idUser}`);
    this.taskGroups = taskGroups.data;
    this.isFetchTaskGroups = false;
    const callback = this.onNotifications.bind(this);
    this.$store.commit("replaceSocketEvent", {
      name: "notification",
      callback: callback,
    });
  },
  methods: {
    createNewGroup() {
      this.$router.push({
        name: "group",
        query: { create: true, idUser: this.idUser },
      });
    },
    onRemove(id) {
      this.taskGroups = this.taskGroups.filter((group) => group.id !== id);
    },
    startSearch(value) {
      this.searchValue = value;
    },
    onNotifications() {
      if (!this.hasNotification) {
        this.hasNotification = true;
        this.$store.commit("removeAllEvent");
      }
    },
  },
};
</script>
<style scoped>
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
</style>
<template>
<div class="page-container">
  <BaseNavBar bg-color="#feeee9">
    <div class="user-info">
      <Avatar />
      <TheTitleAndDate />
    </div>
    <Search @search="startSearch" />
    <NotificationButton />
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
import BaseNavBar from "../BaseNavBar.vue";
import Avatar from "../Avatar.vue";
import Search from "../Search.vue";
import TheTitleAndDate from "../TheTitleAndDate.vue";
import NotificationButton from "../NotificationButton.vue";
import TaskGroupCard from "./TaskGroupCard.vue";
import ButtonAdd from "../button/ButtonAdd.vue";
import Api from "../../services/api";
export default {
  name: "TaskGroupPage",

  components: {
    TaskGroupCard,
    Avatar,
    BaseNavBar,
    NotificationButton,
    Search,
    TheTitleAndDate,
    ButtonAdd,
  },
  data() {
    return {
      taskGroups: [],
      isFetchTaskGroups: true,
      searchValue: ""
    };
  },
  computed: {
    idUser(){
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
    
    console.log('group get store', this.$store.state.user);
    const taskGroups = await Api.get(`task-groups/user/${this.idUser}`);
    this.taskGroups = taskGroups.data;
    this.isFetchTaskGroups = false;
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
}
.user-info {
  display: flex;
  width: 240px;
  height: auto;
}
</style>
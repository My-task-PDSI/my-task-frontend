<template>
  <TaskGroupNavBar @start-search="startSearch" />
  <div class="task-menu-container">
    <h3>My Tasks</h3>
    <button @click="createNewGroup" class="plus-icon">
      <i class="fas fa-plus"></i>
    </button>
  </div>
  <div v-if="isFetchTaskGroups" class="task-groups-container">
    <h1>fetch groups</h1>
  </div>
  <div else class="task-groups-container">
    <TaskGroupCard
      v-for="group in filtredGroups"
      :="group"
      :key="group.propsId"
      @remove="onRemove"
    />
  </div>
</template>

<script>
import TaskGroupNavBar from "./TaskGroupNavBar.vue";
import TaskGroupCard from "./TaskGroupCard.vue";
import Api from "../../services/api";
export default {
  name: "TaskGroupPage",

  components: {
    TaskGroupNavBar,
    TaskGroupCard,
  },
  data() {
    return {
      taskGroups: [],
      isFetchTaskGroups: true,
      searchValue: "",
    };
  },
  computed: {
    filtredGroups() {
      const searchValue = this.searchValue.toLowerCase()
      const compare = searchValue===''
      return this.taskGroups.filter((group) => {
        const title = group["props-title"].toLowerCase()
        return compare || title.includes(searchValue);
      });
    },
  },
  async mounted() {
    const taskGroups = await Api.get("task-groups");
    this.taskGroups = taskGroups.data.reduce((acc, task) => {
      const newValue = Object.entries(task).reduce((acc, [key, value]) => {
        acc["props-" + key] = value;
        return acc;
      }, {});
      acc.push(newValue);
      return acc;
    }, []);
    this.isFetchTaskGroups = false;
  },
  methods: {
    createNewGroup() {
      this.$router.push({ name: "group", query: { create:true } });
    },
    onRemove(id) {
      this.taskGroups = this.taskGroups.filter(
        (group) => group["props-id"] !== id
      );
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
.task-menu-container > .plus-icon {
  border: 4px solid rgb(97, 171, 175);
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
.task-menu-container > .plus-icon i {
  font-size: 20px;
  color: rgb(97, 171, 175);
}
</style>
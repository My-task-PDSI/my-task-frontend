<template>
  <div class="task-group-container">
    <TaskGroupSingleNavBar />
    <div class="task-group-info">
      <div v-if="isEditing" class="container">
        <h1>Editando...</h1>
      </div>
      <div v-else class="container-title">
        <h1>Titulo</h1>
      </div>
    </div>
    <div class="tasks-container">
      <div class="task-info-container">
        <div class="info-title">
          <h3>Lista de tarefas</h3>
        </div>
        <button class="plus-btn">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div v-if="isFetchTasks" class="tasks-list">
        <h1>fetch tasks...</h1>
      </div>
      <div else class="tasks-list">
        <TaskCard v-for="(task, index) in tasks" :="task" :key="index" />
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from "../task/TaskCard.vue";
import TaskGroupSingleNavBar from "./TaskGroupSingleNavBar.vue";
import Api from "../../services/api";
export default {
  name: "TaskGroup",
  components: {
    TaskCard,
    TaskGroupSingleNavBar,
  },
  data() {
    return {
      id: this.$route.params.id,
      title: "",
      description: "",
      tasks: [],
      isFetchTasks: true,
      isEditing: false,
    };
  },
  async mounted() {
    if (this.id !== "new") {
      const tasks = await Api.get(`tasks?id_group=${this.id}`);
      this.tasks = tasks.data.reduce((acc, task) => {
        const newValue = Object.entries(task).reduce((acc, [key, value]) => {
          acc["props-" + key] = value;
          return acc;
        }, {});
        acc.push(newValue);
        return acc;
      }, []);
    } else {
      //this.isEditing = true;
    }
    this.isFetchTasks = false;
  },
};
</script>

<style scoped>
.task-group-container {
  width: 100%;
  min-height: 100vh;
}
.task-group-info {
  display: flex;
}
.task-group-info .container-title {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
}
.task-group-info .container-title > h1 {
  text-align: center;
  font-size: 30px;
}
.tasks-container {
  min-height: 80px;
  margin: 0 20px;
  margin-bottom: 20px;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  padding: 0 20px;
}
.task-info-container {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.plus-btn {
  border: 3px solid rgb(97, 171, 175);
  height: 35px;
  width: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}
.plus-btn > i {
  font-size: 16px;
  color: rgb(97, 171, 175);
}
</style>
<template>
  <div class="task-group-container">
    <TaskGroupSingleNavBar />
    <div class="task-group-info">
      <div v-if="isEditing" class="container">
        <TaskGroupFormEdit
          :id="id"
          :title="title"
          :description="description"
          @close="closeForm"
          @save="saveData"
        />
      </div>
      <div v-else class="container-title">
        <h1>{{ title }}</h1>
        <button @click="openForm">edit</button>
        <button @click="removeGroup">remove</button>
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
import TaskGroupFormEdit from "./TaskGroupFormEdit.vue";
import Api from "../../services/api";
import { addPrefixToObjectKey } from "../../utils";
export default {
  name: "TaskGroup",
  components: {
    TaskCard,
    TaskGroupSingleNavBar,
    TaskGroupFormEdit,
  },
  data() {
    return {
      id: -1,
      title: "",
      description: "",
      tasks: [],
      isFetchTasks: true,
      isEditing: false,
    };
  },
  methods: {
    openForm() {
      this.isEditing = true;
    },
    closeForm() {
      this.isEditing = false;
    },
    async removeGroup() {
      
    },
    async saveData(data) {
      this.title = data.title;
      this.description = data.description;
      this.isEditing = false;
      let group = null;
      if (this.id === -1) {
        this.id = 30;
        group = await Api.post("task-groups", {
          id: this.id,
          title: this.title,
          description: this.description,
        });
      } else {
        group = await Api.put(`task-groups/${this.id}`, {
          title: this.title,
          description: this.description,
        });
      }
      if(group.status===200){
        console.log('atualizado');
      }
    },
  },
  async mounted() {
    const { edit, id, create } = this.$route.query;
    this.id = create === "true" ? -1 : +id;
    this.isEditing = create === "true" || edit === "true";

    if (create !== "true" || this.id !== -1) {
      const group = await Api.get(`task-groups?id=${this.id}`);
      const [dataGroup] = group.data;
      this.id = dataGroup.id;
      this.title = dataGroup.title;
      this.description = dataGroup.description;

      const tasks = await Api.get(`tasks?id_group=${this.id}`);
      this.tasks = tasks.data.reduce((acc, task) => {
        const newValue = addPrefixToObjectKey(task);
        acc.push(newValue);
        return acc;
      }, []);
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
<template>
  <div class="task-group-container">
    <BaseNavBar bg-color="#edecf7">
      <Avatar />
      <NotificationButton />
    </BaseNavBar>
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
        <ButtonEdit @click="openForm">edit</ButtonEdit>
        <ButtonRemove @click="removeGroup">remove</ButtonRemove>
      </div>
    </div>
    <div class="tasks-container">
      <div class="task-info-container">
        <div class="info-title">
          <h3>Lista de tarefas</h3>
        </div>
        <ButtonAdd />
      </div>
      <div v-if="isFetchTasks" class="tasks-list">
        <h1>fetch tasks...</h1>
      </div>
      <div else class="tasks-list">
        <TaskCard v-for="task in tasks"
        :="task"
        :key="task.id"
        @deleted="deleteTask"/>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "../Avatar.vue";
import BaseNavBar from "../BaseNavBar.vue";
import NotificationButton from "../NotificationButton.vue";
import TaskCard from "../task/TaskCard.vue";
import TaskGroupFormEdit from "./TaskGroupFormEdit.vue";
import Api from "../../services/api";
import ButtonEdit from "../button/ButtonEdit.vue";
import ButtonRemove from "../button/ButtonRemove.vue";
import ButtonAdd from "../button/ButtonAdd.vue";
import { randint } from "../../utils";
export default {
  name: "TaskGroup",
  components: {
    Avatar,
    BaseNavBar,
    NotificationButton,
    TaskCard,
    TaskGroupFormEdit,
    ButtonAdd,
    ButtonEdit,
    ButtonRemove,
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
    async removeGroup() {},
    async deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },
    async saveData(data) {
      this.title = data.title;
      this.description = data.description;
      this.isEditing = false;
      let group = null;
      if (this.id === -1) {
        this.id = randint(0, 1000);
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
      if (group.status === 200) {
        console.log("atualizado");
      }
    },
  },
  async mounted() {
    const { edit, id, create } = this.$route.query;
    this.id = create === "true" ? -1 : +id;
    this.isEditing = create === "true" || edit === "true";

    if (create !== "true" || this.id !== -1) {
      const group = await Api.get(`task-groups/${this.id}`);
      const [dataGroup] = group.data;
      this.id = dataGroup.id;
      this.title = dataGroup.title;
      this.description = dataGroup.description;

      const tasks = await Api.get(`task-groups/tasks/${this.id}`);
      this.tasks = tasks.data;
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
  padding: 0 20px;
}
.task-group-info .container-title > h1 {
  text-align: left;
  font-size: 30px;
  flex-grow: 1;
}
.tasks-container {
  min-height: 80px;
  margin: 0 20px;
  margin-bottom: 20px;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  padding: 20px;
  padding-top: 10px;
}
.task-info-container {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
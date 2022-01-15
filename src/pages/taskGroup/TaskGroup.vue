<template>
  <div class="task-group-container">
    <BaseNavBar bg-color="#edecf7">
      <Avatar />
      <div class="nav-btns">
        <HomeButton />
        <UserButton />
        <GroupsButton />
        <NotificationButton :notify="hasNotification" />
        <LogoutButton />
      </div>
    </BaseNavBar>
    <div class="task-group-info">
      <div v-if="isEditing" class="container">
        <TaskGroupFormEdit
          :id="id"
          :title="title"
          :description="description"
          :members="members"
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
      <MemberList :member-list="members" />
      <div class="task-info-container">
        <div class="info-title">
          <h3>Lista de tarefas</h3>
        </div>
        <div class="tasks-filter">
          <label><h3>filtrar</h3></label>
          <select
            ref="selectFilter"
            name="select"
            @change="handlerOnChanceSelect"
          >
            <option value="todas" selected>todas</option>
            <option value="expiradas">expiradas</option>
            <option value="incompletas">incompletas</option>
            <option value="completas">completas</option>
          </select>
        </div>
        <ButtonAdd @click="addTask" />
      </div>
      <div v-if="isFetchTasks" class="tasks-list">
        <h1>fetch tasks...</h1>
      </div>
      <div else class="tasks-list">
        <TaskCard
          v-for="task in filtredTasks"
          :="task"
          :status="task.status"
          :key="task.id + task.status || '' + task.currentTime || ''"
          :members="members"
          @created="onCreateTask"
          @updated="updatedTask"
          @deleted="deleteTask"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "../../components/Avatar.vue";
import UserButton from "../../components/button/UserButton.vue";
import BaseNavBar from "../../components/BaseNavBar.vue";
import NotificationButton from "../../components/button/NotificationButton.vue";
import TaskCard from "../../components/task/TaskCard.vue";
import TaskGroupFormEdit from "../../components/taskGroup/TaskGroupFormEdit.vue";
import Api from "../../services/api";
import ButtonEdit from "../../components/button/ButtonEdit.vue";
import ButtonRemove from "../../components/button/ButtonRemove.vue";
import ButtonAdd from "../../components/button/ButtonAdd.vue";
import LogoutButton from "../../components/button/LogoutButton.vue";
import HomeButton from "../../components/button/HomeButton.vue";
import GroupsButton from "../../components/button/GroupsButton.vue";
import MemberList from "../../components/member/MemberList.vue";
export default {
  name: "TaskGroup",
  components: {
    Avatar,
    UserButton,
    BaseNavBar,
    NotificationButton,
    TaskCard,
    TaskGroupFormEdit,
    ButtonAdd,
    ButtonEdit,
    ButtonRemove,
    LogoutButton,
    HomeButton,
    GroupsButton,
    MemberList,
  },
  data() {
    return {
      id: -1,
      idUser: -1,
      selectedFilter: "todas",
      hasNotification: false,
      title: "",
      description: "",
      tasks: [],
      isFetchTasks: true,
      isEditing: false,
      members: [],
    };
  },
  computed: {
    filtredTasks() {
      const filtredCallback = {
        todas: () => this.tasks,
        completas: () =>
          this.tasks.filter((task) => task.status === "completed"),
        incompletas: () =>
          this.tasks.filter(
            (task) => task.status === "not-completed" || task.status === null
          ),
        expiradas: () => this.tasks.filter((task) => task.status === "blocked"),
      };
      return filtredCallback[this.selectedFilter]();
    },
  },
  methods: {
    openForm() {
      this.isEditing = true;
    },
    closeForm() {
      this.isEditing = false;
    },
    handlerOnChanceSelect() {
      this.selectedFilter = this.$refs.selectFilter.value;
    },
    async removeGroup() {
      if (this.id > -1) {
        const response = await Api.delete(`task-groups/${this.id}`);
        if (response.status === 200) {
          this.$notify({
            type: "error",
            title: "group",
            text: "grupo removido",
          });
          this.$router.replace({ name: "task-groups" });
        } else {
          this.$notify({
            type: "error",
            title: "group",
            text: "não pode ser removido",
          });
        }
      } else {
        this.$notify({
          type: "warn",
          title: "group",
          text: "esse grupo nem foi salvo",
        });
      }
    },
    async onCreateTask(newTask) {
      const newTasks = this.tasks.map((task) => {
        return task.id === -1 ? newTask : task;
      });
      this.tasks = newTasks.sort((a, b) => {
        const dateA = new Date(a.currentTime || null);
        const dateB = new Date(b.currentTime || null);
        return dateB - dateA;
      });
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    async updatedTask(data) {
      let tasks = this.tasks.map((task) => {
        if (task.id !== data.id) {
          return task;
        }
        return data;
      });
      this.tasks = tasks.sort((a, b) => {
        const dateA = new Date(a.currentTime || null);
        const dateB = new Date(b.currentTime || null);
        return dateB - dateA;
      });
    },
    async addTask() {
      if (this.id < 0) {
        return this.$notify({
          type: "error",
          title: "group",
          text: "salve o grupo para adicionar tasks",
        });
      }
      const cantAdd = this.tasks.some((task) => task.id === -1);
      if (cantAdd) {
        return this.$notify({
          type: "warn",
          title: "task",
          text: "voce nãp pode adicionar uma nova tarefa sem salvar a anterior!",
        });
      }
      const currentIsoDate = new Date().toISOString();
      const task = {
        creationDate: currentIsoDate,
        currentTime: null,
        description: "task desc 0",
        id: -1,
        idGroup: this.id,
        status: "not-completed",
        title: "task",
        updatedDate: currentIsoDate,
        edit: true,
      };
      this.tasks = [task, ...this.tasks];
    },
    async saveNewGroup() {
      let response = await Api.post("task-groups", {
        idUser: this.idUser,
        title: this.title,
        description: this.description,
      });
      if (response.status === 200) {
        this.id = response.data.id;
        this.$notify({
          type: "sucess",
          title: "group",
          text: "criado!",
        });
      } else {
        this.$notify({
          type: "error",
          title: "group",
          text: "não pode ser criado",
        });
      }
    },
    async updateGroup() {
      let response = await Api.put(`task-groups/${this.id}`, {
        title: this.title,
        description: this.description,
      });
      if (response.status === 200) {
        this.$notify({
          type: "sucess",
          title: "group",
          text: "atualizado",
        });
      }
    },
    async saveData(data) {
      this.title = data.title;
      this.description = data.description;
      this.isEditing = false;
      if (this.id === -1) {
        this.saveNewGroup();
      } else {
        this.updateGroup();
      }
    },
    onNotifications(notification) {
      const expiredTask = this.tasks.find(
        (task) => notification.idTask === task.id && task.status !== "blocked"
      );
      this.hasNotification = true;
      if (expiredTask) {
        expiredTask.status = "blocked";
        this.tasks = [...this.tasks];
        this.$notify({
          type: "error",
          title: "tarefa",
          text: notification.message,
        });
      }
    },
  },
  async mounted() {
    const { edit, id, create, idUser } = this.$route.query;
    this.id = create === "true" ? -1 : +id;
    this.idUser = idUser;
    this.isEditing = create === "true" || edit === "true";

    if (create !== "true" && this.id !== -1) {
      const response = await Api.get(`task-groups/${this.id}`);
      const { group, tasks } = response.data;
      this.id = group.id;
      this.title = group.title;
      this.description = group.description;
      this.tasks = tasks;
      this.members = [1, 2, 3, 4];
      //this.members = members;
    } else {
      this.title = "title";
      this.description = "description";
    }
    this.isFetchTasks = false;
    const callback = this.onNotifications.bind(this);
    this.$store.commit("replaceSocketEvent", {
      name: "notification",
      callback: callback,
    });
  },
};
</script>

<style scoped>
.nav-btns {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.task-group-container {
  width: 100vw;
  min-height: 100vh;
}
.task-group-info {
  display: flex;
}
.task-group-info .container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
}
.task-group-info .container-title {
  flex-wrap: wrap;
  min-height: 60px;
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
  word-break: break-all;
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
  min-height: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.info-title > h3 {
  word-break: break-all;
}
.tasks-filter {
  display: flex;
}
.tasks-filter > label {
  font-weight: bolder;
  margin-right: 10px;
}
.tasks-filter > label > h3 {
  font-weight: bolder;
}
</style>
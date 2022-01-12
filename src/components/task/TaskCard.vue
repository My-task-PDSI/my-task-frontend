<template>
  <div class="task-card">
    <TaskCardFormEdit
      v-if="isEdit"
      :id="localId"
      :title="localTitle"
      :description="localDescription"
      :currentTime="localCurrentTime"
      :status="localStatus"
      :status-checked="isChecked"
      :status-blocked="isBlocked"
      :members="members"
      @save="onSave"
      @close="onClose"
    />
    <div v-else class="task-container">
      <TheCheckBox
        :checked="isChecked"
        :blocked="isBlocked"
        :disable-on-click="true"
      />
      <div class="task-title-container">
        <h3 for="title">{{ localTitle }}</h3>
      </div>
      <div v-if="localCurrentTime" class="task-time-container">
        <h3 for="time">as {{ getTime }}</h3>
      </div>
      <div v-if="localCurrentTime" class="task-time-container">
        <h3 for="time">em {{ getDate }}</h3>
      </div>
      <div class="buttons">
        <ButtonEdit @click="goEdit">edit</ButtonEdit>
        <ButtonRemove @click="removeTask">remove</ButtonRemove>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonEdit from "../button/ButtonEdit.vue";
import ButtonRemove from "../button/ButtonRemove.vue";
import TheCheckBox from "../TheCheckBox.vue";
import TaskCardFormEdit from "./TaskCardFormEdit.vue";
import Api from "../../services/api";
export default {
  name: "Task",
  components: {
    ButtonEdit,
    ButtonRemove,
    TheCheckBox,
    TaskCardFormEdit,
  },
  emits: ["deleted", "created", "updated"],
  props: {
    id: Number,
    idGroup: Number,
    title: String,
    description: String,
    creationDate: String,
    updatedDate: String,
    edit: {
      type: Boolean,
      default: false,
    },
    currentTime: {
      type: String,
      default: "",
      required: false,
    },
    status: {
      type: String,
      default: "not-completed",
      required: false,
    },
    members:Array
  },
  data() {
    return {
      isEdit: this.edit,
      localId: this.id,
      localTitle: this.title,
      localDescription: this.description,
      localCurrentTime: this.currentTime ?? "",
      localStatus: this.status ?? "not-completed",
    };
  },
  computed: {
    isChecked() {
      return this.localStatus === "completed" || this.isBlocked;
    },
    isBlocked() {
      return this.localStatus === "blocked";
    },
    getDate() {
      const date = new Date(this.localCurrentTime);
      const stringDate = date.toLocaleDateString();
      return stringDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$1 / $2/ $3");
    },
    getTime() {
      const date = new Date(this.localCurrentTime);
      const time = date.toLocaleTimeString().slice(0, 5);
      return time;
    },
  },
  methods: {
    async removeTask() {
      if (this.localId !== -1) {
        const response = await Api.delete(`task/${this.localId}`);
        if (response.status === 200) {
          this.$notify({
            type: "sucess",
            title: "task",
            text: "task removida",
          });
        } else {
          this.$notify({
            type: "error",
            title: "task",
            text: "a task nao pode ser removida",
          });
        }
      } else {
        this.$notify({
          type: "sucess",
          title: "task",
          text: "task removida",
        });
      }
      this.$emit("deleted", this.localId);
      
    },
    goEdit() {
      this.isEdit = true;
    },
    async onSave(data) {
      this.localTitle = data.title;
      this.localDescription = data.description;
      this.localCurrentTime = data.currentTime;
      this.localStatus = data.status;

      if (this.localId === -1) {
        await this.createTask();
      } else {
        await this.updateTask();
      }
      this.isEdit = false;
    },
    async createTask() {
      const response = await Api.post("task", {
        task: {
          title: this.localTitle,
          idGroup: this.idGroup,
          description: this.localDescription,
          status: this.localStatus,
          currentTime: this.localCurrentTime,
        },
      });
      if (response.status === 200) {
        this.localId = response.data.id;
        this.$notify({
          type: "sucess",
          title: "task",
          text: "task criada",
        });
        this.$emit("created", {
          id:this.localId,
          title: this.localTitle,
          idGroup: this.idGroup,
          description: this.localDescription,
          status: this.localStatus,
          currentTime: this.localCurrentTime
          });
      } else {
        this.$notify({
          type: "error",
          title: "task",
          text: "a tarefa não pode ser salva",
        });
      }
    },
    async updateTask() {
      const response = await Api.put("task", {
        task: {
          id: this.localId,
          title: this.localTitle,
          idGroup: this.idGroup,
          description: this.localDescription,
          status: this.localStatus,
          currentTime: this.localCurrentTime,
        },
      });
      if (response.status === 200) {
        this.$notify({
          type: "sucess",
          title: "task",
          text: "task atualizada",
        });
        this.$emit("updated",{
          id: this.localId,
          title: this.localTitle,
          idGroup: this.idGroup,
          description: this.localDescription,
          status: this.localStatus,
          currentTime: this.localCurrentTime,
        },);
      } else {
        this.$notify({
          type: "error",
          title: "task",
          text: "a tarefa não pode ser salva",
        });
      }
    },
    onClose() {
      this.isEdit = false;
    },
  },
};
</script>

<style scoped>
.task-container {
  min-height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.task-title-container {
  flex-grow: 1;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
}
h3 {
  word-wrap: break-word;
  overflow: hidden;
}
.task-title-container > h3 {
  justify-self: flex-end;
  max-width: 30ch;
}
.task-time-container {
  margin-right: 10px;
}
</style>
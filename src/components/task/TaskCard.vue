<template>
  <div class="task-card">
    <TaskCardFormEdit
      v-if="isEdit"
      :id="localId"
      :title="localTitle"
      :description="localDescription"
      :time="localTime"
      @save="onSave"
      @close="onClose"
    />
    <div v-else class="task-container">
      <TheCheckBox :status="isCompleted" :checkmark="isBlocked" />
      <div class="task-title-container">
        <h3 for="title">{{ localTitle }}</h3>
      </div>
      <div class="task-time-container">
        <h3 for="time">as {{ getTime }}</h3>
      </div>
      <div class="task-time-container">
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
import { randint } from "../../utils";
export default {
  name: "Task",
  components: {
    ButtonEdit,
    ButtonRemove,
    TheCheckBox,
    TaskCardFormEdit,
  },
  emits: ["deleted"],
  props: {
    id: Number,
    idGroup: Number,
    title: String,
    description: String,
    creationDate: String,
    status: {
      type: String,
      default: "not-completed",
    },
  },
  data() {
    return {
      isEdit: false,
      localId: this.id,
      localTitle: this.title,
      localDescription: this.description,
      localTime: this.creationDate,
      localStatus: this.status,
    };
  },
  computed: {
    isCompleted() {
      return this.localStatus === "completed";
    },
    isBlocked() {
      return this.localStatus !== "blocked";
    },
    formatedTime() {
      const time = this.localTime;
      return time.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
    },
    getDate() {
      const time = this.localTime;
      return time.replace(/(\d{4})-(\d{2})-(\d{2}).*/, "$3 / $2 / $1");
    },
    getTime() {
      const time = this.localTime;
      return time.replace(/.*T(.{5}).*/, "$1");
    },
  },
  methods: {
    async removeTask() {
      const response = await Api.delete(`tasks/${this.localId}`);
      if (response.status === 200) {
        console.log("task removida");
      }
      this.$emit("deleted", this.localId);
    },
    goEdit() {
      this.isEdit = true;
    },
    async onSave(data) {
      this.localTitle = data.title;
      this.localDescription = data.description;
      this.localTime = data.time;
      this.isEditing = false;
      let task = null;

      if (this.localId === -1) {
        this.localId = randint(0, 1000);
        task = await Api.post("tasks", {
          id: this.localId,
          id_group: this.idGroup,
          title: this.localTitle,
          description: this.localDescription,
          time: this.localTime,
        });
      } else {
        task = await Api.put(`tasks/${this.localId}`, {
          title: this.localTitle,
          id_group: this.idGroup,
          description: this.localDescription,
          time: this.localTime,
        });
      }
      if (task.status === 200) {
        console.log("task atualizada");
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
<template>
  <div class="task-card">
    <div v-if="isEdit" class="form-container">
      <form>
        <div class="task-title-container">
          <label for="title">Title</label>
          <input type="text" name="title" :value="title" />
        </div>
        <div class="task-description-container">
          <label for="description">Description</label>
          <textarea
            name="description"
            id=""
            cols="30"
            rows="10"
            :value="description"
          ></textarea>
          <button @click="onSave">Save</button>
          <button @click="onClose">Close</button>
        </div>
        <div class="task-time-container">
          <label for="time">Time</label>
          <input type="datetime-local" name="time" :value="time" />
        </div>
      </form>
    </div>
    <div v-else class="task-container">
      <TheCheckBox :status="isCompleted" :checkmark="isBlocked" />
      <div class="task-title-container">
        <h3 for="title">{{ title }}</h3>
      </div>
      <div class="task-time-container">
        <h3 for="time">as {{ getTime }}</h3>
      </div>
      <div class="task-time-container">
        <h3 for="time">em {{ getDate }}</h3>
      </div>
      <div class="icons-button">
        <ButtonEdit @click="toogleEdit">edit</ButtonEdit>
        <ButtonRemove @click="removeTask">remove</ButtonRemove>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonEdit from "../button/ButtonEdit.vue";
import ButtonRemove from "../button/ButtonRemove.vue";
import TheCheckBox from "../TheCheckBox.vue";
export default {
  name: "Task",
  components: {
    ButtonEdit,
    ButtonRemove,
    TheCheckBox,
  },
  props: {
    id: Number,
    idGroup: Number,
    title: String,
    description: String,
    time: String,
    status: {
      type: String,
      default: "not-completed",
    },
  },
  computed: {
    isCompleted() {
      return this.status === "completed";
    },
    isBlocked() {
      return this.status !== "blocked";
    },
    formatedTime() {
      const time = this.time;
      return time.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
    },
    getDate() {
      const time = this.time;
      return time.replace(/(\d{4})-(\d{2})-(\d{2}).*/, "$3 / $2 / $1");
    },
    getTime() {
      const time = this.time;
      return time.replace(/.*T(.*)/, "$1");
    },
  },
  data() {
    return {
      isEdit: false,
    };
  },
  methods: {
    removeTask() {},
    toogleEdit() {
      this.isEdit = !this.isEdit;
    },
    onSave(event) {
      event.preventDefault();
    },
    onClose(event) {
      event.preventDefault();
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
.icons-button {
  display: flex;
  justify-self: flex-end;
}
</style>
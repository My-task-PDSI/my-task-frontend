<template>
  <div class="form-container">
    <form ref="formdata">
      <div class="input-container">
        <label for="title">Title</label>
        <input type="text" name="title" :value="title" />
      </div>
      <div class="input-container container-status">
        <label>Status:</label>
        <TheCheckBox
          :box-size="30"
          :mark-size="20"
          @toogle-status="toogleStatus"
          :checked="statusChecked"
          :blocked="statusBlocked"
        />
      </div>
      <div class="input-container">
        <label for="description">Description</label>
        <textarea
          name="description"
          cols="30"
          rows="10"
          :value="description"
        ></textarea>
      </div>
      <div class="input-container">
        <label for="time">Time</label>
        <input type="datetime-local" name="time" :value="dateTimeFormat" />
      </div>

      <div class="button-container">
        <button @click="onSave" class="btn">Save</button>
        <button @click="onClose" class="btn">Close</button>
        <button @click="removeCurrentTime" class="btn">remove time</button>
      </div>
    </form>
  </div>
</template>

<script>
import TheCheckBox from "../TheCheckBox.vue";
export default {
  name: "TaskCardFormEdit",
  components: {
    TheCheckBox,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    currentTime: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    statusChecked: {
      type: Boolean,
      default: false,
    },
    statusBlocked: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["save", "close"],
  data() {
    return {
      localCurrentTime: this.currentTime,
      localStatus: this.status,
    };
  },
  computed: {
    dateTimeFormat() {
      if (!this.localCurrentTime) return "";
      const date = new Date(this.localCurrentTime);
      const datetime = date.toLocaleString();
      return datetime
        .slice(0, 16)
        .replace(/(\d{2})\/(\d{2})\/(\d{4}).{1}(.*)/, "$3-$2-$1T$4");
    },
  },
  methods: {
    toogleStatus() {
      const isCompleted = this.localStatus === "completed";
      this.localStatus = isCompleted ? "not-completed" : "completed";
    },
    onSave(event) {
      event.preventDefault();
      const formdata = this.$refs.formdata;
      const data = {
        title: formdata.title.value,
        description: formdata.description.value,
        currentTime: formdata.time.value ? formdata.time.value : null,
        status: this.localStatus,
      };
      this.$emit("save", data);
    },
    removeCurrentTime(event) {
      event.preventDefault();
      const formdata = this.$refs.formdata;
      this.localCurrentTime = "";
      formdata.time.value = "";
    },
    onClose(event) {
      event.preventDefault();
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.form-container {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}
.form-container form {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: left;
}
.input-container {
  display: flex;
  justify-content: left;
  flex-direction: column;
  align-items: left;
}
.input-container > label {
  font-weight: bolder;
  letter-spacing: 1.5px;
}
.input-container > input {
  height: 40px;
  border-radius: 10px;
  padding-left: 10px;
  border-width: 1px;
  border-style: solid;
}
.input-container > input:focus,
.input-container > textarea:focus {
  outline-color: rgb(97, 171, 175);
}
.container-status {
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 50px;
  align-items: center;
}
.container-status > label {
  width: 80px;
  text-align: left;
}
.button-container {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.btn {
  height: 30px;
  min-width: 120px;
  border-style: none;
  border-radius: 10px;
  background-color: rgb(97, 171, 175);
  font-size: 18px;
  font-weight: bolder;
  color: rgba(255, 255, 255, 0.904);
}
</style>
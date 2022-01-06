<template>
  <div class="form-container">
    <form ref="formdata">
      <div class="input-container">
        <label for="title">Title</label>
        <input type="text" name="title" :value="title" />
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
      <div v-if="enableTimeInput" class="input-container">
        <label for="time">Time</label>
        <input type="datetime-local" name="time" :value="dateTimeFormat" />
      </div>

      <div class="button-container">
        <button @click="onSave" class="btn">Save</button>
        <button @click="onClose" class="btn">Close</button>
        <button @click="toogleEditTime" class="btn">{{textBtnTime}}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "TaskCardFormEdit",
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
  },
  emits: ["save", "close", "toogleEditTime"],
  data() {
    return {
      enableTimeInput: false,
      textBtnTime: 'Edit time',
    };
  },
  computed: {
    dateTimeFormat() {
      if(!this.currentTime) return '';
      const date = new Date(this.currentTime);
      const datetime = date.toLocaleString();
      return datetime.slice(0, 16).replace(/(\d{2})\/(\d{2})\/(\d{4}).{1}(.*)/,'$3-$2-$1T$4');
    },
  },
  methods: {
    onSave(event) {
      event.preventDefault();
      const formdata = this.$refs.formdata;
      const data = {
        title: formdata.title.value,
        description: formdata.description.value,
        currentTime: (this.enableTimeInput && formdata.time.value)? formdata.time.value : null,
      };
      this.$emit("save", data);
    },
    onClose(event) {
      event.preventDefault();
      this.$emit("close");
    },
    toogleEditTime(event) {
      event.preventDefault();
      this.textBtnTime = (this.enableTimeInput) ? 'Edit time':'Remove time';
      this.enableTimeInput = !this.enableTimeInput;
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
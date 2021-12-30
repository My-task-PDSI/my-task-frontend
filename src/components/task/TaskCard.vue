<template>
  <div class="task-card">
    <h1>{{ $options.name }} {{propsId}}</h1>
    <button @click="toogleEdit">edit</button>
    <button @click="removeTask">remove</button>
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
        </div>
        <div class="task-time-container">
          <label for="time">Time</label>
          <input type="datetime-local" name="time" :value="time" />
        </div>
      </form>
    </div>
      <div v-else class="task-container">
        <div class="task-title-container">
          <h3 for="title">Title: {{propsTitle}}</h3>
        </div>
        <div class="task-description-container">
          <h3 for="description">Description: {{propsDescription}}</h3>
        </div>
        <div class="task-time-container">
          <h3 for="time">Time: {{formatedTime}}</h3>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: {
    propsId: Number,
    propsId_group: Number,
    propsTitle: String,
    propsDescription: String,
    propsTime: String,
  },
  computed:{
    formatedTime(){
      const time = this.time;
      return time.replace(/(\d{4})-(\d{2})-(\d{2})/,'$3/$2/$1')
    }
  },
  data() {
    return {
      isEdit: false,
      title: this.propsTitle,
      description: this.propsDescription,
      time: this.propsTime,
    };
  },
  methods: {
    toogleEdit() {
      this.isEdit = !this.isEdit;
    },
  },
};
</script>

<style scoped>
</style>
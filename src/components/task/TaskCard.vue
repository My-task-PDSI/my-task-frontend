<template>
  <h1>{{ $options.name }}</h1>
  <button @click="toogleEdit">edit</button>
  <form v-if="isEdit">
    <div class="task-title-container">
      <label for="title">Title</label>
      <input type="text" name="title" :value="title" />
    </div>
    <div class="task-description-container">
      <label for="description">Description</label>
      <textarea name="description" id="" cols="30" rows="10"></textarea>
    </div>
    <div class="task-time-container">
      <label for="time">Time</label>
      <input type="datetime" name="time" />
    </div>
  </form>
  <div v-else class="task-container">
    <div class="task-title-container">
      <h3 for="title">Title</h3>
    </div>
    <div class="task-description-container">
      <h3 for="description">Description</h3>
    </div>
    <div class="task-time-container">
      <h3 for="time">Time</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: {
    propsTitle: String,
    propsDescription: String,
    propsTime: String,
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
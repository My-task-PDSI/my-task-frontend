<template>
  <h1>{{ $options.name }}</h1>
  <h1 v-if="isFetchTasks">fetch tasks...</h1>
  <div else  class="tasks">
    <TaskCard v-for="(task, index) in tasks" :="task" :key="index" />
  </div>
</template>

<script>
//
import TaskCard from "../task/TaskCard.vue";
import { Api } from "../../services/api";
export default {
  name: "TaskGroup",
  props: {
    idGroup: String,
  },
  components: {
    TaskCard,
  },
  data() {
    return { tasks: [], isFetchTasks: true };
  },
  async mounted() {
    console.log(this.tasks);
    const tasks = await Api.get(`tasks?id_group=${this.idGroup}`);
    this.tasks = tasks.data.reduce((acc, task) => {
      const newValue = Object.entries(task).reduce((acc, [key, value]) => {
        acc["props-" + key] = value;
        return acc;
      }, {});
      acc.push(newValue);
      return acc;
    }, []);
    console.log("teste", this.tasks);
    this.isFetchTasks = false;
  },
};
</script>

<style>
</style>
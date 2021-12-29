<template>
  <h1>{{$options.name}}</h1>
  <TaskCard />
</template>

<script>
import TaskCard from '../task/TaskCard.vue';
export default {
    name:'TaskGroup',
    components:{
        TaskCard
    }
}
</script>

<style>

</style>
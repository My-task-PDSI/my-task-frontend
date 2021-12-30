<template>
  <h1>{{$options.name}}</h1>
  <TaskGroup id-group="1"/>
</template>

<script>
import TaskGroup from './TaskGroup.vue';
export default {
    name:'TaskGroupPage',
    
    components:{
        TaskGroup
    }
}
</script>

<style>

</style>
<template>
  <div class="task-group-card">
    <div class="task-rect"></div>
    <div class="task-info-container">
      <h3>{{ propsTitle }}</h3>
    </div>
    <div class="task-icons-container">
      <i class="far fa-edit"></i>
      <i class="far fa-trash-alt"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskGroupCard",
  props: {
    propsTitle: String,
    propsId: Number,
    propsDescription: String,
  },
};
</script>

<style scoped>
.task-group-card {
  width: 300px;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  margin: 20px;
  border-bottom: 4px solid rgb(203, 201, 212);
}
.task-rect {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  background-color: rgba(108, 13, 163, 0.336);
}
.task-icons-container{
  width: 50px;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.task-icons-container > i{
  font-size: 20px;
  color:rgb(97, 171, 175);
}
.task-info-container{
  width: 140px;
  height: 90px;
}
</style>
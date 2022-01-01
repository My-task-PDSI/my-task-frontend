<template>
  <div class="form-container">
    <form ref="formdata">
      <div class="input-container">
        <label for="title">Titulo:</label>
        <input name="title" type="text">
      </div>
      <div class="input-container">
        <label for="description">Descrição: </label>
        <textarea name="description" cols="30" rows="10"></textarea>
      </div>
      <div class="input-container">
        <label for=""></label>
        <input type="text">
      </div>
      <button>Save</button>
      <button>Close</button>
    </form>
  </div>
</template>

<script>
//import Api from "../../services/api";
export default {
  name: "TaskGroupFormEdit",
  props:{
    id:{
      type:Number,
      required:true
    },
    title:{
      type: String,
      required:true
    },
    description:{
      type:String,
      required:true
    }
  },
  methods:{
    onSave(){
      console.log(this.$refs.formdata.title)
    }
  },
};
</script>

<style scoped>
.task-group-container {
  width: 100%;
  min-height: 100vh;
}
.task-group-info {
  display: flex;
}
.task-group-info .container-title {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
}
.task-group-info .container-title > h1 {
  text-align: center;
  font-size: 30px;
}
.tasks-container {
  min-height: 80px;
  margin: 0 20px;
  margin-bottom: 20px;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  padding: 0 20px;
}
.task-info-container {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.plus-btn {
  border: 3px solid rgb(97, 171, 175);
  height: 35px;
  width: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}
.plus-btn > i {
  font-size: 16px;
  color: rgb(97, 171, 175);
}
</style>
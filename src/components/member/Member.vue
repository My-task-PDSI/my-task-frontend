<template>
  <div class="member-container">
    <div class="img-container no-user-select">
    <h3>{{username[0]}}</h3>
    </div>
    <h3>{{email}}</h3>
    <h3>convidado</h3>
  </div>
</template>

<script>
export default {
  name: "Member",
  props:{
    username:String,
    email:String,
  },
  methods: {
    
  },
};
</script>

<style scoped>
.member-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  min-width: 50px;
  margin:5px;
}
.img-container{
  height: 30px;
  width: 30px;
  display: flex;
  justify-content:center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  background-color:rgb(0, 174, 255);
}
.img-container > h3{
  font-weight: bolder;
  color:white;
}
.member-container > h3{
  height: 30px;
  margin-left:10px;
}
</style>
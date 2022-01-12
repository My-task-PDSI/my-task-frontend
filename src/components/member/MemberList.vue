<template>
 <div class="member-list-container">
    <div class="controles">
    <div class="title">
      <h3>Membros</h3>
    </div>
    <div class="eye-container no-user-select" @click="toogleVisibilty">
      <i v-if="visible" class="fas fa-eye"></i>
      <i v-else class="fas fa-eye-slash"></i>
    </div>
    </div>
    <div v-if="visible" class="member-list">
    <Member
      v-for="item in memberList"
      :key="item"
      :username="'teste'"
      :email="'teste@gmail.com'"
    />
    </div>
  </div>
</template>

<script>
import Member from "./Member.vue";
export default {
  name: "MemberList",
  components:{
    Member
  },
  props:{
    username:String,
    email:String,
    memberList:Array
  },
  data(){
    return {
      visible:false,
      };
  },
  methods: {
    toogleVisibilty(){
this.visible = !this.visible;
    }
  },
};
</script>

<style scoped>
.member-list-container {
  width: 100%;
  display: flex;
  flex-direction:column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 10px;
}
.member-list{
  padding-left: 15px;
}
.controles{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap:10px;
}
.eye-container{
  font-size: 24px;
}
</style>
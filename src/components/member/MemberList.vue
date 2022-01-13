<template>
 <div class="member-list-container">
    <div class="controles">
    <div class="title">
      <h3>Membros</h3>
    </div>
    <div class="eye-container no-user-select" @click="toogleVisibilty">
      <i v-if="membersGroupVisible" class="fas fa-eye"></i>
      <i v-else class="fas fa-eye-slash"></i>
    </div>
    <div class="addMemberBtn">
      <button @click="addMemberModal">Add Member</button>
    </div>
    </div>
    <div v-if="membersGroupVisible" class="member-list">
    <Member
      v-for="item in memberList"
      :key="item"
      :username="'teste'"
      :email="'teste@gmail.com'"
    />
    </div>
    <div v-if="membersAvailableVisible" class="member-list">
      <MembersAvailable
      v-for="item in memberList"
      :key="item"
      :username="item.username"
      :email="item.email"
    />
    </div>
  </div>
</template>

<script>
import Api from '../../services/api';
import Member from "./Member.vue";
import MembersAvailable from "./MermbersAvailable.vue"
export default {
  name: "MemberList",
  components:{
    Member,
    MembersAvailable
  },
  props:{
    username:String,
    email:String,
    memberList:Array,
    membersAvailableList:Array
  },
  data(){
    return {
      membersGroupVisible:false,
      membersAvailableVisible: false
      };
  },
  methods: {
    toogleVisibilty(){
      this.membersGroupVisible = !this.membersGroupVisible;
    },
    async addMemberModal(){
        const response = await Api.get("user/all/1");
        console.log(response.data.allUsers)
        this.$memberList = response.data.allUsers
        this.membersAvailableVisible = !this.membersAvailableVisible;
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
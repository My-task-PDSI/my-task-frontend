<template>
  <div @click="openGroup" class="task-group-card">
    <div class="task-rect"></div>
    <div class="task-info-container">
      <h3>{{ title }}</h3>
    </div>
    <div class="task-icons-container">
      <ButtonEdit @click="editGroup" />
      <ButtonRemove @click="removeGroup" />
    </div>
  </div>
</template>

<script>
import Api from "../../services/api";
import ButtonEdit from "../button/ButtonEdit.vue";
import ButtonRemove from "../button/ButtonRemove.vue";

export default {
  name: "TaskGroupCard",
  components: {
    ButtonEdit,
    ButtonRemove,
  },
  props: {
    title: String,
    id: Number,
    idUser: Number,
  },
  emits: ["remove"],
  methods: {
    async removeGroup(event) {
      event.stopPropagation();
      const response = await Api.delete(`task-groups/${this.id}`);
      if (response.status === 200) {
        this.$emit("remove", this.id);
      }
    },
    async editGroup() {
      this.$router.push({
        name: "group",
        query: { id: this.id, edit: true, idUser: this.idUser },
      });
    },
    async openGroup() {
      this.$router.push({
        name: "group",
        query: { id: this.id, edit: false, idUser: this.idUser },
      });
    },
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
.task-icons-container {
  width: 50px;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.task-info-container {
  width: 140px;
  height: 90px;
}
</style>
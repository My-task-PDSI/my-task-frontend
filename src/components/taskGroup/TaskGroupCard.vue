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
        this.$notify({
          type: "sucess",
          title: "group",
          text: "removido com sucesso",
        });
      } else {
        this.$notify({
          type: "error",
          title: "group",
          text: "nao pode ser removido",
        });
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
  max-width: 300px;
  min-height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  margin: 20px;
  flex-wrap: wrap;
  border-bottom: 4px solid rgb(203, 201, 212);
}
.task-rect {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: rgba(108, 13, 163, 0.336);
}
.task-icons-container {
  min-width: 50px;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.task-info-container {
  max-width: 20ch;
  min-height: 30px;
  padding: 10px;
  word-break: break-all;
}
</style>
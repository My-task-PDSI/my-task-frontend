<template>
  <div class="form-container">
    <form ref="formdata">
      <div class="input-container">
        <label for="title">Titulo:</label>
        <input name="title" :value="title" type="text" />
      </div>
      <div class="input-container">
        <label for="description">Descrição: </label>
        <textarea
          name="description"
          cols="30"
          rows="10"
          :value="description"
        ></textarea>
      </div>

      <div class="button-container">
        <button @click="onSave" class="btn">Save</button>
        <button @click="onClose" class="btn">Close</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "TaskGroupFormEdit",

  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  emits: ["save", "close"],
  methods: {
    isValidTitle(title) {
      const TITLE_LENGTH = 20;
      return title.length <= TITLE_LENGTH;
    },
    isValidDescription(description) {
      const DESCRIPTION_LENGTH = 50;
      return description.length <= DESCRIPTION_LENGTH;
    },
    onSave(event) {
      event.preventDefault();
      const formdata = this.$refs.formdata;
      const data = {
        title: formdata.title.value,
        description: formdata.description.value,
      };
      if (!data.title) {
        this.$notify({
          type: "error",
          title: "group",
          text: "informe um titulo para o grupo",
        });
      } else if (!this.isValidTitle(data.title)) {
        this.$notify({
          type: "error",
          title: "group",
          text: "titulo so pode ter 20 caracteres",
        });
      } else if (!this.isValidDescription(data.description)) {
        this.$notify({
          type: "error",
          title: "group",
          text: "descricao so pode ter 50 caracteres",
        });
      }else{
        this.$emit("save", data);
      }
    },
    onClose(event) {
      event.preventDefault();
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.form-container {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}
.form-container form {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: left;
}
.input-container {
  display: flex;
  justify-content: left;
  flex-direction: column;
  align-items: left;
}
.input-container > label {
  font-weight: bolder;
  letter-spacing: 1.5px;
}
.input-container > input {
  height: 40px;
  border-radius: 10px;
  padding-left: 10px;
  border-width: 1px;
  border-style: solid;
}
.input-container > input:focus,
.input-container > textarea:focus {
  outline-color: rgb(97, 171, 175);
}
.button-container {
  width: 100%;
  min-height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
  margin-top: 10px;
}
.btn {
  height: 30px;
  width: 80px;
  border-style: none;
  border-radius: 10px;
  background-color: rgb(97, 171, 175);
  font-size: 18px;
  font-weight: bolder;
  color: rgba(255, 255, 255, 0.904);
}
</style>
<template>
  <button>{{ msg }}</button>
</template>

<script>
export default {
  name: "Button",
  props: { msg: String },
};
</script>

<style scoped>
button {
  background-color: #1649ff;
  color: #ffffff;
  padding: 10px;
  font-weight: bold;
  border-radius: 50px;
  border: 0 none;
}
button:hover {
  background-color: #5076ff;
  cursor: pointer;
}
</style>
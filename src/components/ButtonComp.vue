<template>
    <button>{{ msg }}</button>
</template>

<script>
export default {
    name: 'ButtonComp',
    props: { msg: String }
}
</script>

<style scoped>
button {
  background-color: #1649FF;
  color: #FFFFFF;
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
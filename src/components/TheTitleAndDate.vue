<template>
  <div class="header">
    <h1>{{ title }}</h1>
    <h3>{{ currentDay }}</h3>
  </div>
</template>

<script>
export default {
  name: "TheTitleAndDate",
  props: {
    title: {
      type: String,
      default: "Inicio",
    },
  },
  data() {
    return {
      currentDay: new Date().toLocaleDateString("pt-BR", {
        month: "long",
        day: "numeric",
      }),
    };
  },
};
</script>

<style scoped>
.header {
  width: 210px;
  height: auto;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.header > h1 {
  color: black;
  font-size: 24px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
<template>
  <div class="search-container">
    <input
      @search="onSearch"
      autocomplete="off"
      type="search"
      name="search"
      placeholder="Pesquise por tarefas..."
    />
  </div>
</template>

<script>
export default {
  name: "TheSearch",
  emits: ["search"],
  methods: {
    onSearch(event) {
      this.$emit("search", event.target.value);
    },
  },
};
</script>

<style>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: 100%;
  padding: 10px 0;
}
.search-container input {
  height: 40px;
  width: 90%;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: transparent;
  font-size: 16px;
  padding: 0 10px;
}
</style>
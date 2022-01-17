<template>
  <button class="btn-icon">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButtonIcon",
  props: {
    size: {
      type: String,
      default: "20px",
    },
  },
};
</script>

<style scoped>
.btn-icon {
  background-color: transparent;
  border: none;
  margin: 5px;
}
.btn-icon :slotted(i) {
  font-size: v-bind(size);
  color: rgb(97, 171, 175);
}
.btn-icon:hover {
  cursor: pointer;
}
</style>
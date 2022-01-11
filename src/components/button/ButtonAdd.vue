<template>
  <BaseButtonIcon size="16px">
    <div class="plus-btn">
      <i class="fas fa-plus"></i>
    </div>
  </BaseButtonIcon>
</template>

<script>
import BaseButtonIcon from "./BaseButtonIcon.vue";
export default {
  name: "ButtonEdit",
  components: {
    BaseButtonIcon,
  },
};
</script>

<style scoped>
.plus-btn {
  border: 3px solid rgb(97, 171, 175);
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}
</style>
<template>
  <div @click="onClick" class="checkbox no-user-select" ref="checkbox">
    <div v-if="isChecked">
      <span v-if="blocked" class="x-check"> &#10005; </span>
      <span v-else class="v-check"> &#10003; </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheCheckBox",
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { isChecked: this.checked || this.blocked };
  },
  methods: {
    onClick() {
      if(!this.blocked){
        this.isChecked = !this.isChecked;
      }
    },
  },
};
</script>

<style scoped>
.checkbox {
  height: 40px;
  width: 40px;
  border: 3px solid rgba(0, 0, 0, 0.74);
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-check,
.x-check {
  font-size: 30px;
  color: green;
  font-weight: bolder;
}
.x-check {
  color: rgba(255, 0, 0, 0.726);
}
</style>
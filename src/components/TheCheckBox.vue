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
    boxSize: {
      type: Number,
      default: 40,
    },
    markSize: {
      type: Number,
      default: 40,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    disableOnClick: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toogleStatus"],
  data() {
    return { isChecked: this.checked || this.blocked };
  },
  methods: {
    onClick() {
      if (!this.blocked && !this.disableOnClick) {
        this.isChecked = !this.isChecked;
        this.$emit("toogleStatus", this.isChecked);
      }
    },
  },
};
</script>

<style scoped>
.checkbox {
  height: calc(v-bind(boxSize) * 1px);
  width: calc(v-bind(boxSize) * 1px);
  border: 3px solid rgba(0, 0, 0, 0.74);
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-check,
.x-check {
  font-size: calc(v-bind(markSize) * 1px);
  color: green;
  font-weight: bolder;
}
.x-check {
  color: rgba(255, 0, 0, 0.726);
}
</style>
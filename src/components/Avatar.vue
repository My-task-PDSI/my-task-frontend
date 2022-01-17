<template>
  <div class="avatar-container">
    <div class="img-container">
      <img
        src="https://media.istockphoto.com/photos/bearded-man-is-meditating-outdoor-in-the-park-with-face-raised-up-to-picture-id1202966610?b=1&k=20&m=1202966610&s=170667a&w=0&h=iAqOeZgkfX4DlIfBl7Z_G1vpaKax4DK2ngt5vXVWpXA="
        alt="avatar"
        @click="clickMethod"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  methods: {
    clickMethod() {
      this.$router.push("/task-groups");
    },
  },
};
</script>

<style scoped>
.avatar-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: auto;
  width: 50px;
}
.avatar-container .img-container {
  position: relative;
  height: 45px;
  width: 45px;
  border-radius: 10px;
  overflow: hidden;
}
.avatar-container .img-container img {
  position: absolute;
  height: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avatar-container .img-container img:hover {
  cursor: pointer;
}
</style>
<template>
	<div class="notif-container">
		<div class="notif-card">
			<Notification />
		</div>
	</div>
</template>

<script>
export default {
	name: "NotificationsCard"
}
</script>

<style>

.notif-container {
	margin: 40px 0 0 10px;
}

.notif-card {
	min-height: 80px;
  margin: 20px 20px 0 10px;
  margin-bottom: 20px;
  border-radius: 16px;
  box-shadow: 0 0 10px rgb(0 0 0 / 40%);
  padding: 20px;
  padding-top: 10px;
}
</style>
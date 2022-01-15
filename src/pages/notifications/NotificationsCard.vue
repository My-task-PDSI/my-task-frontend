<template>
	<div class="notif-container">
		<div class="notif-card">
			<Notification
				v-for="item in notifications" 
				:key="item.id" 
				:message="item.message" 
			/>
		</div>
	</div>
</template>

<script>
import Api from '../../services/api'
import Notification from './Notification.vue'

export default {
	name: "NotificationsCard",
	components: {
		Notification
	},
	data() {
		return {
			notifications: []
		}
	},
	mounted() {
		const userId = this.$store.state.user.id
		Api.get(`/user/${userId}`).then((response) => {
			this.notifications = response.data
			console.log(response)
		}).catch((error) => {
			console.log(error)
		})
	}
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
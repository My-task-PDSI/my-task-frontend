<template>
  <div class="notifications-container">
      <BaseNavBar bg-color="#edecf7">
      <div class="profile">
        <Avatar />
        <TheTitleAndDate :title="'Notificações'"/>
      </div>
      <div class="nav-btns">
        <HomeButton />
        <GroupsButton />
        <UserButton />
        <ChangePasswordButton />
        <LogoutButton />
      </div>
    </BaseNavBar>
    <h2>Seus avisos</h2>
    <NotificationsCard />
    </div>
</template>
<script>

import BaseNavBar from '../../components/BaseNavBar.vue'
import ChangePasswordButton from "../../components/button/ChangePasswordIcon.vue";
import UserButton from "../../components/button/UserButton.vue";
import Avatar from '../../components/Avatar.vue'
import TheTitleAndDate from '../../components/TheTitleAndDate.vue'
import HomeButton from '../../components/button/HomeButton.vue'
import GroupsButton from '../../components/button/GroupsButton.vue'
import LogoutButton from '../../components/button/LogoutButton.vue'
import NotificationsCard from './NotificationsCard.vue'

export default {
  name: "Notifications",
  components: {
    BaseNavBar,
    UserButton,
    ChangePasswordButton,
    Avatar,
    TheTitleAndDate,
    HomeButton,
    GroupsButton,
    LogoutButton,
    NotificationsCard
  }
};
</script>
<style scoped>
.nav-btns {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.profile {
  display: flex;
}
h2 {
  margin: 40px 0 0 10px;
}
</style>
<template>
  <div class="notifications-container">
      <BaseNavBar bg-color="#edecf7">
      <Avatar />
      <TheTitleAndDate />
      <TheSearch />
      <div class="nav-btns">
        <HomeButton />
        <GroupsButton />
        <LogoutButton />
      </div>
    </BaseNavBar>
    <h2>Notificações</h2>
    <NotificationsCard />
    </div>
</template>
<script>

import BaseNavBar from '../../components/BaseNavBar.vue'
import Avatar from '../../components/Avatar.vue'
import TheTitleAndDate from '../../components/TheTitleAndDate.vue'
import TheSearch from '../../components/TheSearch.vue'
import HomeButton from '../../components/button/HomeButton.vue'
import GroupsButton from '../../components/button/GroupsButton.vue'
import LogoutButton from '../../components/button/LogoutButton.vue'
import NotificationsCard from './NotificationsCard.vue'

export default {
  name: "Notifications",
  components: {
    BaseNavBar,
    Avatar,
    TheTitleAndDate,
    TheSearch,
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

h2 {
  margin: 40px 0 0 10px;
}
</style>
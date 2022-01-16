<template>
    <div class="notif-container">
        <div class="notif-title">
            {{ message }}
        </div>

    </div>
</template>

<script>

import Api from '../../services/api';
export default {
    name: "Notification",
    props: {
        message: String
    },
    methods: {
        async viewNotification() {
            Api.put()
        }
    },
}
</script>

<style scoped>
    .notif-container {
        display: flex;
    }
    .notif-container .viewNotif {
        margin-left: 50px;
    }
</style>
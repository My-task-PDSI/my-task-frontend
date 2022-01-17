<template>
    <div class="notif-container">
        <div class="notif-group-title">
            {{ groupTitle }}
        </div>
        <div class="notif-title">
            {{ message }}
        </div>
    </div>
</template>

<script>

export default {
    name: "Notification",
    props: {
        groupTitle: String,
        message: String
    }
}
</script>

<style scoped>
    .notif-container {
        display: table
    }
    .notif-container .notif-group-title {
        color: #BB2222;
        font-size: 20px;
        font-weight: bold;
    }
</style>
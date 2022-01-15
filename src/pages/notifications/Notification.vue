<template>
    <div class="notif-container">
        <div class="notif-title">
            {{ message }}
        </div>
        <!-- <button @click="removeNotification">Excluir</button > -->
        <ButtonRemove @click="removeNotification">remove</ButtonRemove>
    </div>
</template>

<script>
import ButtonRemove from "../../components/button/ButtonRemove.vue";
export default {
    name: "Notificaation",
    components: ButtonRemove,
    props: {
        message: String
    },
    methods: {
        async removeNotification() {
        }
    },
}
</script>

<style scoped>
    .notif-container {
        display: flex;
    }
    .notif-container ButtonRemove {
        margin-left: 50px;
    }
</style>
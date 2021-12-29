<template>
    <div class="nav">
        <router-link class="navitem" to="/#">Home</router-link>

        <router-link class="navitem" to="/about">About</router-link>
        <router-link class="navitem" to="/contact">Contact Us</router-link>

        <div class="signin">
            <router-link class="navitem" to="/login">Login</router-link>
            <router-link class="navitem" to="/signup">SignUp</router-link>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
    .nav {
        display: flex;
    }
    .navitem {
        margin-left: 20px;
    }
    .signin {
        margin-left: 70%;
    }
    .signin .navitem {
        margin: 10px;
    }
</style>
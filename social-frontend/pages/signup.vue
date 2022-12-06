<script setup lang="ts">
    const username = ref('');
    const password = ref('');
    const age = ref('');
    const address = ref('');

    const usersEndPoint = useApi('users');
    const handleSignUp = async () => {
        
        if (username.value === '' || password.value === '' || age.value === '' || address.value === '') {
            return;
        }

        const newUser = {
            username: username.value,
            password: password.value,
            age: parseInt(age.value),
            address: address.value,
            role: "admin"
        }

        const {error} = await usersEndPoint.post('signup', newUser);
        if (error.value) {
            console.log(error.value);
            return;
        }
        navigateTo('/login');
    }


</script>

<template>
    <div class="container">
        <form class="login-form">
            <div class="form-control">
                <label for="username">Username</label>
                <input id="username" v-model="username">
            </div>
            <div class="form-control">
                <label for="password">Password</label>
                <input id="password" v-model="password">
            </div>
            <div class="form-control">
                <label for="age">Age</label>
                <input id="age" v-model="age">
            </div>
            <div class="form-control">
                <label for="address">Address</label>
                <input id="address" v-model="address">
            </div>
            <button type="submit" @click.prevent="handleSignUp">Signup</button>
        </form>
    </div>
</template>

<style scoped>
    button {
        margin-top: 1rem;
        width: 35%;
    }
</style>
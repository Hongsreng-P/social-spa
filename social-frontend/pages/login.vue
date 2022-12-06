<script setup lang="ts">
import { LoginCredential, UserInfo } from '~/constants/types';

    const password = ref<string>('');
    const username = ref<string>('');

    const loginResult = ref<string>('');

    const jwtCookie = useCookie<string>('jwt', {
        maxAge: 9999999999,
    });
    const user = useUser();
    const isAuthenticated = useAuthenticated();

    const loginEndPoint = useApi('users/login');

    const handleSubmission = async () => {
        if (username.value === '' || password.value === '') {
            loginResult.value = "Username and password cannot be empty";
            return;
        }

        const loginCredential: LoginCredential = {
            username: username.value,
            password: password.value,
        }

        const { data, error } = await loginEndPoint.post<LoginCredential>('', loginCredential);
        if(error.value) {
            loginResult.value = error.value;
            return;
        }

        jwtCookie.value = data.value.access_token;
        user.value = data.value.user;
        await logUserIn();
    }

    const logUserIn = async () => {
        isAuthenticated.value = true; 
        navigateTo('/profile');
    }

</script>

<template>
    <div class="container">
        <form class="login-form">
            <div class="form-control">
                <label for="username">Username</label>
                <input name="username" id="username" v-model="username">
            </div>
            <div class="form-control">
                <label for="password">Password</label>
                <input name="password" id="password" v-model="password">
            </div>
            <button type="submit" @click.prevent="handleSubmission">Login</button>
        </form>
        <p v-if="loginResult">{{loginResult}}</p>
    </div>
</template>

<style scoped>
    button {
        margin-top: 1rem;
        width: 35%;
    }
</style>
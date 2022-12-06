<script setup lang="ts">
import { useApi } from '~~/composables/useApi';
import { UserInfo } from '@/constants/types';
 
    const usersEndPoint = useApi('users');
    const isAuthenticated = useAuthenticated();
    const user = ref<UserInfo | null>(null);
    const jwtCookie = useCookie('jwt');
    const { data } = await usersEndPoint.get('profile');
    user.value = data.value as UserInfo;

    const logUserOut = async () => {
        jwtCookie.value = null;
        user.value = null;
        isAuthenticated.value = false;
    }

</script>

<template>
    <div class="container">
        <div v-if="user">
            <p> Username: {{user.username}}</p>
            <p> Role: {{user.role}}</p>
            <p> Address: {{user.info.address}}</p>
            <p> Age: {{user.info.age}}</p>
        </div>
        <div v-else> You are not logged in </div>
        <button v-if="user" @click="logUserOut">Logout</button>
    </div>
</template>

<style scoped>
    button {
        margin-top: 1rem;
        width: 35%;
    }
</style>
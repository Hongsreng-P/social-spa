<script setup lang="ts">
import { UserInfo } from '~~/constants/types';

    const usersEndPoint = useApi('users');

    const usernames = ref<string[]>();
    const { data } = await usersEndPoint.get();
    usernames.value = data.value;

</script>


<template>
    <div class="container">
        <h2>All users</h2>
        <p v-if="usernames" v-for="username in usernames">{{username}}</p>
    </div>
</template>
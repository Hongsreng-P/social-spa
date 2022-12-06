<script setup lang="ts">
import { Post } from '~~/constants/types';

    const postEndpoint = useApi('posts');
    const posts = ref<Post[] | null>(null);
    let { data } = await postEndpoint.get('');
    posts.value = data.value as Post[];

</script>


<template>
    <div v-if="posts" class="container">
        <button class="container" @click="navigateTo('/addpost')">What's on your mind?</button>
        <PostContainer :posts="posts" :isPersonal="false"/>
    </div>
</template>

<style scoped>
    button {
        width: 50%;
        font-size: large;
        padding: 0.7rem;
        font-family: 'Times New Roman', Times, serif;
        text-align: left;
    }
</style>

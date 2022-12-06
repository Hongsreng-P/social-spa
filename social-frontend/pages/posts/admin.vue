<script setup lang="ts">
import { Post } from '~~/constants/types';
    const postsEndPoint = useApi('posts');
    const { data } = await postsEndPoint.get('myposts');
    const posts = ref<Post[]>(data.value);

    const refreshData = async () => {
        const { data: newData } = await postsEndPoint.get('myposts');
        posts.value = newData.value;
    }

</script>


<template>
    <div class="container">
        <div v-if="posts">
            <h2>Manage your posts</h2>
            <PostContainer v-if="posts.length > 0" :posts="posts" :isPersonal="true" @refreshData="refreshData"/>
            <p v-else>You have no posts</p>
        </div>
        <div v-else>You are not logged in</div>
    </div>
</template>
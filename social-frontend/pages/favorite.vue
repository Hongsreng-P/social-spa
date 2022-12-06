<script setup lang="ts">
    const savedPostsEndPoint = useApi('savedposts');
    const { data:savedPosts } = await savedPostsEndPoint.get();
</script>



<template>
    <div class="container">
        <h2>Favorite posts</h2>
        <PostContainer v-if="savedPosts" :posts="savedPosts" :isPersonal="false" :isFavorite="true"/>
    </div>
</template>
<script setup>
    import { useApi } from '~~/composables/useApi';
        const route = useRoute();
    
        const postId = ref(route.params.postId);
        const postEndpoint = useApi('posts');

        const { data:post } = await postEndpoint.get(postId.value);
</script>

<template>
    <div>
        <div v-if="post" class="container">
            <h2>{{post.title}}</h2>
            <p>{{post.author}}</p>
            <p>{{post.description}}</p>
        </div>
    </div>
</template>

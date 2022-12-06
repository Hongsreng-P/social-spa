<script setup lang="ts">
import { EditPostData } from '@/constants/types';
    const route = useRoute();
    const postId = route.params.postId;

    const postEndpoint = useApi('posts');
    const { data:post } = await postEndpoint.get(`${postId}`);

    const title = ref<string>(post.value.title);
    const description = ref<string>(post.value.description);

    const editError = ref<string>(null);
    
    const handleEdit = async () => {
        const newPostData: EditPostData = {
            title: title.value,
            description: description.value,
        };
        const { error } = await postEndpoint.patch(`${postId}`, newPostData);
        if (!(error.value)) {
            navigateTo('/posts/admin');
        }
        editError.value = error.value;
    }; 
</script>

<template>
    <div class="container">
        <!-- TO-REFACTOR: use loop for rendering these  (how to use v-model with loop)-->
        <div class="input">
            <label for="title">Title</label>
            <input id="title" v-model="title">
            <label for="description">Description</label>
            <input id="description" v-model="description">
        </div>
        <button class="submit-btn" @click="handleEdit">Confirm</button>
        <p v-if="editError">Error, not the owner of the post</p>
    </div>
</template>

<style scoped>
    .input {
        margin: auto;
        display: flex;
        flex-direction: column;
        width: 50%
    }

    .input > * {
        margin: 0.5rem;
    }

    label {
        font-weight: bold;
    }

    .submit-btn {
        margin: 0.5rem auto;
        width: 35%;
    }
</style>
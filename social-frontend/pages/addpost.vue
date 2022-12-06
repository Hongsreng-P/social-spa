<script setup lang="ts">
import { AddNewPostData } from '@/constants/types';
    const title = ref('');
    const description = ref('');

    let postResult = ref('');

    const handlePostSubmission = async () => {
        const postEndPoint = useApi('posts');

        const newPost: AddNewPostData = {
            title: title.value,
            description: description.value,
        }

        if (title.value === '' || description.value === '') {
            postResult.value = "Title and Description cannot be empty";
            return;
        }

        const { error } = await postEndPoint.post<AddNewPostData>('', newPost);
        if (!error.value) {
            navigateTo('/');
        }
        postResult.value = error.value;
    }

</script>



<template>
    <div class="container" @keyup.enter="handlePostSubmission">
        <h2>Create Post</h2>

        <div class="form-control">
            <label for="title">Title</label>
            <input id="title" v-model="title" autofocus/>
        </div>

        <div class="form-control">
            <label for="description">Description</label>
            <textarea id="description" v-model="description"></textarea>
            <button @click.prevent="handlePostSubmission">Post</button>
            <p>{{postResult}}</p>
        </div>
    </div>
</template>

<style scoped>
    .form-control {
        display: flex;
        margin: 0.5rem;
    }

    textarea, input {
        width: 60%;
    }

    textarea {
        height: 10rem;
    }

    button {
        margin: 1rem 0;
        width: 4rem;
    }
</style>
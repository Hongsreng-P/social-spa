<script setup lang="ts">
import { booleanLiteral } from '@babel/types';
import { Post } from '~~/constants/types';
    const props = defineProps<{
        post: Post,
        isPersonal:boolean,
        isFavorite?: boolean,
    }>();
    
    const postsEndPoint = useApi('posts');
    const savedPostsEndPoint = useApi('savedposts');

    const emit = defineEmits(['refreshData']);

    const handleDelete = async () => {
        await postsEndPoint.delete(`${props.post.id}`);
        
        emit("refreshData");
    }

    const handleAddToFavorite = async () => {
        const postId = props.post.id;
        const { error } = await savedPostsEndPoint.post('', {
            postId
        });

        if (!error.value) {
            navigateTo('/favorite');
        }
    }

</script>


<template>
    <tr>
        <td>{{post.author}}</td>
        <td>{{post.title}}</td>
        <td>{{post.description}}</td>
        <td>
            <button @click="navigateTo(`/posts/${post.id}`)">Details</button>
            <button @click="handleAddToFavorite" v-if="!isFavorite">Add To Favorite</button>
            <button v-if="isPersonal" @click="navigateTo(`/posts/edit/${post.id}`)">Edit</button>
            <button v-if="isPersonal" @click="handleDelete">Delete</button>
        </td>
    </tr>
</template>

<style scoped>
    td {
        border: 1px solid black;
    }

</style>


<script setup lang="ts">
    import { Post } from '../constants/types';

    const props = defineProps<{
        posts:Post[],
        isPersonal:boolean,
        isFavorite?: boolean
    }>();

    const tableHeaders = computed(():string[] => {
        const result = [];
        for (let prop in props.posts[0]) {
            if (prop !== 'id') result.push(prop);
        }
        return result;
    });

    const emit = defineEmits(['refreshData']);
    const refreshData = () => {
        emit("refreshData");
    }

</script>

<template>
    <div class="container">
        <table>
            <tr>
                <th v-for="header in tableHeaders" :key="header">
                    {{header}}
                </th>
            </tr>
            <PostItem v-for="post in posts" :post="post" :key="post.id" @refreshData="refreshData" :isPersonal="isPersonal" :isFavorite="isFavorite"/>
        </table>
    </div>
</template>

<style scoped>
    table {
        border: 1px solid black;
        flex: 1;
    }

    th {
        border: 1px solid black;
    }


</style>
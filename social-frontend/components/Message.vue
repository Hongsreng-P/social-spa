<script setup lang="ts">
import { Message } from '~~/constants/types';

    const props = defineProps<{
        message: Message
    }>()

</script>


<template>
    <p>{{message.author}}: {{message.content}}</p>
</template>
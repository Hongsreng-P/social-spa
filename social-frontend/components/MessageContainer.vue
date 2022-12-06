<script setup lang="ts">
    const props = defineProps<{
        messages: any
    }>()

</script>


<template>
    <Message v-for="message in messages" :message="message"/>
</template>
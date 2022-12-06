<script setup lang="ts">

    useHead({
        title: computed(() => {
            const path = useRoute().path.slice(1);
            if (!(path === '')) return path.toUpperCase();
            return 'HOME';
        })
    });
</script>


<template>
    <div>
        <Navbar />
        <slot />
    </div>
</template>

<template>
    <router-view></router-view>
</template>

<script lang='ts' setup>
import { onBeforeMount } from 'vue';


onBeforeMount(() => {
    if (localStorage.getItem('dark') === 'true') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
})


</script>

<style scoped>

</style>
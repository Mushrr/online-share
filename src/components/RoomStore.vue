<template>
    <div class="w-[80%] grid grid-cols-4 md:grid-cols-6 place-items-center mr-auto ml-auto">
        <template v-for="room in rooms" key="room">
            <RoomCard :room="room" />
        </template>
    </div>
</template>

<script lang='ts' setup>
import { ref } from "vue"
import RoomCard from "./RoomCard.vue";
import { roomStore } from '../state/playerState';


defineProps<{
    rooms: roomStore[]
}>()

</script>

<style scoped>

</style>
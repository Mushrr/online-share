<template>
    <div class="w-[80%] grid grid-cols-4 md:grid-cols-6 place-items-center mr-auto ml-auto">
        <template v-for="room in rooms" key="room">
            <RoomCard :room="room" @join="roomJoin"/>
        </template>
    </div>
    <div v-show="needPassword" id="password" class="absolute w-full h-2/3 flex flex-row items-center place-content-center">
        <div class="p-2 w-3/12 border-2 rounded-lg shadow-lg shadow-gray-400">
            <p class="font-bold font-mono text-1xl flex flex-row place-content-between items-center">
                <span>❓️输入密码</span>
                <button class="w-1/12 mt-2 h-1/3 border-2 rounded-lg 
            shadow-lg shadow-gray-400 dark:bg-slate-600 dark:text-gray-300"
            @click="needPassword = !needPassword">X</button>
            </p>
            <input type="password" v-model="password" class="w-full mt-2 h-8 border-2 rounded-lg shadow-lg pl-4 
            shadow-gray-400 dark:bg-slate-600 dark:text-gray-300"
            @keyup.enter="keyJoin" />
            <button class="w-full mt-2 h-1/3 border-2 rounded-lg 
            shadow-lg shadow-gray-400 dark:bg-slate-600 dark:text-gray-300"
            @click="keyJoin"
            >Join</button>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref } from "vue"
import RoomCard from "./RoomCard.vue";
import { roomStore } from '../state/playerState';
import usePlayerState from "../state/playerState"


const props = defineProps<{
    rooms: roomStore[]
}>()
const player = usePlayerState();
const password = ref<null | number>();
const needPassword = ref(false);


const currentRoom = ref<roomStore | null>();
function roomJoin(room: roomStore) {
    console.log(room);
    // 如果发现需要使用密码
    // 则弹出输入密码框
    currentRoom.value = room;
    if (room.needKey) {
        needPassword.value = true;
    } else {
        // 直接加入
        console.log("直接加入");
    }
}


function keyJoin() {
    player.joinRoom(currentRoom.value?.id!, currentRoom.value?.name!, password.value!);
}



</script>

<style scoped>

</style>
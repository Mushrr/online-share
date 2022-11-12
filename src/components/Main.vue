<template>
  <div class="
  absolute h-full w-full bg-slate-300 
  dark:bg-slate-500 dark:text-[#98add0]">
    <Nav />
    <main class="max-h-full">
      <div class="absolute w-10 h-10 right-6 bottom-6
      text-center font-mono font-bold text-2xl
      content-center leading-6 select-none
      dark:bg-[#1f2937]
      bg-slate-400 shadow-gray-600 rounded-full p-2
      hover:rotate-180 transition-all duration-500
      " @click="showUp = !showUp">
        +
      </div>
      <div class="absolute w-10 h-10 right-24 bottom-6
      text-center font-mono font-bold text-2xl
      content-center leading-6 select-none
      dark:bg-[#1f2937]
      bg-slate-400 shadow-gray-600 shadow-sm rounded-full p-2" @click="player.updateRoom">
        <ElIcon class="hover:rotate-180 transition-all duration-500">
          <Refresh></Refresh>
        </ElIcon>
      </div>
      <RoomStore :rooms="currentRooms" />
    </main>
  </div>
  <div v-if="loginWindow"
    class="absolute flex flex-row items-center place-content-center h-full w-full backdrop-blur-sm">
    <div class="p-2 w-72 h-52 border-2 rounded-xl border-gray-500 flex flex-col place-content-between">
      <div id="notification" class="text-center">
        <el-icon>
          <Warning color="#ff0000">
          </Warning>
        </el-icon>
        你需要先表明你的身份
      </div>
      <div class="flex flex-col items-center">
        <div class="glass w-[90%]">
          <label class="mr-2" for="playerName">
            <el-icon>
              <User color="black" />
            </el-icon>
          </label>
          <input class="text-center" id="playerName" v-model="playerName" type="text" @keypress.enter="connect" />
        </div>
        <button @click="connect">Submit</button>
      </div>
    </div>
  </div>
  <CreateRoomWidget v-model:showUp="showUp" @createRoom="createRoom" />
</template>

<script lang='ts' setup>
import playerState, { roomStore, RoomProfile } from '../state/playerState';
import Nav from "./Nav.vue"
import { ref, watch } from "vue";
import { ElIcon } from "element-plus";
import { Warning, User, Plus, Refresh } from "@element-plus/icons-vue";
import { storeToRefs } from 'pinia';
import RoomStore from "./RoomStore.vue";
import CreateRoomWidget from './CreateRoomWidget.vue';

const player = playerState();
const { auth, currentRooms } = storeToRefs(player);
const playerName = ref("");
const loginWindow = ref(true);
const showUp = ref(false);

player.socket.on("room:update", (rooms) => {
  console.log(rooms);
  currentRooms.value = rooms
})

if (!player.auth) {
  loginWindow.value = true;
} else {
  loginWindow.value = false;
}

watch(auth, (val) => {
  if (val) {
    loginWindow.value = false;
  } else {
    loginWindow.value = true;
  }
})

function connect() {
  if (playerName.value !== "") {
    player.playerName = playerName.value;
    player.connectToServer();
  }
}



function createRoom(roomProfile: RoomProfile) {
  player.createRoom(roomProfile);
}
</script>

<style scoped>

</style>
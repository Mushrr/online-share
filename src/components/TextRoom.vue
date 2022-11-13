<template>
    <div v-if="waiting" class="absolute w-full h-full flex flex-row 
    place-content-center items-center bg-slate-400 dark:bg-slate-600">
        <div>
            <span class="bg-slate-300 m-2 p-2 rounded-xl shadow-md font-sans text-2xl" v-for="p in allPlayers"
                key="p.playerId">
                {{ p.playerName }}
                <span v-if="p.playerId === player.playerId">
                    <ElIcon>
                        <User color="black" />
                    </ElIcon>
                </span>
            </span>
        </div>
        <div v-if="isMaster" class="absolute bottom-0 bg-slate-300 m-2 p-2 rounded-xl shadow-md font-sans text-2xl">
            <button class="w-[100%]" @click="start">Start</button>
        </div>
    </div>
    <div v-else class="absolute w-full h-full flex flex-col 
    place-content-between items-center bg-slate-400 dark:bg-slate-600">
        <div>
            <span class="bg-slate-300 m-2 p-2 rounded-xl shadow-md font-sans text-2xl" v-for="p in allPlayers"
                key="p.playerId">
                {{ p.playerName }}
                <span v-if="p.playerId === player.playerId">
                    <ElIcon>
                        <User color="black" />
                    </ElIcon>
                </span>
            </span>
        </div>
        <textarea ref="inputArea" v-model="currentResource"
            class="w-[60%] h-[60%] mb-5 p-10 text-white outline-none bg-slate-600 dark:bg-slate-800 border-2 border-black "
            @input="update($event)">

        </textarea>
    </div>
</template>

<script lang='ts' setup>
import { computed, ref, watch } from 'vue';
import playerState from '../state/playerState';
import { useRoute } from 'vue-router';
import { ElIcon } from 'element-plus';
import { User } from "@element-plus/icons-vue"

const route = useRoute();
const player = playerState();
const allPlayers = ref([]);
const waiting = ref(true);
const currentResource = ref("");

const fetchAllUsers = () => {
    player.socket.emit("room:getuser", {
        playerId: player.playerId,
    })
};

watch(currentResource, (val) => {
    console.log(val);
})

function start() {
    // 开始 ？
    console.log("这里这里")
    player.socket.emit("master:start");
}



const inputArea = ref(null);
function update() {
    currentPosition.value = inputArea.value.selectionStart;
    console.log(currentPosition.value);
    setTimeout(() => {
        player.socket.emit("resource:update", currentResource.value);
        console.log(currentResource.value);
        console.log("向远程发送了消息");
    }, 10);

}

const currentPosition = ref(0);

function updateData(serverData: string) {
    const frags = serverData.split("\n");
    const currentDataFrags = currentResource.value.split("\n");

    const intersectionLenght = Math.min(frags.length, currentDataFrags.length);
    for (let i = 0; i < intersectionLenght; i++) {
        if (frags[i] !== currentDataFrags[i]) {
            currentDataFrags[i] = frags[i];
        }
    }

    if (frags.length > currentDataFrags.length) {
        for (let i = intersectionLenght; i < frags.length; i++) {
            currentDataFrags.push(frags[i]);
        }
    } else if (frags.length < currentDataFrags.length) {
        for (let i = intersectionLenght; i < currentDataFrags.length; i++) {
            currentDataFrags.pop();
        }
    }
    // DOM树渲染
    currentResource.value = currentDataFrags.join("\n");
}

// 资源已经加载，不再等待用户连接
player.socket.on("resource:load", (data, version) => {
    waiting.value = false; // 推出等待阶段
    console.log("更新了");
    const position = (inputArea.value! as HTMLInputElement).selectionStart;
    updateData(data);
    console.log((inputArea.value! as HTMLInputElement).selectionStart);    
    console.log("position", position);

    setTimeout(() => {
        (inputArea.value! as HTMLInputElement).setSelectionRange(position, position);
    }, 1);
    
    console.log(typeof data);
});

player.socket.emit("resource")


// 等待阶段获取用户连接信息
setInterval(fetchAllUsers, 2000);

player.socket.on("room:getuser", (data: any) => {
    allPlayers.value = data.allPlayers;

})


// 是否是当前资源的主人
const isMaster = computed(() => {
    let isMaster = false;;
    player.rooms.forEach(roomId => {
        if (roomId === route.params.id) {
            isMaster = true;
        }
    })
    return isMaster;
})


</script>

<style scoped>
.highlight {
    border: 1px dashed black;
}
</style>
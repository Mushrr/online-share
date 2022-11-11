<template>
    <div class="w-[90%] h-52 bg-slate-300 border-2 rounded-xl mt-4 border-gray-400
    shadow-md shadow-black
    p-2 items-center flex flex-col
    dark:bg-slate-700 dark:border-gray-700
    ">
        <div class="w-[100%] h-[80%]  border-b-2 border-gray-400 flex flex-col items-center place-content-center">
            <div
                class="backdrop-blur-sm bg-gray-200 dark:bg-slate-900 rounded-full w-32 h-32 flex flex-col items-center place-content-center">
                <span v-if="room.type === 'text'">
                    <ElIcon size="50">
                        <Document />
                    </ElIcon>
                </span>
                <span v-if="room.type === 'canvas'">
                    <ElIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            t="1668171637565" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="2690" width="200"
                            height="200">
                            <path
                                d="M426.666667 170.666667v42.666666a42.666667 42.666667 0 1 1-85.333334 0V170.666667H256v256h512V170.666667h-85.333333v128a42.666667 42.666667 0 0 1-85.333334 0V170.666667h-170.666666z m-170.666667 341.333333v85.333333h145.493333a64 64 0 0 1 63.146667 74.538667l-17.493333 104.874667a65.749333 65.749333 0 1 0 129.706666 0l-17.493333-104.874667A64 64 0 0 1 622.506667 597.333333H768v-85.333333H256z m405.034667 250.709333a151.082667 151.082667 0 1 1-298.069334 0L376.32 682.666667H256a85.333333 85.333333 0 0 1-85.333333-85.333334V170.666667a85.333333 85.333333 0 0 1 85.333333-85.333334h512a85.333333 85.333333 0 0 1 85.333333 85.333334v426.666666a85.333333 85.333333 0 0 1-85.333333 85.333334h-120.32l13.354667 80.042666z"
                                fill="#1C1C1C" p-id="2691" />
                        </svg>
                    </ElIcon>
                </span>
            </div>

            <span class="font-mono text-gray-600 dark:text-[#a8bffe]">
                <span>
                    {{ room.name }}
                </span>
                <ElIcon v-if="room.needKey">
                    <Key color="#ff5700" />
                </ElIcon>
            </span>
        </div>
        <div class="w-[80%] flex flex-row items-center place-content-between">
            <div>
                <div class="font-mono text-gray-600 dark:text-[#a8bffe]">
                    <ElIcon>
                        <User />
                    </ElIcon>
                    {{ room.master }}
                </div>
            </div>
            <div>
                <button class="w-[100%] dark:bg-slate-900 pl-2 pr-2" @click="join">
                    加入
                </button>
            </div>
        </div>
        <!-- {{ room }} -->

    </div>
</template>

<script lang='ts' setup>
import { roomStore } from '../state/playerState';
import { Document, Key, User } from "@element-plus/icons-vue"
import { ElIcon, ElNotification } from 'element-plus';
import usePlayer from '../state/playerState';
import { ref } from 'vue';

const props = defineProps<{
    room: roomStore
}>()

const key = ref("");
const showKey = ref(false);
const player = usePlayer();


function join() {
    if (props.room.needKey) {
        // show key window
        showKey.value = true;
        ElNotification({
            title: "提示",
            message: "请输入房间密码",
            type: "warning",
            duration: 0,
        })
    } else {
        player.joinRoom(props.room.id, props.room.name, null);
    }
}
</script>

<style scoped>

</style>
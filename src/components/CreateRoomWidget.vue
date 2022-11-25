<template>
    <div v-if="showUp" class="absolute w-full h-full backdrop-blur-sm flex items-center place-content-center">

        <div class="p-2 w-72 border-2 rounded-xl 
    border-gray-500 flex flex-col place-content-between
    dark:border-gray-700
    dark:bg-slate-700
    dark:text-[#98add0]
    " @click.stop="">
            <div class="glass dark:bg-slate-700">
                <el-icon class="mr-5">
                    <HomeFilled color="black" />
                </el-icon>
                <input class="placeholder:text-gray-600 dark:placeholder:text-gray-400 dark:bg-slate-700"
                    placeholder="房间名" v-model="roomProfile.roomName" />
            </div>
            <div class="glass dark:bg-slate-700">
                <el-icon class="mr-5">
                    <User />
                </el-icon>
                <input class="placeholder:text-gray-600 dark:placeholder:text-gray-400 dark:bg-slate-700"
                    placeholder="最大人数" type="number" v-model="roomProfile.maxPlayers" />
            </div>
            <div class="glass flex flex-row items-center place-content-between dark:bg-slate-700">
                <el-icon>
                    <Key />
                </el-icon>
                <input type="number"
                    class="placeholder:text-gray-600 dark:placeholder:text-gray-400 w-[40%] dark:bg-slate-700"
                    placeholder="密码" v-model="roomProfile.key" />
                <ElCheckbox fill="black" v-model="roomProfile.needKey">password?</ElCheckbox>
            </div>
            <div class="glass place-content-between items-center flex flex-row dark:bg-slate-700">
                <el-icon>
                    <Select>
                    </Select>
                </el-icon>
                <select class="glass w-[80%] dark:bg-slate-700" v-model="roomProfile.type">
                    <option selected disabled>
                        选择一个类型
                    </option>
                    <option>
                        text
                    </option>

                    <option>
                        canvas
                    </option>
                </select>
            </div>
            <div class="text-center dark:bg-slate-700">
                <button class="w-[48%] dark:bg-slate-700" @click="createRoom">Create</button>
                <button class="w-[48%] dark:bg-slate-700" @click="$emit('update:showUp', false)">Cancle</button>
            </div>
        </div>

    </div>
</template>

<script lang='ts' setup>
import { User, Key, Select, HomeFilled } from "@element-plus/icons-vue";
import { ElCheckbox, ElNotification } from "element-plus";
import { ref, watch } from "vue";

interface RoomProfile {
    roomName: string,
    maxPlayers: number,
    key: "",
    playerId: string,
    needKey: boolean,
    type: "text" | "canvas",
}



defineProps<{
    showUp: boolean
}>()
const emiter = defineEmits<{
    (event: 'update:showUp', state: boolean): void,
    (event: 'createRoom', roomProfile: RoomProfile): void
}>()


const roomProfile = ref({
    roomName: "",
    key: "",
    maxPlayers: 0,
    needKey: false,
    type: "text"
})

watch(roomProfile.value, (nv) => {
    if (nv.key) {
        roomProfile.value.needKey = true
    } else {
        roomProfile.value.needKey = false
    }
})

function createRoom() {
    console.log(roomProfile.value);
    if (roomProfile.value.roomName === "") {
        ElNotification({
            title: "房间名不能为空",
            type: "error",
            duration: 2000
        })
    } else if (roomProfile.value.maxPlayers < 1 || roomProfile.value.maxPlayers > 24) {
        ElNotification({
            title: "Error",
            message: "最大人数不得小于1或大于24",
            type: "error"
        })
    } else {
        emiter('createRoom', (roomProfile.value as RoomProfile));
        emiter('update:showUp', false); // 退出
    }
}
</script>

<style scoped>

</style>
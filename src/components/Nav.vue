<template>
    <nav class="
    bg-slate-300 drop-shadow-lg 
    h-8 rounded-b-xl shadow-lg 
    flex flex-row
    items-center
    select-none
    place-content-between
    dark:bg-gray-800 dark:shadow-gray-600">
        <div class="pl-2 hover:text-[#6893bf] dark:hover:text-[#a8c0ff]">
            Icons
        </div>
        <div class="drop-shadow-2xl select-none hover:text-[#6893bf] dark:hover:text-[#a8c0ff]">
            Share Your File
        </div>
        <div class="mr-4" @click="isDark = !isDark">
            <el-icon size="18">
                <MoonNight color="#9e8aff" v-if="isDark">
                </MoonNight>
                <Sunny color="#cc7b00" v-else>
                </Sunny>
            </el-icon>
        </div>
    </nav>
</template>

<script lang='ts' setup>
import { MoonNight, Sunny } from "@element-plus/icons-vue"
import { ElIcon } from "element-plus";
import { ref, watch } from "vue";

const isDark = ref(false);

watch(isDark, () => {
    if (isDark.value) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('dark', isDark.value ? 'true' : 'false');
})

</script>

<style scoped>

</style>
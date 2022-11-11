import { createRouter, createWebHistory } from "vue-router";


const routes = [
    { path: "/room/:id", component: () => import("./components/TextRoom.vue") },
    { path: "/", component: () => import("./components/Main.vue") }

]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {useArticleStore} from "../store/Article";

const routes: Array<RouteRecordRaw> = [
    {
      path:"/article/:id",
        name:"article",
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/",
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/login",
        component: () => import("../views/Login.vue"),
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {useArticleStore} from "../store/Article";


const routes: Array<RouteRecordRaw> = [
    {
        path: "/article/:id",
        name: "article",
        component: () => import("../views/Article.vue"),
    },
    {
        path: "/",
        name: "home",
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/register",
        name: "register", // @ts-ignore
        component: () => import("../views/Register.vue"),
    },
    {
        path: "/addArticle",
        name: "addArticle",
        component: () => import("../views/AddArticle.vue"),
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
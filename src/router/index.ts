import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {useArticleStore} from "../store/Article";
import {ElMessage} from "element-plus";





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
        beforeEnter: (to, from, next) => {
            const token = sessionStorage.getItem("token");
            if (token) {
                next();
            } else {
                ElMessage.error("请先登录");
                next("/login");
            }
        }
    }, {
        path: "/center",
        name: "center",
        component: () => import("../views/NoUserCenter.vue"),
        beforeEnter: (to, from, next) => {
            const token = sessionStorage.getItem("token");
            if (token) {
                next();
            } else {
                ElMessage.error("请先登录");
                next("/login");
            }
        }
    }, {
        path: "/editArticle",
        name: "editArticle",
        component: () => import("../views/UserCenter/EditArticle.vue"),
        props: true,
        beforeEnter: (to, from, next) => {
            const token = sessionStorage.getItem("token");
            if (token) {
                next();
            } else {
                ElMessage.error("非法访问，请先登录");
                next("/login");
            }
        }
    }, {
        path: "/editComment",
        name: "editComment",
        component: () => import("../views/UserCenter/EditComment.vue"),
        props: true,
        beforeEnter: (to, from, next) => {
            const token = sessionStorage.getItem("token");
            if (token) {
                next();
            } else {
                ElMessage.error("非法访问，请先登录");
                next("/login");
            }
        }
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
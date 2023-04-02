import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
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
    }, {
        path: "/workplace",
        name: "workplace",// @ts-ignore
        component: () => import("../views/Controller/Workplace.vue"),
        beforeEnter: (to, from, next) => {
            const token = JSON.parse(sessionStorage.getItem("token") || "{}").acode;
            if (token === 3) {
                ElMessage.error("非法访问");
                next("/");
            } else {
                next();
            }
        }
    }, {
        path: "/adminCenter",
        name: "adminCenter",
        component: () => import("../views/AdminCenter/AdminCenter.vue"),
        beforeEnter: (to, from, next) => {
            const token = JSON.parse(sessionStorage.getItem("token") || "{}").acode;
            if (token != 1) {
                ElMessage.error("非法访问");
                next("/");
            } else {
                next();
            }
        }

    }, {
        path: "/partition",
        name: "adminCenterPartition",// @ts-ignore
        component: () => import("../views/AdminCenter/PartitionControl.vue"),
        beforeEnter: (to, from, next) => {
            const token = JSON.parse(sessionStorage.getItem("token") || "{}").acode;
            if (token != 1) {
                ElMessage.error("非法访问");
                next("/");
            } else {
                next();
            }
        }
    }, {
        path: "/lexicon",
        name: "adminCenterLexicon",// @ts-ignore
        component: () => import("../views/AdminCenter/LexiconControl.vue"),
        beforeEnter: (to, from, next) => {
            const token = JSON.parse(sessionStorage.getItem("token") || "{}").acode;
            if (token != 1) {
                ElMessage.error("非法访问");
                next("/");
            } else {
                next();
            }
        }
    }, {
        path: "/announcement",
        name: "adminCenterAnnouncement",// @ts-ignore
        component: () => import("../views/AdminCenter/AnnouncementControl.vue"),
        beforeEnter: (to, from, next) => {
            const token = JSON.parse(sessionStorage.getItem("token") || "{}").acode;
            if (token != 1) {
                ElMessage.error("非法访问");
                next("/");
            } else {
                next();
            }
        }
    }, {
        path: "/adAuditor",
        name: "adminCenterAuditor",// @ts-ignore
        component: () => import("../views/AdminCenter/AuditorControl.vue"),
        beforeEnter: (to, from, next) => {
            const token = JSON.parse(sessionStorage.getItem("token") || "{}").acode;
            if (token != 1) {
                ElMessage.error("非法访问");
                next("/");
            } else {
                next();
            }
        }
    }, {
        path: "/audiCenter",
        name: "audiCenter",// @ts-ignore
        component: () => import("../views/AudiCenter/AudiCenter.vue"),
        beforeEnter: (to, from, next) => {
            const token = JSON.parse(sessionStorage.getItem("token") || "{}").acode;
            if (token != 2) {
                ElMessage.error("非法访问");
                next("/");
            } else {
                next();
            }
        }
    }, {
        path: "/audiArticle",
        name: "audiArticle",// @ts-ignore
        component: () => import("../views/AudiCenter/AudiArticle.vue"),
        beforeEnter: (to, from, next) => {
            const token = JSON.parse(sessionStorage.getItem("token") || "{}").acode;
            if (token != 2) {
                ElMessage.error("非法访问");
                next("/");
            } else {
                next();
            }
        }
    }, {
        path: "/audiArticle/articleDetail",
        name: "audiArticleDetail",// @ts-ignore
        component: () => import("../views/AudiCenter/ArticleDetail.vue"),
        props: true,
        beforeEnter: (to, from, next) => {
            const token = JSON.parse(sessionStorage.getItem("token") || "{}").acode;
            if (token != 2) {
                ElMessage.error("非法访问");
                next("/");
            } else {
                next();
            }
        }
    }, {
        /**
         * 审核用户
         */
        path: "/audiUser",
        name: "audiUser",
        component: () => import("../views/AudiCenter/AudiUser.vue"),
        beforeEnter: (to, from, next) => {
            const token = JSON.parse(sessionStorage.getItem("token") || "{}").acode;
            if (token != 2) {
                ElMessage.error("非法访问");
                next("/");
            } else {
                next();
            }
        }
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
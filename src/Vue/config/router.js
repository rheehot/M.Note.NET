const blogVue = () => import(/* webpackChunkName: "blogVue" */ 'View/Pages/blog.vue')
const profileVue = () => import(/* webpackChunkName: "profileVue" */ 'View/Pages/profile.vue')
const mainVue = () => import(/* webpackChunkName: mainVue" */ 'View/Pages/main.vue')
const historyVue = () => import(/* webpackChunkName: "historyVue" */ "View/Pages/history.vue")

const routes = [{
        name: "MaSung.Note",
        path: "/",
        default: "/",
        component: mainVue
    },
    {
        name: "Profile",
        path: "/profile",
        default: "/profile",
        component: profileVue
    },
    {
        name: "Blog",
        path: "/blog/:post",
        default: "/blog/main",
        component: blogVue
    },
    {
        name: "History",
        path: "/history",
        default: "/history",
        component: historyVue
    }
]

export default routes
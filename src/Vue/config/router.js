import blogVue from 'View/Pages/blog.vue'
import profileVue from 'View/Pages/profile.vue'
import mainVue from 'View/Pages/main.vue'
import historyVue from "View/Pages/history.vue";
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
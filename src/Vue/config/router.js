import blogVue from 'View/Pages/blog.vue'
import profileVue from 'View/Pages/profile.vue'
import mainVue from 'View/Pages/main.vue'
import historyVue from "View/Pages/history.vue";
const routes = [{
        name: "MaSung.Note",
        path: "/",
        component: mainVue
    },
    {
        name: "Profile",
        path: "/profile",
        component: profileVue
    },
    {
        name: "Blog",
        path: "/blog",
        component: blogVue
    },
    {
        name: "History",
        path: "/history",
        component: historyVue
    }
]

export default routes
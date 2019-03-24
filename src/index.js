import Vue from 'vue'
import index from './index.vue'
import VueRouter from "vue-router";

import VueRouterConfig from "VueConfig/router"

const vRouter = new VueRouter({
    mode:"history",
    routes:VueRouterConfig
})

Vue.use(VueRouter);

console.log(VueRouterConfig)
var vueApp = new Vue({
    render: h => h(index),
    router :vRouter
}).$mount('#app')



window.vueApp = vueApp;
import Vue from 'vue'
import index from './index.vue'

var vueApp = new Vue({
    render: h => h(index)
}).$mount('#app')

window.vueApp = vueApp;
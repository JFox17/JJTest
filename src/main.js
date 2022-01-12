import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import VueMask from 'v-mask'
Vue.use(VueMask);
Vue.use(VueCompositionAPI)


new Vue({
    el: "#app",
    render: h => h(App)
})
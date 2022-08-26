import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import wfOverview from "../views/wfOverview.vue";
import mainComponentsParameters from '../components/mainComponentsParameters.vue'
import gearBoxRunParameters from '../components/gearBoxRunParameters.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: gearBoxRunParameters
  },
  {
    path:'/mainComponentsParameters',
    name:'mainComponentsParameters',
    component:mainComponentsParameters
  },
  {
    path:'/gearBoxRunParameters',
    name:'gearBoxRunParameters',
    component:gearBoxRunParameters
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import store from "../state/stateStore";
import app from '../Axios/axiosconf';
const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})



router.beforeEach((to,from,next)=>{


  if((to.path == "/bookMarks"|| to.path == "/YourRecipe" || to.path == "/recipe") && !store.state.name){
    next("/authentication")
  }else{
    next()
  }
  

 })










 
 


export default router
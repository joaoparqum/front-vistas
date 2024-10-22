import { createRouter, createWebHistory } from 'vue-router';
import Homescreen from "../components/Homescreen.vue";

const routes = [
    { path: '/', component: Homescreen },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;
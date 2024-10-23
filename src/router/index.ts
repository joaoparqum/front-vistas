import { createRouter, createWebHistory } from 'vue-router';
import Homescreen from "../components/Homescreen.vue";
import TelaDocumentos from '../components/TelaDocumentos.vue';
import TelaCriarDocumento from '../components/TelaCriarDocumento.vue';

const routes = [
    { path: '/', component: Homescreen },
    { path: '/TelaDocumentos', component: TelaDocumentos},
    { path: '/AdicionarDocumento', component: TelaCriarDocumento}
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;
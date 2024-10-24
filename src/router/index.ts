import { createRouter, createWebHistory } from 'vue-router';
import Homescreen from "../components/Homescreen.vue";
import TelaDocumentos from '../components/TelaDocumentos.vue';
import TelaCriarDocumento from '../components/TelaCriarDocumento.vue';
import TelaCriaUsuario from '../components/TelaCriaUsuario.vue';

const routes = [
    { path: '/', component: Homescreen },
    { path: '/TelaDocumentos', component: TelaDocumentos},
    { path: '/AdicionarDocumento', component: TelaCriarDocumento},
    { path: '/TelaCriaUsuario', component: TelaCriaUsuario},
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;
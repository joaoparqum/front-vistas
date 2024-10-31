import { createRouter, createWebHistory } from 'vue-router';
import Homescreen from "../components/Homescreen.vue";
import TelaDocumentos from '../components/TelaDocumentos.vue';
import TelaCriarDocumento from '../components/TelaCriarDocumento.vue';
import TelaCriaUsuario from '../components/TelaCriaUsuario.vue';
import { useStore } from 'vuex';

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

/*router.beforeEach((to, from, next) => {

  const store = useStore();
  const isLoggedIn = store.state.isLoggedIn; // Verifica se o usuário está logado 

  // Verifica se a rota requer autenticação
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
      next({ path: '/' }); 
  } else {
      next();
  }
});*/
  
export default router;
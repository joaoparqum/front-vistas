import { createRouter, createWebHistory } from 'vue-router';
import Homescreen from "../components/Homescreen.vue";
import TelaDocumentos from '../components/TelaDocumentos.vue';
import TelaCriarDocumento from '../components/TelaCriarDocumento.vue';
import TelaCriaUsuario from '../components/TelaCriaUsuario.vue';
import { useStore } from 'vuex';

const routes = [
    { path: '/', component: Homescreen },
    { path: '/TelaDocumentos', component: TelaDocumentos, meta: { requiresAuth: true }},
    { path: '/AdicionarDocumento', component: TelaCriarDocumento, meta: { requiresAuth: true }},
    { path: '/TelaCriaUsuario', component: TelaCriaUsuario, meta: { requiresAuth: true }},
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

 // Guarda de navegação para verificar a autenticação
  router.beforeEach((to, from, next) => {

    const store = useStore();
    const isLoggedIn = store.state.isLoggedIn; 
    
    // Verifica se a rota requer autenticação
    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
        // Redireciona para a página inicial ou para uma página de login se o usuário não estiver logado
        next({ path: '/' }); // ou redirecione para a página de login
    } else {
        next(); // Permite a navegação
    }
  });
  
  export default router;
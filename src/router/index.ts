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
    { path: '/TelaCriaUsuario', component: TelaCriaUsuario},
  ];
  
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Adicionando a guarda de navegação para proteger as rotas
router.beforeEach((to, _from, next) => {
  const store = useStore();
  console.log('Token no beforeEach:', store.state.token);

  // Checa se a rota requer autenticação
  if (to.meta.requiresAuth) {
    if (store.state.token) { // Confia apenas no Vuex
      next(); // Permite o acesso
    } else {
      console.log('Redirecionando para login, token ausente.');
      next('/'); // Redireciona para a tela de login
    }
  } else {
    next(); // Permite o acesso para rotas que não precisam de autenticação
  }
});

  
export default router;

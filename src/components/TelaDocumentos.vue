<template>
    <a-layout :style="{ minHeight: '100vh', position: 'relative'}">
  
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }">
        <div style="display: flex; align-items: center;">
          <img src="/casa-logo.jpg" alt="Logo" style="margin-right: 10px; height: 40px;" /> 
          <h1 style="color: white; margin: 0;">Vistas Explodidas</h1>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <p style="color: white; font-weight: bold; margin: 0;">Olá, {{ username }}!</p>
          <a-button v-if="isAdmin" type="primary" @click="cadastrarUsuario()">
            <UserAddOutlined />
            Registrar usuário
          </a-button>
          <a-button type="primary" @click="fazerLogout()">
            <LogoutOutlined />
            Sair
          </a-button>
        </div>
      </a-layout-header>

      <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
        <a-breadcrumb :style="{ margin: '16px 0' }">
        </a-breadcrumb>
        <div :style="{ background: '#fff', padding: '24px', minHeight: '790px' }">
          <h1 style="text-align: center;">Tabela de Vistas Explodidas</h1>
          <TabelaDocumentos/>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ position: 'relative', bottom: 0, width: '100%', textAlign: 'center', background: '#0404cf' }">
        <h2 style="color: yellow;">Casa do Construtor | Irecê ©2024</h2>
      </a-layout-footer>
    </a-layout>
  </template>
  
  <script lang="ts" setup>
    import TabelaDocumentos from './TabelaDocumentos.vue';
    import { useStore } from 'vuex';
    import { message } from 'ant-design-vue';
    import { useRouter } from 'vue-router';
    import { LogoutOutlined, UserAddOutlined } from '@ant-design/icons-vue';
    import { computed, onMounted, ref } from 'vue';

    const router = useRouter();
    const store = useStore();
    const username = ref<string | null>(null);

    onMounted(() => {
        username.value = localStorage.getItem('login');
    });

    const fazerLogout = () => {
      store.dispatch('logout');

      message.success('Saindo...');

      setTimeout(() => {
          router.push('/');
      }, 2000);
    }

    const cadastrarUsuario = () => {
      setTimeout(() => {
        router.push('/TelaCriaUsuario')
      }, 2000);
    }

    const isAdmin = computed(() => {
      const role = localStorage.getItem('role');
      console.log('Usuário carregado:', role);
      return role === 'admin';
    });


  </script>
  
  <style scoped>

    #components-layout-demo-fixed .logo {
      width: 120px;
      height: 31px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px 24px 16px 0;
      float: left;
    }
    .site-layout .site-layout-background {
      background: #fff;
    }
  
    [data-theme='dark'] .site-layout .site-layout-background {
      background: #141414;
    }
  </style>
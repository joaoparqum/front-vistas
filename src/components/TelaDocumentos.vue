<template>
    <a-layout>
  
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }">
        <div style="display: flex; align-items: center;">
          <img src="/casa-logo.jpg" alt="Logo" style="margin-right: 10px; height: 40px;"/> 
          <h1 style="color: white; margin: 0;">Vistas Explodidas</h1>
        </div>
        <a-button type="primary" @click="fazerLogout()">
          <LogoutOutlined />
          Sair
        </a-button>
      </a-layout-header>

      <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
        <a-breadcrumb :style="{ margin: '16px 0' }">
        </a-breadcrumb>
        <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
          <h1 style="text-align: center;">Tabela de Vistas Explodidas</h1>
          <TabelaDocumentos/>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center', background: '#00008B' }">
        <h2 style="color: yellow;">Casa do Construtor | Irecê ©2024</h2>
      </a-layout-footer>
    </a-layout>
  </template>
  
  <script lang="ts" setup>
    import TabelaDocumentos from './TabelaDocumentos.vue';
    import { useStore } from 'vuex';
    import { message } from 'ant-design-vue';
    import { useRouter } from 'vue-router';
    import { LogoutOutlined } from '@ant-design/icons-vue';

    const router = useRouter();
    const store = useStore();

    const fazerLogout = () => {
      store.dispatch('logout');

      message.success('Saindo...');

      setTimeout(() => {
          router.push('/');
      }, 2000);
    }


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
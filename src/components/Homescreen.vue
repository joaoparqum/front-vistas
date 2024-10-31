<template>
  <a-layout>

    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center' }">
      <img src="/casa-logo.jpg" alt="Logo" style="margin-right: 10px; height: 40px;"/> 
      <h1 style="color: white;">Vistas Explodidas</h1>
    </a-layout-header>

    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-breadcrumb :style="{ margin: '16px 0' }">
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '90px', minHeight: '460px', marginLeft: '180px', marginRight: '180px'}">
        <h1 style="text-align: center;">Seja bem vindo ás Vistas Explodidas de Equipamentos!</h1>
        <br><br>
        <div class="login-container">
          <Login/>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center', background: '#00008B' }">
        <h2 style="color: yellow;">Casa do Construtor | Irecê ©2024</h2>
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
  import Login from './Login.vue';
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

  .login-container{
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>


<template>
  <a-carousel autoplay>
    <div>
      <h3 style="color: white">
        <a href="https://casadoconstrutor.com.br/pt-br" target="_blank">Casa do Construtor</a>
      </h3>
    </div>
    <div class="carousel-item">
      <img src="/logo-maior.png" alt="Logo" />
    </div>
  </a-carousel>
</template>

<style scoped>
  /* Para o carrossel */
  :deep(.slick-slide) {
    text-align: center;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #09008a86;
    overflow: hidden;
  }

  /* Estilo para a imagem no carrossel */
  .carousel-item {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* Garante que a imagem seja redimensionada corretamente */
  }
</style>

  
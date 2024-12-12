<template>
  <div class="form-container">
    <a-form
      layout="vertical"
      @submit="handleSubmit"
      enctype="multipart/form-data"
      name="upload-document"
    >
      <a-form-item
        name="upload"
        label="Upload de Documentos"
        required
      >
        <a-upload
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          :multiple="true"
          list-type="text"
        >
          <a-button>
            Clique para fazer upload
          </a-button>
        </a-upload>
      </a-form-item>

      <a-form-item>
        <a-button 
          type="primary" 
          html-type="submit" 
          :disabled="fileList.length === 0"
        >
          Enviar Documentos
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'; // Importa ref para estados reativos
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { message } from 'ant-design-vue';

  const store = useStore();
  const router = useRouter();
  const fileList = ref<File[]>([]); // Cria uma referência reativa

  // Função para capturar os arquivos antes de enviar
  const beforeUpload = (file: File) => {
    fileList.value = [...fileList.value, file]; // Adiciona o arquivo à lista
    return false; // Impede o upload automático
  };

  // Função para remover arquivos da lista
  const handleRemove = (file: File) => {
    const index = fileList.value.indexOf(file);
    if (index !== -1) {
      fileList.value.splice(index, 1);
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (fileList.value.length === 0) {
      console.error('Nenhum arquivo foi selecionado.');
      return;
    }

    try {
      // Envia todos os arquivos na lista
      await store.dispatch('addDocument', fileList.value);
      message.success('Documentos cadastrados com sucesso!');
      setTimeout(() => {
        router.push('/TelaDocumentos');
      }, 2000);
    } catch (error) {
      console.error('Erro ao enviar os documentos:', error);
    }
  };
</script>


<style scoped>
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh; /* Altura adaptada ao tamanho da tela */
    padding: 20px;
  }

  a-form {
    width: 100%;
    max-width: 400px; /* Limita o tamanho do formulário */
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* Responsividade para tablets */
  @media (max-width: 1024px) {
    .form-container {
      padding: 10px;
    }

    a-form {
      padding: 15px;
    }
  }

  /* Responsividade para dispositivos menores */
  @media (max-width: 768px) {
    a-form {
      padding: 10px;
      border: none; /* Remove a borda para telas menores */
      box-shadow: none; /* Remove a sombra para simplicidade */
    }

    .form-container {
      align-items: flex-start; /* Ajusta a posição para telas menores */
      height: auto;
    }
  }
</style>

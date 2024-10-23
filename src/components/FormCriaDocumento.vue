<template>
    <div class="form-container">
      <a-form @submit="handleSubmit" enctype="multipart/form-data" name="upload-document">
      
        <a-form-item name="upload" label="Upload do Documento" required>
          <a-upload
            v-model:fileList="fileList"
            :before-upload="beforeUpload"
            :multiple="false"
            :max-count="1"
            list-type="text"
          >
            <a-button>Clique para fazer upload</a-button>
          </a-upload>
        </a-form-item>
  
        
        <a-form-item>
          <a-button type="primary" html-type="submit">Enviar Documento</a-button>
        </a-form-item>
      </a-form>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { reactive } from 'vue';
    import { useStore } from 'vuex'; // Para acessar a store Vuex
    import { useRouter } from 'vue-router';
    import { message } from 'ant-design-vue';
    
    const store = useStore();
    const fileList = reactive([]);
    const router = useRouter();
    
    // Função para capturar o arquivo antes de enviar
    const beforeUpload = (file: File) => {
        fileList[0] = file; // Armazena o arquivo selecionado
        return false; // Impede o upload automático
    };
    
    const handleSubmit = async (e: Event) => {
        e.preventDefault();
    
        if (fileList.length === 0) {
            console.error('Nenhum arquivo foi selecionado.');
            return;
        }
    
        try {
            await store.dispatch('addDocument', fileList[0]);
            message.success('Documento cadastrado com sucesso!');
            setTimeout(() => {
                router.push('/TelaDocumentos');
            }, 2000);
            console.log('Arquivo enviado com sucesso.');
        } catch (error) {
            console.error('Erro ao enviar o documento:', error);
        }
    };
  </script>
  
<style scoped>
    .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40vh; /* Faz o contêiner ocupar toda a altura da tela */
    }

    a-form {
    width: 400px; /* Define a largura do formulário */
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
</style>
  
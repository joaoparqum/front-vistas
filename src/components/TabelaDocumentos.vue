<template>
  <div class="table-container">
    <a-button 
      type="primary" 
      @click="navegarParaAdicionarDocumento"
      v-if="isAdmin"
    >
      Adicionar documento
    </a-button>
    <br /><br />
    <a-input-search
      v-model:value="searchTerm"
      placeholder="Pesquisar por nome"
      enter-button
      @search="onSearch"
    />
    <br /><br />

    <a-table 
      :columns="columns" 
      :data-source="data" 
      :scroll="{ x: 800 }" 
      :pagination="{ pageSize: 8 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'nomeArquivo'">
          <a @click="downloadDocument(record.id, record.nomeArquivo)">
            {{ record.nomeArquivo }}
          </a>
        </template>
        <template v-else-if="column.key === 'tipoArquivo'">
          <a-tag :color="record.tipoArquivo === 'pdf' ? 'geekblue' : 'green'">
            {{ record.tipoArquivo }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'tamanhoArquivo'">
          <span>{{ (record.tamanhoArquivo / 1024).toFixed(2) }} KB</span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span v-if="isAdmin">
            <a @click="deleteDocument(record.id)">Deletar</a>
            <a-divider type="vertical" />
          </span>
          <a @click="downloadDocument(record.id, record.nomeArquivo)">Baixar</a>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
  import { useStore } from 'vuex';
  import { computed, onMounted, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { message } from 'ant-design-vue';

  const router = useRouter();
  const searchTerm = ref('');
  const store = useStore();

  const isAdmin = computed(() => {
    const role = localStorage.getItem('role');
    console.log('Usuário carregado:', role); // Verificar se o usuário está disponível
    return role === 'admin';
  });

  const navegarParaAdicionarDocumento = () => {
    router.push('/AdicionarDocumento');
  };

  const data = computed(() => store.state.data);

  onMounted(() => {
    store.dispatch('fetchData');
  });

  const downloadDocument = (DocumentCode: string, nomeArquivo: string) => {
    store.dispatch('searchDocumentByCode', { DocumentCode, nomeArquivo });
    store.dispatch('fetchData');
  };

  const deleteDocument = (id: string) => {
    store.dispatch('deleteData', id);
  };

  const onSearch = (nomeArquivo: string) => {
    if (searchTerm.value) {
      try {
        store.dispatch('searchDocumentByName', nomeArquivo);
      } catch (error) {
        message.error('Erro durante a busca! Digite o nome corretamente!');
      }
    } else {
      try {
        store.dispatch('fetchData');
      } catch (error) {
        message.error('Erro ao buscar todos os documentos!');
      }
    }
  };

  watch(searchTerm, (newValue) => {
    if (!newValue) {
      store.dispatch('fetchData');
    }
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      responsive: ['md'],
    },
    {
      title: 'Nome do Arquivo',
      dataIndex: 'nomeArquivo',
      key: 'nomeArquivo',
      width: 200,
    },
    {
      title: 'Tipo do Arquivo',
      dataIndex: 'tipoArquivo',
      key: 'tipoArquivo',
      width: 150,
    },
    {
      title: 'Tamanho do Arquivo (KB)',
      dataIndex: 'tamanhoArquivo',
      key: 'tamanhoArquivo',
      width: 150,
      responsive: ['md'],
    },
    {
      title: 'Ação',
      key: 'action',
      width: 150,
    },
  ];
</script>

<style scoped>
  .table-container {
    padding: 0 20px;
  }

  /* Responsividade */
  @media (max-width: 1024px) {
    .table-container {
      padding: 0 10px;
    }
  }
</style>

  
  
  
  
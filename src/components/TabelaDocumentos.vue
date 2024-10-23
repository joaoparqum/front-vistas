<template>

    <a-button type="primary" @click="navegarParaAdicionarDocumento">Adicionar documento</a-button>
    <br><br>
    <a-input-search
      v-model:value="value"
      placeholder="Pesquisar por nome"
      enter-button
      @search="onSearch"
    />
    <br><br>

    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'nomeArquivo'">
          <a>{{ record.nomeArquivo }}</a>
        </template>
        <template v-else-if="column.key === 'tipoArquivo'">
          <a-tag :color="record.tipoArquivo === 'pdf' ? 'geekblue' : 'green'">
            {{ record.tipoArquivo.toUpperCase() }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'tamanhoArquivo'">
          <span>{{ (record.tamanhoArquivo / 1024).toFixed(2) }} KB</span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a @click="deleteDocument(record.id)">Deletar</a>
            <a-divider type="vertical" />
            <a href="">Baixar</a>
          </span>
        </template>
      </template>
    </a-table>
  </template>
  
  <script lang="ts" setup>
    import { useStore } from 'vuex';
    import { computed, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const navegarParaAdicionarDocumento = () => {
      router.push('/AdicionarDocumento');
    };
    
    const store = useStore();
    
    // Vincule os dados do Vuex à tabela
    const data = computed(() => store.state.data);
    
    // Chame a ação para buscar dados ao montar o componente
    onMounted(() => {
        store.dispatch('fetchData');
    });
    
    // Função para deletar o documento
    const deleteDocument = (id: string) => {
        store.dispatch('deleteData', id);
    };

    const onSearch = (DocumentCode) => {
      if (DocumentCode) {
        store.dispatch('searchDocumentByCode', DocumentCode);
      } else {
        store.dispatch('fetchData');
      }
    };
    
    // Definir as colunas da tabela
    const columns = [
        {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        },
        {
        title: 'Nome do Arquivo',
        dataIndex: 'nomeArquivo',
        key: 'nomeArquivo',
        },
        {
        title: 'Tipo do Arquivo',
        dataIndex: 'tipoArquivo',
        key: 'tipoArquivo',
        },
        {
        title: 'Tamanho do Arquivo (KB)',
        dataIndex: 'tamanhoArquivo',
        key: 'tamanhoArquivo',
        },
        {
        title: 'Ação',
        key: 'action',
        },
    ];
  </script>
  
  
  
  
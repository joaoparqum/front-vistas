<template>
    <div style="display: flex; justify-content: center; align-items: center;">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Usuário"
          name="username"
          :rules="[{ required: true, message: 'Insira seu nome de usuário!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item
          label="Senha"
          name="password"
          :rules="[{ required: true, message: 'Insira sua senha!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-select
          v-model:value="formState.role"
          show-search
          placeholder="Selecione o tipo de usuário"
          style="width: 300px"
          :options="options"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        ></a-select>
        <br><br>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Cadastrar</a-button>
        </a-form-item>
      </a-form>
    </div>
  </template>
  
<script lang="ts" setup>

  import { reactive } from 'vue';
  import { useStore } from 'vuex';
  import { message } from 'ant-design-vue';
  import type { SelectProps } from 'ant-design-vue';
  import { ref } from 'vue';
  
  const store = useStore();

  interface FormState {
      username: string;
      password: string;
      role: string;
  }
  
  const formState = reactive<FormState>({
      username: '',
      password: '',
      role: '',
  });

  const options = ref<SelectProps['options']>([
    { value: 'ADMIN', label: 'Administrador' },
    { value: 'USER', label: 'Usuário' },
  ]);
  
  const onFinish = async () => {
    try {
        await store.dispatch('registerUser', {
            login: formState.username,
            password: formState.password,
            role: formState.role,
        });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
    }
  };
  
  const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
  };
  
  
  const handleChange = (value: string) => {
      console.log(`selected ${value}`);
  };
  
  const handleBlur = () => {
      console.log('blur');
  };
  
  const handleFocus = () => {
      console.log('focus');
  };
  
  const filterOption = (input: string, option: any) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  
  const value = ref<string | undefined>(undefined);
  
</script>
  
  
  
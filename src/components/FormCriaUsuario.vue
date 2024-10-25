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
          v-model:value="value"
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
  
  interface FormState {
      username: string;
      password: string;
      remember: boolean;
  }
  
  const formState = reactive<FormState>({
      username: '',
      password: '',
      remember: true,
  });
  
  const onFinish = (values: any) => {
      console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
  };
  
  import type { SelectProps } from 'ant-design-vue';
  import { ref } from 'vue';
  
  const options = ref<SelectProps['options']>([
      { value: 'adminstrador', label: 'Adminstrador' },
      { value: 'usuário', label: 'Usuario' },
  ]);
  
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
  
  
  
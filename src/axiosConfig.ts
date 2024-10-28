// src/axiosConfig.js
import axios from 'axios';
import store from './store';

// Recupere o token do localStorage (se existir)
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Adicione um interceptor para requisições
axios.interceptors.request.use((config) => {
  const token = store.state.token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axios;

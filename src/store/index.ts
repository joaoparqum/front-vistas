import { createStore, Store } from 'vuex';
import axios from 'axios';
import { message } from 'ant-design-vue';

interface State {
  data: any[];
}

const store = createStore<State>({
  state() {
    return {
      data: [],
      token:  null,
      user: {
        role: 'ADMIN',
      },
      isLoggedIn: false,
    };
  },
  mutations: {
    setData(state, data: any[]) {
      state.data = data;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    setUserRole(state, role) {
      state.user.role = role;
    }
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const response = await axios.post('http://localhost:8080/auth/login', {
          login: username,
          password: password,
        });

        const token = response.data.token;
        commit('setToken', token); 
        
        localStorage.setItem('token', token);
        message.success('Login realizado com sucesso!');
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        message.error('Erro ao fazer login! store');
      }
    },
    async logout({ commit }) {
      commit('setToken', null);
      localStorage.removeItem('token');
    },
    async registerUser({ commit }, userData) {
      try {
        const response = await axios.post('http://localhost:8080/auth/register', userData);
        console.log('Usuário cadastrado com sucesso:', response.data);
        message.success('Usuário cadastrado com sucesso!');

        commit('setUser', userData);
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        message.error('Erro ao cadastrar usuário!');
      }
    },
    async fetchData({ commit }) {
      try {
        const response = await axios.get('http://localhost:8080/vistas');
        commit('setData', response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    },
    async searchDocumentByCode({ commit }, {DocumentCode, nomeArquivo}) {
      try {
        const response = await axios.get(`http://localhost:8080/vistas/download/${DocumentCode}`, {
          responseType: 'blob', // Para garantir que estamos lidando com um arquivo
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', nomeArquivo);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        commit('setData', [response.data]);
      } catch (error) {
        console.error('Erro ao buscar documento por código:', error);
      }
    },
    async searchDocumentByName({commit}, nomeArquivo) {
      try {
        const response = await axios.get(`http://localhost:8080/vistas/nomeArquivo/${nomeArquivo}`);
        commit('setData', response.data);
      } catch (error) {
        console.log("Erro ao buscar documento pelo nome!");
      }
    },
    async deleteData({ dispatch }, id) {
      try {
        await axios.delete(`http://localhost:8080/vistas/delete/${id}`);
        dispatch('fetchData');
      } catch (error) {
        console.error('Erro ao excluir o documento:', error);
      }
    },
    async addDocument({ dispatch }, file: File) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        await axios.post('http://localhost:8080/vistas/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        dispatch('fetchData');
      } catch (error) {
        console.error('Erro ao enviar o documento:', error);
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error('Erro ao adicionar documento.');
        }
      }
    },
  },
  getters: {
    flightData: (state) => state.data,
  },
});

export default store;
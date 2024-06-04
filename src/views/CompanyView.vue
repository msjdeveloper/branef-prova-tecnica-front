<template>
    <div class="container">
      <h1>Companies</h1>
      <button class="btn btn-primary mb-3" @click="showModal(null)">Adicionar Companies</button>
      <table class="table">
        <thead>
          <tr>
            <th>Cnpj</th>
            <th>Nome</th>
            <th>Porte</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company in Companies" :key="company.id">
            <td>{{ company.cnpj }}</td>
            <td>{{ company.companyName }}</td>
            <td>{{ sizeMapping[company.size] }}</td>
            <td>
              <button class="btn btn-warning" @click="showModal(company)">Editar</button>
              <button class="btn btn-danger" @click="confirmDelete(company.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
      <ModalCompany :company="selectedCompany" @saved="fetchCompanies" @close="closeModal" v-if="showModalFlag"/>
    </div>
  </template>
  
  <script>
  import api from '@/axios';
  import ModalCompany from '../components/ModalCompany.vue';
  
  export default {
    name: 'App',
    components: {
      ModalCompany
    },
    data() {
      return {
        Companies: [],
        selectedCompany: null,
        showModalFlag: false,
        sizeMapping: {
          1: 'Pequeno',
          2: 'Médio',
          3: 'Grande'
        }
      };
    },
    methods: {
      fetchCompanies() {
        api.getAll()
          .then(response => {
            this.Companies = response;
          });
      },
      showModal(empresa) {
        this.selectedCompany = empresa;
        this.showModalFlag = true;
      },
      closeModal() {
        this.selectedCompany = null;
        this.showModalFlag = false;
      },
      confirmDelete(id) {
        if (confirm('Você tem certeza que deseja excluir esta empresa?')) {
          api.delete(id)
            .then(() => {
              this.fetchCompanies();
            });
        }
      }
    },
    mounted() {
      this.fetchCompanies();
    }
  };
  </script>
<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h5 class="modal-title" id="modalCompanyLabel">{{ companyData ? 'Edit Company' : 'Create Company' }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')">Fechar</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveEmpresa">
            <div class="mb-3">
              <label for="cnpj" class="form-label">Cnpj</label>
              <input type="text" maxlength="14" class="form-control" id="cnpj" v-model="companyData.cnpj" required>
            </div>
            <div class="mb-3">
              <label for="companyName" class="form-label">Nome</label>
              <input type="text" class="form-control" id="companyName" v-model="companyData.companyName" required>
            </div>
            <div class="mb-3">
              <label for="businessName" class="form-label">Razão Social</label>
              <input type="text" class="form-control" id="businessName" v-model="companyData.businessName" required>
            </div>
            <div class="mb-3">
              <label for="size" class="form-label">Porte</label>
              <select class="form-control" id="size" v-model="companyData.size" required>
                <option value="1">Pequeno</option>
                <option value="2">Médio</option>
                <option value="3">Grande</option>
              </select>
              
            </div>
            <div v-if="errors" class="text-danger">
              <small>{{ errors }}</small>
            </div>
            <button type="submit" class="btn btn-primary">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
  import api from '@/axios';
  
  export default {
    name: 'ModalCompany',
    props: {
      company: Object
    },
    data() {
      return {
        companyData: {
          companyName: '',
          size: '',
          cnpj: '',
          businessName: '',
        },
        errors: {}
      };
    },
    watch: {
      company: {
        immediate: true,
        handler(val) {
          if (val) {
            this.companyData = { ...val };
          } else {
            this.companyData = { companyName: '', size: '', cnpj: '', businessName: '' };
          }
        }
      }
    },
    methods: {
      saveEmpresa() {
        this.errors = {};
        if (this.company) {
          api.update(this.companyData)
            .then(() => {
              this.$emit('saved');
              this.$emit('close');
            })
            .catch(error => {
              if (error.response && error.response.data && error.response.data.errors) {c
                this.errors = Object.values(error.response.data.errors).flat();
              } else {
                this.errors.push('An error occurred while saving the company.');
              }
            });
        } else {
          api.create(this.companyData)
            .then(() => {
              this.$emit('saved');
              this.$emit('close');
            })
            .catch(error => {
              if (error.response && error.response.data && error.response.data.errors) {
                this.errors = Object.values(error.response.data.errors).flat();
              } else {
                this.errors.push('An error occurred while saving the company.');
              }
            });
        }
      }
    },
    mapErrors(errorData) {
      for (const key in errorData) {
        if (errorData.hasOwnProperty(key)) {
          this.errors[key] = errorData[key][0];  // Assuming the error message is an array and we take the first message
        }
      }
    }
  };
</script>
  
<style scoped>
  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 50%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.text-danger {
  color: #dc3545;
}
</style>
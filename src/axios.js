import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:5018/api/Company',
    json: true
})

export default {
    async execute(method, resource, data) {
        return client({
            method,
            url: resource,
            data
        }).then(req => {
            return req.data
        })
    },
    getAll() {
        return this.execute('get', '/GetCompanies')
    },
    getById(id) {
        return this.execute('get', `/GetCompanyById/${id}`)
    },
    create(data) {
        return this.execute('post', '/CreateCompany', data)
    },
    update(data) {
        return this.execute('put', `/UpdateCompany`, data)
    },
    delete(id) {
        return this.execute('delete', `/DeleteCompany/${id}`)
    }
}
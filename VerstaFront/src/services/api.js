import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

export const orderApi = {
  getAll: () => 
    api.get('/Order/GetOrders').then(r => r.data),
  
  getById: (id) => 
    api.get('/Order/GetOrderById', { params: { id } }).then(r => r.data),
  
  create: (dto) => 
    api.post('/Order/CreateOrder', dto).then(r => r.data),
  
  delete: (id) => 
    api.delete('/Order/DeleteOrder', { params: { id } }).then(r => r.data),
};

export default api;
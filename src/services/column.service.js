import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/v1/';

class ColumnService {
  getColumns() {
    return axios.get(API_URL + `columns`, { headers: authHeader() });
  }

  createColumn(params) {
    return axios.post(API_URL + 'columns', params, { headers: authHeader()});
  }

  updateColumn(id, params) {
    return axios.patch(API_URL + `columns/${id}`, params, { headers: authHeader() });
  }

  deleteColumn(id) {
    return axios.delete(API_URL + `columns/${id}`, { headers: authHeader() });
  }
}

export default new ColumnService();

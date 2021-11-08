import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/v1/';

class TaskService {
  getTasks() {
    return axios.get(API_URL + `tasks`, { headers: authHeader() });
  }

  createTask(params) {
    return axios.post(API_URL + 'tasks', params, { headers: authHeader()});
  }

  updateTask(id, params) {
    return axios.patch(API_URL + `tasks/${id}`, params, { headers: authHeader() });
  }

  deleteTask(id) {
    return axios.delete(API_URL + `tasks/${id}`, { headers: authHeader() });
  }
}

export default new TaskService();
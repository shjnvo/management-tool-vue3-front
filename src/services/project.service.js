import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/v1/';

class ProjectService {
  getProjects() {
    return axios.get(API_URL + `projects`, { headers: authHeader() });
  }

  createProject(params) {
    return axios.post(API_URL + 'projects', params, { headers: authHeader()});
  }

  updateProject(id, params) {
    return axios.patch(API_URL + `projects/${id}`, params, { headers: authHeader() });
  }

  deleteProject(id) {
    return axios.delete(API_URL + `projects/${id}`, { headers: authHeader() });
  }

  projectBroad(id) {
    return axios.get(API_URL + `projects/${id}`, { headers: authHeader() });
  }

  inviteUser(params) {
    return axios.post(API_URL + `projects/${params.id}/invite_user`, params, { headers: authHeader() });
  }
}

export default new ProjectService();

import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/v1/';

class AuthService {
  async login(user) {
    const response = await axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      });
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  }

  logout() {
    console.log(authHeader())
    axios.delete(API_URL + 'logout', { headers: authHeader() }).then( response => {
      localStorage.removeItem('user');

      return response.data
    });
  }

  register(user) {
    return axios.post(API_URL + 'users', {
      name: user.name,
      email: user.email,
      nick_name: user.nick_name
    });
  }
}

export default new AuthService();

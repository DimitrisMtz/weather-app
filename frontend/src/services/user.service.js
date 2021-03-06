import axios from 'axios';
import authHeader from './auth-header';
const API_URL = "http://127.0.0.1:5000";

class UserService {
    getPublicContent() {
        return axios.get(API_URL);
    }
    getUserBoard() {
        return axios.get(API_URL, { headers: authHeader() });
    }
    getAdminBoard() {
        return axios.get(API_URL, { headers: authHeader() });
    }
}
export default new UserService();
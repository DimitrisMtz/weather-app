import axios from "axios";
const API_URL = "http://127.0.0.1:5000";

class AuthService {
    login(username, password) {
        return axios
        .post(`${API_URL}/login`, { username, password })
        .then((response) => {
            if (response.data.access_token) {
                localStorage.setItem("token", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    register(username, email, password) {
        return axios
        .post(`${API_URL}/register`, { username, email, password })
        .then((response) => {
            if (response.data.access_token) {
                localStorage.setItem("token", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    logout() {
        localStorage.removeItem("token");
    }
}
export default new AuthService();
import axios from 'axios';


class AuthService {
    constructor() {
        this.baseUrl = process.env.REACT_APP_API_BASE_URL + "/auth";
        this.token = localStorage.getItem('jwt_token');
    }

    login(login, password) {
        const url = `${this.baseUrl}/login`;
        const data = {
            "login" : login,
            "password": password
        };
        axios.post(url, data)
        .then(response => {
            if(response.data){
                localStorage.setItem("jwt_token", response?.data?.access_token);
                if(response?.data?.utilisateur){
                    localStorage.setItem("current_user", JSON.stringify(response?.data?.utilisateur));
                }
            }
        })
        .catch(error => {})
    }

    logout() {
        this.token = null;
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('current_user');
    }

    isAuthenticated() {
        const token = localStorage.getItem('jwt_token');  
        return token != null && token.length > 0;
    } 
}

export default new AuthService();

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
                window.location.href = "/"
            }
        })
        .catch(error => {})
    }

    logout() {
        
        const url = `${this.baseUrl}/logout`;
        const token = localStorage.getItem('jwt_token');
        const headers = { Authorization: `Bearer ${token}` };
       
        axios.post(url, {},  { headers })
        .then(response => {
            this.token = null;
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('current_user');
            window.location.href = "/login"
        })
        .catch(error => {})
    }

    isAuthenticated() {
        const token = localStorage.getItem('jwt_token');  
        return token != null && token.length > 0;
    } 
    isAdmin() {
        const current_user = JSON.parse(localStorage.getItem('current_user'))
        if(current_user.is_admin){
            return true
        }else {
            return false 
        }
    }
}

export default new AuthService();

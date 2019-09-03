import decode from 'jwt-decode';
import Axios from 'axios';
 class AuthService {
    // Initializing important variables
    //http://10.196.11.101:5002
    constructor(domain) {
        this.domain = domain || 'https://registerservicebackendappservice1.azurewebsites.net'// API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)

        this.state= {
            email_id:'',
            password:''
        }
    }
   
    login(email_id, password) {
        localStorage.setItem('email_id', email_id)
         return Axios.post(`${this.domain}/login`,{
              email_id:email_id,
              password:password
            })
        .then(res => {
            this.setToken(res.data.token)
            alert(JSON.stringify(res.data)) // Setting the token in localStorage
          //  localStorage.setItem('email_id', emil_id)
            //console.log(res.token)
            
            return Promise.resolve(res);
        })
        .catch(err => {
            console.log(err);
            alert( err);
        })
    }

   
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)

    }
  
    getToken() {
        // Retrieves the user token from localStorage
        console.log(localStorage.getItem('id_token'))
        return localStorage.getItem('id_token')

    }

    getEmailId() {
        // Retrieves the user email_id from localStorage
     
        return localStorage.getItem('email_id')
    }
    
    logout() {
        // Clear user token and profile data from localStorage

        localStorage.removeItem('id_token');

    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }
   
    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}

export default AuthService;
import React, { Component } from 'react';
import AuthService from './AuthService';
//import App from 'C:/Users/adas65/Desktop/ReactLoginTrial/login-two/HealthInsurancePortal/src//App';
import Home from './Home'
//import PayerNavBar from 'C:/Users/adas65/Desktop/ReactLoginTrial/login-two/HealthInsurancePortal/src/payerservice/PayerNavBar'
 function withAuth(AuthComponent) {
    const Auth = new AuthService('url');
   
    return class AuthWrapped extends Component {
    
        constructor() {
        super();
        this.state = {
            user: null
        }
       }
      
       componentWillMount() {
       
        if (!Auth.loggedIn()) {
            this.props.history.replace('/sign-in')
        }
        
        else {
            try {
                const profile = Auth.getProfile()
                this.setState({
                    user: profile
                })
            }
            catch(err){
                Auth.logout()
                this.props.history.replace('/sign-in')
            }
        }
      }
     
     
      render() {
        if (this.state.user) {
            return (
                <AuthComponent history={this.props.history} user={this.state.user} />
            )
        }
       
        else {
            return null
        }
    }
  }
}

export default withAuth(Home);
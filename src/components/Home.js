import React from 'react'
import AuthService from './AuthService';
//import withAuth from './withAuth';

const Auth = new AuthService();

class Home extends React.Component {
   
    componentWillMount() {
        Auth.logout()
        this.props.history.replace('/sign-in');
     }
     //{this.props.user.username}
     render(){
        return(
            <div>
                 <div className="App-header">
                    <h2>Welcome </h2>
                </div>
                 <p className="App-intro">
                    <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
                 </p> 
            </div>
        )
    }
}

export default Home;
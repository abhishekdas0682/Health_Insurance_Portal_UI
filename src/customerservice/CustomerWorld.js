import React, { Component } from 'react'
import CustomerNavBar from './CustomerNavBar';
import CustomerTop from './CustomerTop';
import CustomerBuyPolicy from './CustomerBuyPolicy';
import AuthService from '../components/AuthService'
import axios from 'axios';

import { Button } from 'react-bootstrap';

const Auth = new AuthService();

export class CustomerWorld extends Component {
    constructor(){
        super();
        this.state = {
            email_id: localStorage.getItem('email_id'),
            token: localStorage.getItem('id_token')
        }
    }


    handleLogout(){
        axios.post('https://registerservicebackendappservice1.azurewebsites.net/logout', {email_id: this.state.email_id}, {headers: {token: this.state.token}})
        Auth.logout()
        this.props.history.replace('/sign-in');
     }

    render() {
        return (
            <div>
                <CustomerNavBar />
                
                <p className="App-intro">
                Hello Customer  <Button variant="secondary" type="button" className="float-right" onClick={this.handleLogout.bind(this)}>Logout</Button>
                </p>
                <CustomerTop />
                <div>
                    <CustomerBuyPolicy />
                </div>

            </div>
        )
    }

}
export default CustomerWorld

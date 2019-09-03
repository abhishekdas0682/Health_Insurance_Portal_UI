import React, { Component } from 'react'
import PayerNavBar from './PayerNavBar';
import PayerViewAllPolicy from './PayerViewAllPolicy'
import AuthService from '../components/AuthService'
import PayerTop from './PayerTop'
import axios from 'axios';

import { Button } from 'react-bootstrap';

const Auth = new AuthService();

export class PayerWorld extends Component {
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
                <PayerNavBar />
               
                <p className="App-intro">
                Hello Payer
                    <Button type="button" className="float-right" onClick={this.handleLogout.bind(this)}>Logout</Button>
                </p>
                <PayerTop />
                <PayerViewAllPolicy />
            </div>
        )
    }
}

export default PayerWorld

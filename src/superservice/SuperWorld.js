import React, { Component } from 'react'
import SuperNavBar from './SuperNavBar';
import SuperTop from './SuperTop';
//import DatatablePage from './SuperViewAllPolicy'
import SuperViewAllPolicy from './SuperViewAllPolicy'
import axios from 'axios';
import AuthService from '../components/AuthService'

import { Button } from 'react-bootstrap';

const Auth = new AuthService();


export class SuperWorld extends Component {
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
                <SuperNavBar />
                <p className="App-intro">
                Hello Super-user  <Button type="button" className="float-right" onClick={this.handleLogout.bind(this)}>Logout</Button>
                </p>
                <SuperTop />
                <SuperViewAllPolicy />
                
            </div>
        )
    }
}

export default SuperWorld

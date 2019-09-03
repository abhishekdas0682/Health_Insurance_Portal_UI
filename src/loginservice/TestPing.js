import React, { Component } from 'react'
import axios from 'axios';
import AuthService from '../components/AuthService'

import { Button } from 'react-bootstrap';

const Auth = new AuthService();

export class TestPing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            token: '',
        }
    }

    componentDidMount() {
        this.setState({
            id_token: Auth.getToken()
        })
        axios.get('http://10.196.11.101:5002/protectedPing', {
             headers: {
                 'token' : localStorage.getItem('id_token')
                } });
            }

    render() {
        return (
            <div>
                <h1>Here's Your Ping {this.state.token}</h1> 
                <Button type="button" className="float-right" onClick={this.handleLogout.bind(this)}>Logout</Button>
            </div>
        )
    }
}

export default TestPing

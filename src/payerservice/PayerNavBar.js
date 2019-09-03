import React, { Component } from 'react'
import { Nav, Navbar,/* Button, Form, FormControl, NavDropdown*/ } from 'react-bootstrap';
import logo from './opitum.png';
//import { Redirect } from 'react-router-dom';
//import AuthService from '../components/AuthService';

//import withAuth from './withAuth';
//import Home from 'C:/Users/adas65/Desktop/ReactLoginTrial/login-two/HealthInsurancePortal/src/components/Home'

//import AuthHelperMethods from 'C:/Users/adas65/Desktop/ReactLoginTrial/login-two/HealthInsurancePortal/src/components/AuthHelperMethods';

//const Auth = new AuthService();

export class PayerNavBar extends Component {

    // Auth = new AuthHelperMethods();
    // handleLogout(){
    //     Auth.logout()
    //     this.props.history.replace('/sign-in');
    //  }

    render() {
        return (
            <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>
                    <img
                        alt=""
                        src={logo}
                        width="80"
                        height=""
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Brand href="#home">Health Insurance Portal</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/payer-world">Home</Nav.Link>
                        <Nav.Link href="/payer-view-all-policy">Policies</Nav.Link>
                        <Nav.Link href="/payer-profile">Profile</Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" /> 
                        <Button variant="outline-success" onClick={this.handleLogout.bind(this)}>Logout</Button>
                    </Form> */}
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }
}


export default PayerNavBar

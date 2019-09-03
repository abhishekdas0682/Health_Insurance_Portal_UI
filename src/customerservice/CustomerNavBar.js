import React, { Component } from 'react'
import { Nav, Navbar/*, Button, Form, FormControl*/, NavDropdown } from 'react-bootstrap';
import logo from './opitum.png';
//import AuthService from '../components/AuthService'

//const Auth = new AuthService();

export class CustomerNavBar extends Component {

    // Auth = new AuthHelperMethods();

    // handleLogout(){
    //     Auth.logout()
    //     this.props.history.replace('/sign-in');
    //  }

    render() {
        return (
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
                        <Nav.Link href="/customer-world">Home</Nav.Link>
                        {/* <Nav.Link href="/temp-world">Policies</Nav.Link> */}
                        <Nav.Link href="/customer-profile">Profile</Nav.Link>
                        <NavDropdown title="Policies" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/customer-view-all-policy">View All Policies</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/customer-my-policy">View My Policies</NavDropdown.Item>
                            <NavDropdown.Item href="/customer-transaction-history">View My Transaction History</NavDropdown.Item>

                            {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                        </NavDropdown>
                    </Nav>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}


export default CustomerNavBar

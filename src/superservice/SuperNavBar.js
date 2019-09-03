import React, { Component } from 'react'
import { Nav, Navbar,/* Button, Form,, FormControl,*/ NavDropdown } from 'react-bootstrap';
import logo from './opitum.png';

export class SuperNavBar extends Component {
    // constructor(props) {
    //     super(props);
    
    //     this._handleLogout = this._handleLogout.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //   }
    // Auth = new AuthHelperMethods();

    // _handleLogout(props) {
    //     //this.Auth.logout()
    //     this.props.history.push('/sign-in');
    // }
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
                        <Nav.Link href="/super-world">Home</Nav.Link>
                        <Nav.Link href="/super-profile">Profile</Nav.Link>
                        <NavDropdown title="Policies" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/super-policy">View All Policies</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/super-buy-policy">Buy Policies for Customers</NavDropdown.Item>
                            <NavDropdown.Item href="/super-view-customer-plan">View Plans purchased by Customers</NavDropdown.Item>
                            
                            {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                        </NavDropdown> 
                        <Nav.Link href="/super-administration">Administration</Nav.Link> 
                    </Nav>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success" onClick={this._handleLogout}>Logout</Button>
                    </Form> */}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}


export default SuperNavBar

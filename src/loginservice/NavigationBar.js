import React, { Component } from 'react'
import { Nav, Navbar/*, NavDropdown, Button, Form, FormControl*/ } from 'react-bootstrap';
import logo from './opitum.png';

export class NavigationBar extends Component {
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
                <Navbar.Brand>Health Insurance Portal</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/sign-in">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
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
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}


export default NavigationBar

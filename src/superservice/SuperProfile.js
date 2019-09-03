import React, { Component } from 'react'
import SuperNavBar from './SuperNavBar';
import AuthService from '../components/AuthService'
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const Auth = new AuthService();

class SuperProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            customer_profile: [],
            tableRows: [],
            user_name: '',
            email_id: localStorage.getItem('email_id'),
            token: localStorage.getItem('id_token'),
            contact_number: '',
            date_of_birth: '',
            gender: '',
            address: '',
            role: '',
            editDetailsData: {
                user_name: '',
                contact_number: '',
                gender: '',
                address: '',
            },
            editDetailsModal: false,
        }

    }

    componentWillMount() {
        this._refreshProfile();
    }

    toggleEditDetailsModal() {
        this.setState({
            editDetailsModal: !this.state.editDetailsModal
        });
        //this.state.newPolicyModal = true;
    }


    handleLogout() {
        axios.post('https://registerservicebackendappservice1.azurewebsites.net/logout', {email_id: this.state.email_id}, {headers: {token: this.state.token}})
        Auth.logout()
        this.props.history.replace('/sign-in');
    }

    updateTheProfile() {
        let { user_name, contact_number, address } = this.state.editDetailsData;

        //https://customerservicebackendappservice.azurewebsites.net/updatedetails
        axios.post('https://customerservicebackendappservice.azurewebsites.net/updatedetails', {
            email_id: this.state.email_id, user_name, contact_number, address
        },
        {headers: {token: this.state.token}}
        ).then((response) => {
            this._refreshProfile();
            //console.log(response.data);

            this.setState({
                editDetailsModal: false, editDetailsData: { user_name: '', contact_number: '', address: '' }
            })
        })
    }

    editDetails(user_name, contact_number, address) {
        this.setState({
            editDetailsData: { user_name, contact_number, address },
            editDetailsModal: !this.state.editDetailsModal
        });
    }

    _refreshProfile() {
        this.setState({
            email_id: localStorage.getItem('email_id')
        })

        var that = this;


        axios.post('https://customerservicebackendappservice.azurewebsites.net/details',
            {
                email_id: this.state.email_id
            },
            {headers: {token: this.state.token}}
        ).then((response) => {

            that.setState({
                user_name: response.data[0]['user_name'],
                email_id: response.data[0]['email_id'],
                contact_number: response.data[0]['contact_number'],
                date_of_birth: response.data[0]['date_of_birth'],
                gender: response.data[0]['gender'],
                address: response.data[0]['address'],
                role: response.data[0]['role'],

            })
            //console.log(that.state);

            that.state.customer_profile = response.data


            //console.log(that.state.customer_profile)

            that.assemblePosts();


        }).catch(error => {
            console.log(error)
        })
    }


    assemblePosts = () => {

        let customer_profile = this.state.customer_profile.map((customer_profile) => {

            return (
                {

                    user_name: customer_profile.user_name,
                    email_id: customer_profile.email_id,
                    contact_number: customer_profile.contact_number,
                    date_of_birth: customer_profile.date_of_birth,
                    gender: customer_profile.gender,
                    address: customer_profile.address,
                    role: customer_profile.role,

                }

            )

        });
        return customer_profile



    }


    render() {



        //     let customer_profile = this.state.customer_profile.map((customer_profile) => {
        //         return (
        //             <tr key={customer_profile.id}>
        //             <tr>{customer_profile.user_name}</tr>
        //             <tr>{customer_profile.email_id}</tr>
        //             <tr>{customer_profile.contact_number}</tr>
        //             <tr>{customer_profile.gender}</tr>
        //             <tr>{customer_profile.address}</tr>
        //             <tr>{customer_profile.role}</tr>
        //         </tr>
        //     )
        // });


        return (
            <div>
                <SuperNavBar />
                <p className="App-intro">
                    
                        <Button type="button" className="float-right" onClick={this.handleLogout.bind(this)}>Logout</Button>
                </p>
                <div className="container">
                    <div className="jumbotron mt-5">
                        <div className="col-sm-8 mx-auto">

                            <h1 className="text">PROFILE</h1>
                        </div>
                        <table className="table col-md-6 mx-auto">
                            <tbody>
                                <tr>
                                    <td>Name:</td>
                                    <td>{this.state.user_name}</td>
                                </tr>
                                <tr>
                                    <td>Email Address:</td>
                                    <td>{this.state.email_id}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number:</td>
                                    <td>{this.state.contact_number}</td>
                                </tr>
                                <tr>
                                    <td>Date of Birth:</td>
                                    <td>{this.state.date_of_birth}</td>
                                </tr>
                                <tr>
                                    <td>Gender:</td>
                                    <td>{this.state.gender}</td>
                                </tr>
                                <tr>
                                    <td>Address:</td>
                                    <td>{this.state.address}</td>
                                </tr>
                                <tr>
                                    <td>Role:</td>
                                    <td>Customer</td>
                                </tr>
                            </tbody>
                        </table>
                        {/* <Button className="float-right" onClick={this.toggleUpdateDetailsModal.bind(this)}>Update Details</Button> */}
                        <Button className="float-right" onClick={this.editDetails.bind(this, this.state.user_name, this.state.contact_number, this.state.address)}>Update Details</Button>
                        <Modal isOpen={this.state.editDetailsModal} toggle={this.toggleEditDetailsModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditDetailsModal.bind(this)}>Update your profile</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="user_name">Name</Label>
                                    <Input id="user_name" placeholder="Enter the name you want to update" value={this.state.editDetailsData.user_name} onChange={(e) => {
                                        let { editDetailsData } = this.state;
                                        editDetailsData.user_name = e.target.value;
                                        this.setState({ editDetailsData });
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="contact_number">Phone Number</Label>
                                    <Input id="contact_number" placeholder="Enter the contact number you want to update" value={this.state.editDetailsData.contact_number} onChange={(e) => {
                                        let { editDetailsData } = this.state;
                                        editDetailsData.contact_number = e.target.value;
                                        this.setState({ editDetailsData });
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="address">Address</Label>
                                    <Input id="address" placeholder="Enter the address you want to update" value={this.state.editDetailsData.address} onChange={(e) => {
                                        let { editDetailsData } = this.state;
                                        editDetailsData.address = e.target.value;
                                        this.setState({ editDetailsData });
                                    }} />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.updateTheProfile.bind(this)}>Update</Button>{' '}
                                <Button color="secondary" onClick={this.toggleEditDetailsModal.bind(this)}>Cancel</Button>
                            </ModalFooter>
                        </Modal>

                    </div>
                </div>
            </div>
        )

    }
}
export default SuperProfile


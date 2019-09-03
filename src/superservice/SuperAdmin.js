import React, { Component } from 'react'
import { FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button/*, Input*/ } from 'reactstrap';
import SuperNavBar from './SuperNavBar';
//import SuperTop from './SuperTop';
import AuthService from '../components/AuthService'

import axios from 'axios'

const Auth = new AuthService();


export class SuperAdmin extends Component {
    state = {
        admin: [],
        token: localStorage.getItem('id_token'),
        editAdminData: {
            // pid: '',
            //user_id: '',
            //user_name: '',
            email_id: '',
            request_status: '',
            //address: '',
            request_date: '',
            role: '',
            request_id: '',
            admin_email_id: '',
        },
        deleteAdminData: {
            // pid: '',
            //user_id: '',
            //user_name: '',
            email_id: '',
            request_status: '',
            //address: '',
            request_date: '',
            role: '',
            request_id: '',
            admin_email_id: '',
        },
        editAdminModal: false
    }

    componentWillMount() {
        this._refreshAdmin();
    }

    toggleEditAdminModal() {
        this.setState({
            editAdminModal: !this.state.editAdminModal
        });
        //this.state.newPolicyModal = true;
    }

    toggleDeleteAdminModal() {
        this.setState({
            deleteAdminModal: !this.state.deleteAdminModal
        });
        //this.state.newPolicyModal = true;
    }

    componentDidMount() {
        this.setState({
            admin_email_id: Auth.getEmailId()

        })
    }

    approveAdmin() {
        let { email_id } = this.state.editAdminData;

        axios.post('https://policyservicebackendappservice.azurewebsites.net/approverequestsAdmin', {
            email_id, admin_email_id: this.state.admin_email_id
        },
        {headers: {token: this.state.token}}
        ).then((response) => {
            this._refreshAdmin();
            //console.log(response.data);
            alert(JSON.stringify(response.data));

            this.setState({
                editAdminModal: false, alert_message: "update", editAdminData: { email_id: '', admin_email_id: '' }
            })
        })
    }

    editAdmin(request_status, email_id, admin_email_id) {
        this.setState({
            editAdminData: { request_status, email_id, admin_email_id },
            editAdminModal: !this.state.editAdminModal
        });
    }


    ddeleteAdmin() {
        let { email_id } = this.state.deleteAdminData;

        axios.post('https://policyservicebackendappservice.azurewebsites.net/deleterequests', {
            email_id, admin_email_id: this.state.admin_email_id
        },
        {headers: {token: this.state.token}}
        ).then((response) => {
            this._refreshAdmin();
            //console.log(response.data);
            alert(JSON.stringify(response.data));
            

            this.setState({
                deleteAdminModal: false, alert_message: "update", deleteAdminData: { email_id: '', admin_email_id: '' }
            })
        })
    }

    deleteAdmin(request_status, email_id, admin_email_id) {
        this.setState({
            deleteAdminData: { request_status, email_id, admin_email_id },
            deleteAdminModal: !this.state.editAdminModal
        });
    }

    _refreshAdmin() {
        axios.get('https://policyservicebackendappservice.azurewebsites.net/getrequestsAdmin', {headers: {token: this.state.token}}).then((response) => {
            this.setState({
                admin: response.data
            })
        })
    }

    handleLogout() {
        axios.post('https://registerservicebackendappservice1.azurewebsites.net/logout', {email_id: this.state.email_id}, {headers: {token: this.state.token}})
        Auth.logout()
        this.props.history.replace('/sign-in');
    }

    render() {
        let admin = this.state.admin.map((admin) => {
            return (
                <tr key={admin.id}>

                    <td>{admin.email_id}</td>
                    <td>{admin.request_id}</td>
                    <td>{admin.request_date}</td>
                    <td>{admin.request_status}</td>
                    <td>{admin.role}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2" onClick={this.editAdmin.bind(this, admin.request_status, admin.email_id, admin.admin_email_id)}>Approve Request</Button>
                        <Button color="danger" size="sm" className="mr-2" onClick={this.deleteAdmin.bind(this, admin.request_status, admin.email_id, admin.admin_email_id)}>Delete Request</Button>

                    </td>
                </tr>
            )
        });
        return (
            <div>
                <SuperNavBar />
                <p className="App-intro">
                    Hello Super-user  <Button type="button" className="float-right" onClick={this.handleLogout.bind(this)}>Logout</Button>
                </p>

                <div className="App Container">

                    <Modal isOpen={this.state.editAdminModal} toggle={this.toggleEditAdminModal.bind(this)}>
                        <ModalHeader toggle={this.toggleEditAdminModal.bind(this)}>Approve Request</ModalHeader>
                        <ModalBody>
                            {/* <FormGroup>
                                <Label for="request_status">Request Status</Label>
                                <Input id="request_status" placeholder="Change the Request ID to 1/0" value={this.state.editAdminData.request_status} onChange={(e) => {
                                    let { editAdminData } = this.state;
                                    editAdminData.request_status = e.target.value;
                                    this.setState({ editAdminData });
                                }} />
                            </FormGroup> */}
                            {/* <FormGroup>
                                <Label for="admin_email_id">Super User Email ID</Label>
                                <Input id="admin_email_id" placeholder="Enter your email-id" value={this.state.editAdminData.admin_email_id} onChange={(e) => {
                                    let { editAdminData } = this.state;
                                    editAdminData.admin_email_id = e.target.value;
                                    this.setState({ editAdminData });
                                }} />
                            </FormGroup> */}
                            <FormGroup>
                                <Label for="email_id">Are you sure you want to approve the request of this user?</Label>
                                {/* <Input id="email_id" placeholder="Enter the Email ID of the Request user" value={this.state.editAdminData.email_id} onChange={(e) => {
                                    let { editAdminData } = this.state;
                                    editAdminData.email_id = e.target.value;
                                    this.setState({ editAdminData });
                                }} /> */}
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.approveAdmin.bind(this)}>Approve</Button>{' '}
                            <Button color="secondary" onClick={this.toggleEditAdminModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>


                    <Modal isOpen={this.state.deleteAdminModal} toggle={this.toggleDeleteAdminModal.bind(this)}>
                        <ModalHeader toggle={this.toggleDeleteAdminModal.bind(this)}>Delete Request</ModalHeader>
                        <ModalBody>
                            {/* <FormGroup>
                                <Label for="request_status">Request Status</Label>
                                <Input id="request_status" placeholder="Change the Request ID to 1/0" value={this.state.editAdminData.request_status} onChange={(e) => {
                                    let { editAdminData } = this.state;
                                    editAdminData.request_status = e.target.value;
                                    this.setState({ editAdminData });
                                }} />
                            </FormGroup> */}
                            {/* <FormGroup>
                                <Label for="admin_email_id">Super User Email ID</Label>
                                <Input id="admin_email_id" placeholder="Enter your email-id" value={this.state.editAdminData.admin_email_id} onChange={(e) => {
                                    let { editAdminData } = this.state;
                                    editAdminData.admin_email_id = e.target.value;
                                    this.setState({ editAdminData });
                                }} />
                            </FormGroup> */}
                            <FormGroup>
                                <Label for="email_id">Are you sure you want to delete the request of this user?</Label>
                                {/* <Input id="email_id" placeholder="Enter the Email ID of the Request user" value={this.state.editAdminData.email_id} onChange={(e) => {
                                    let { editAdminData } = this.state;
                                    editAdminData.email_id = e.target.value;
                                    this.setState({ editAdminData });
                                }} /> */}
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.ddeleteAdmin.bind(this)}>Delete</Button>{' '}
                            <Button color="secondary" onClick={this.toggleDeleteAdminModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>


                    <Table stripped bordered>
                        <thead>
                            <tr>
                                <th>Email ID</th>
                                <th>Request ID</th>
                                <th>Request Date</th>
                                <th>Request Status</th>
                                <th>Request For</th>
                                <th>Request Access</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admin}
                        </tbody>
                    </Table>

                </div>
            </div>
        )
    }
}

export default SuperAdmin

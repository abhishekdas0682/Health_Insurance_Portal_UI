import React, { Component } from 'react'
import { FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button, Input } from 'reactstrap';
//import SuperNavBar from './SuperNavBar';
//import SuperTop from './SuperTop';
import AuthService from '../components/AuthService'

import axios from 'axios'

const Auth = new AuthService();

export class BuyForReal extends Component {
    state = {
        admin: [],
        email_id: '',
        token: localStorage.getItem('id_token'),
        buyAdminData: {
            // pid: '',
            policy_name: '',
            description: '',
            share: '',
            premium_amount: '',
            coverage_amount: '',
            is_active: '',
            end_date: '',
            email_id: '',
            admin_email_id: localStorage.getItem('email_id'),
        },
        buyAdminModal: false
    }

    componentWillMount() {
        this._refreshAdmin();
    }

    toggleBuyAdminModal() {
        this.setState({
            buyAdminModal: !this.state.buyAdminModal
        });
        //this.state.newPolicyModal = true;
    }
    componentDidMount() {
        this.setState({
            admin_email_id: Auth.getEmailId()

        })
    }

    approveAdmin() {
        let { email_id, plan_id, share, premium_amount, coverage_amount } = this.state.buyAdminData;

        axios.post('https://customerservicebackendappservice.azurewebsites.net/purchasepolicyadmin', {
            email_id, admin_email_id: this.state.admin_email_id, plan_id, share, premium_amount, coverage_amount
        },
        {headers: {token: this.state.token}}).then((response) => {
            this._refreshAdmin();
            //console.log(response.data);

            this.setState({
                buyAdminModal: false, buyAdminData: { email_id: '', plan_id: '', share: '', premium_amount: '', coverage_amount: ''}
            })
        })
    }

    buyAdmin(email_id, admin_email_id, plan_id, share, premium_amount, coverage_amount) {
        this.setState({
            buyAdminData: {email_id, admin_email_id, plan_id, share, premium_amount, coverage_amount },
            buyAdminModal: !this.state.buyAdminModal
        });
    }

    _refreshAdmin() {
        axios.get('https://policyservicebackendappservice.azurewebsites.net/viewallpolicies', {headers: {token: this.state.token}}).then((response) => {
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
                    <td>{admin.plan_id}</td>
                    <td>{admin.policy_name}</td>
                    <td>{admin.description}</td>
                    <td>{admin.share}</td>
                    <td>{admin.premium_amount}</td>
                    <td>{admin.coverage_amount}</td>
                    <td>{admin.is_active}</td>
                    <td>{admin.end_date}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2" onClick={this.buyAdmin.bind(this, admin.email_id, admin.admin_email_id, admin.plan_id, admin.share, admin.premium_amount, admin.coverage_amount)}>Buy for Customer</Button>

                    </td>
                </tr>
            )
        });
        return (
            <div>


                <div className="App Container">

                    <Modal isOpen={this.state.buyAdminModal} toggle={this.toggleBuyAdminModal.bind(this)}>
                        <ModalHeader toggle={this.toggleBuyAdminModal.bind(this)}>Buy Plans</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="email_id">Email ID of the Customer</Label>
                                <Input id="email_id" placeholder="Enter the Email-ID" value={this.state.buyAdminData.email_id} onChange={(e) => {
                                    let { buyAdminData } = this.state;
                                    buyAdminData.email_id = e.target.value;
                                    this.setState({ buyAdminData });
                                }} />
                            </FormGroup>
                            {/* <FormGroup>
                                <Label for="admin_email_id">Super User Email ID</Label>
                                <Input id="admin_email_id" placeholder="Enter your email-id" value={this.state.editAdminData.admin_email_id} onChange={(e) => {
                                    let { editAdminData } = this.state;
                                    editAdminData.admin_email_id = e.target.value;
                                    this.setState({ editAdminData });
                                }} />
                            </FormGroup> */}
                            {/* <FormGroup>
                                <Label for="email_id">Email ID of the Customer</Label>
                                <Input id="email_id" placeholder="Enter the Email-ID" value={this.state.buyAdminData.email_id} onChange={(e) => {
                                    let { buyAdminData } = this.state;
                                    buyAdminData.email_id = e.target.value;
                                    this.setState({ buyAdminData });
                                }} />
                            </FormGroup> */}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.approveAdmin.bind(this)}>Approve</Button>{' '}
                            <Button color="secondary" onClick={this.toggleBuyAdminModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>


                    <Table stripped bordered>
                        <thead>
                            <tr>
                                <th>Policy ID</th>
                                <th>Plan Name</th>
                                <th>Description</th>
                                <th>Share</th>
                                <th>Premium Amount</th>
                                <th>Coverage Amount</th>
                                <th>Active Status</th>
                                <th>End Date</th>
                                <th>Policy Status</th>
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


export default BuyForReal

import React, { Component } from 'react'
import PayerNavBar from './PayerNavBar';
import { Input, Form, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
//import { FormControl } from 'react-bootstrap';
import PayerTop from './PayerTop'

import PolicyAdd from '../components/PolicyAdd';
import PolicyDelete from '../components/PolicyDelete';
import PolicyUpdated from '../components/PolicyUpdated';

import axios from 'axios'
import AuthService from '../components/AuthService'


const Auth = new AuthService();

class TempWorld extends Component {
    state = {
        policies: [],
        filtered: [],
        alert_message: '',
        email_id: localStorage.getItem('email_id'),
        token: localStorage.getItem('id_token'),
        newPolicyData: {
            // pid: '',
            plan_id: '',
            policy_name: '',
            description: '',
            share: '',
            premium_amount: '',
            coverage_amount: '',
            is_active: '',
            //start_date: '',
            end_date: '',
        },
        editPolicyData: {
            //  pid: '',
            plan_id: '',
            policy_name: '',
            description: '',
            share: '',
            premium_amount: '',
            coverage_amount: '',
            is_active: '',
            start_date: '',
            end_date: '',
        },
        ddeletePolicyData: {
            //  pid: '',
            plan_id: '',
            //policy_name: '',
            //description: '',
            share: '',
            //premium_amount: '',
            coverage_amount: '',
            //is_active: '',
            //start_date: '',
            //end_date: '',
        },
        newPolicyModal: false,
        editPolicyModal: false,
        ddeletePolicyModal: false
    }
    componentWillMount() {
        this._refreshPolicy();
    }

    toggleNewPolicyModal() {
        this.setState({
            newPolicyModal: !this.state.newPolicyModal
        });
        //this.state.newPolicyModal = true;
    }

    toggleEditPolicyModal() {
        this.setState({
            editPolicyModal: !this.state.editPolicyModal
        });
        //this.state.newPolicyModal = true;
    }

    toggleDeletePolicyModal() {
        this.setState({
            ddeletePolicyModal: !this.state.ddeletePolicyModal
        });
        //this.state.newPolicyModal = true;
    }


    //https://policyservicebackendappservice.azurewebsites.net/createPolicy
    addPolicy() {
        axios.post('https://policyservicebackendappservice.azurewebsites.net/createPolicy', this.state.newPolicyData, {headers: {token: this.state.token}}).then((response) => {
            //console.log(response.data);
            this._refreshPolicy();
            let { policies } = this.state;
            policies.push(response.data);
            this.setState({
                policies, newPolicyModal: false, newPolicyData: {
                    // pid: '',
                    policy_name: '',
                    description: '',
                    share: '',
                    premium_amount: '',
                    coverage_amount: '',
                    is_active: '',
                    //start_date: '',
                    end_date: '',
                    //alert_message: "add"
                }
            });
        });
    }

    updatePolicy() {
        let { plan_id, policy_name, description, share, premium_amount, coverage_amount, is_active, start_date, end_date } = this.state.editPolicyData;

        //https://policyservicebackendappservice.azurewebsites.net/updatePolicy
        axios.post('https://policyservicebackendappservice.azurewebsites.net/updatePolicy', {
            plan_id, policy_name, description, share, premium_amount, coverage_amount, is_active, start_date, end_date
        },
        {headers: {token: this.state.token}}
        ).then((response) => {
            this._refreshPolicy();
            //console.log(response.data);

            this.setState({
                editPolicyModal: false, alert_message: "update", editPolicyData: { plan_id: '', policy_name: '', description: '', share: '', premium_amount: '', coverage_amount: '', is_active: '', start_date: '', end_date: '' }
            })
        })
    }

    editPolicy(policy_name, description, share, premium_amount, coverage_amount, is_active, start_date, end_date) {
        this.setState({
            editPolicyData: { policy_name, description, share, premium_amount, coverage_amount, is_active, start_date, end_date },
            editPolicyModal: !this.state.editPolicyModal
        });
    }

    deletePolicy() {
        let { plan_id, share, coverage_amount } = this.state.ddeletePolicyData;

        //https://policyservicebackendappservice.azurewebsites.net/deletePolicy
        axios.post('https://policyservicebackendappservice.azurewebsites.net/deletePolicy', {
            plan_id, share, coverage_amount
        },
        {headers: {token: this.state.token}}
        ).then((response) => {
            this._refreshPolicy();
            //console.log(response.data);

            this.setState({
                ddeletePolicyModal: false, alert_message: "delete", ddeletePolicyData: { share: '', coverage_amount: '' }
            })
        })
    }

    ddeletePolicy(share, coverage_amount) {
        this.setState({
            ddeletePolicyData: { share, coverage_amount },
            ddeletePolicyModal: !this.state.ddeletePolicyModal
        });
    }
    //https://policyservicebackendappservice.azurewebsites.net/viewallpolicies
    _refreshPolicy() {
        axios.get('https://policyservicebackendappservice.azurewebsites.net/viewallpolicies', {headers: {token: this.state.token}}).then((response) => {
            this.setState({
                policies: response.data
            })
        })
    }

    // handleChange(e) {

    //     let currentList = [];

    //     let newList = [];


    //     if (e.target.value !== "") {

    //         currentList = this.props.items;


    //         newList = currentList.filter(item => {

    //             const lc = item.toLowerCase();

    //             const filter = e.target.value.toLowerCase();

    //             return lc.includes(filter);
    //         });
    //     } else {

    //         newList = this.props.items;
    //     }

    //     this.setState({
    //         filtered: newList
    //     });
    // }

    handleLogout() {
        axios.post('https://registerservicebackendappservice1.azurewebsites.net/logout', {email_id: this.state.email_id}, {headers: {token: this.state.token}})
        Auth.logout()
        this.props.history.replace('/sign-in');
    }

    render() {

        let policies = this.state.policies.map((policies) => {
            return (
                <tr key={policies.plan_id}>
                    <td>{policies.plan_id}</td>
                    <td>{policies.policy_name}</td>
                    <td>{policies.description}</td>
                    <td>{policies.share}</td>
                    <td>{policies.premium_amount}</td>
                    <td>{policies.coverage_amount}</td>
                    <td>{policies.is_active}</td>
                    <td>{policies.start_date}</td>
                    <td>{policies.end_date}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2" onClick={this.editPolicy.bind(this, policies.policy_name, policies.description, policies.share, policies.premium_amount, policies.coverage_amount, policies.is_active, policies.start_date, policies.end_date)}>Update</Button>
                        <Button color="danger" size="sm" className="mr-2" onClick={this.ddeletePolicy.bind(this, policies.share, policies.coverage_amount)}>Delete</Button>
                    </td>
                </tr>
            )
        });
        return (
            <div className="App__container">
                <PayerNavBar />
                <p className="App-intro">
                    Hello Payer
                    <Button type="button" className="float-right" onClick={this.handleLogout.bind(this)}>Logout</Button>
                </p>
                <PayerTop />
                <Form>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search for Policy" className="mr-sm-3" onChange={this.handleChange.bind(this)
                        } />
                        <Button variant="outline-success" >Search</Button>
                    </Form> */}
                </Form>
                {/* <div>
                    {filteredPolicies.map(policy => {
                        return this.renderPolicy(policy);
                    })}
                </div> */}

                {this.state.alert_message === "add" ? <PolicyAdd /> : null}
                {this.state.alert_message === "update" ? <PolicyUpdated /> : null}
                {this.state.alert_message === "delete" ? <PolicyDelete /> : null}

                <Button className="my-3" color="primary" onClick={this.toggleNewPolicyModal.bind(this)}>Add Policy</Button>
                <Modal isOpen={this.state.newPolicyModal} toggle={this.toggleNewPolicyModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewPolicyModal.bind(this)}>Add a new Policy</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="policy_name">Plan Name</Label>
                            <Input id="policy_name" placeholder="Enter the name of the plan" value={this.state.newPolicyData.policy_name} onChange={(e) => {
                                let { newPolicyData } = this.state;
                                newPolicyData.policy_name = e.target.value;
                                this.setState({ newPolicyData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input id="description" placeholder="Enter the description" value={this.state.newPolicyData.description} onChange={(e) => {
                                let { newPolicyData } = this.state;
                                newPolicyData.description = e.target.value;
                                this.setState({ newPolicyData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="share">Share</Label>
                            <Input id="share" placeholder="Enter the Share" value={this.state.newPolicyData.share} onChange={(e) => {
                                let { newPolicyData } = this.state;
                                newPolicyData.share = e.target.value;
                                this.setState({ newPolicyData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="premium_amount">Premium Amount</Label>
                            <Input id="premium_amount" placeholder="Enter the premium amount" value={this.state.newPolicyData.premium_amount} onChange={(e) => {
                                let { newPolicyData } = this.state;
                                newPolicyData.premium_amount = e.target.value;
                                this.setState({ newPolicyData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="coverage_amount">Coverage Amount</Label>
                            <Input id="coverage_amount" placeholder="Enter the coverage amount" value={this.state.newPolicyData.coverage_amount} onChange={(e) => {
                                let { newPolicyData } = this.state;
                                newPolicyData.coverage_amount = e.target.value;
                                this.setState({ newPolicyData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="is_active">Active Status</Label>
                            <Input type="number" id="is_active" placeholder="Enter the status of the plan as '1' or '0' " value={this.state.newPolicyData.is_active} onChange={(e) => {
                                let { newPolicyData } = this.state;
                                newPolicyData.is_active = e.target.value;
                                this.setState({ newPolicyData });
                            }} />
                        </FormGroup>
                        {/* <FormGroup>
                            <Label for="start_date">Start Date</Label>
                            <Input type="date" id="start_date" placeholder="Enter the year the plan will end" value={this.state.newPolicyData.start_date} onChange={(e) => {
                                let { newPolicyData } = this.state;
                                newPolicyData.start_date = e.target.value;
                                this.setState({ newPolicyData });
                            }} />
                        </FormGroup> */}
                        <FormGroup>
                            <Label for="end_date">End Date</Label>
                            <Input type="date" id="end_date" placeholder="Enter the year the plan will end" value={this.state.newPolicyData.end_date} onChange={(e) => {
                                let { newPolicyData } = this.state;
                                newPolicyData.end_date = e.target.value;
                                this.setState({ newPolicyData });
                            }} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addPolicy.bind(this)}>Add</Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewPolicyModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.editPolicyModal} toggle={this.toggleEditPolicyModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditPolicyModal.bind(this)}>Edit a Policy</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="plan_id">Plan ID*</Label>
                            <Input id="plan_id" placeholder="Enter the Plan-ID of the policy*" value={this.state.editPolicyData.plan_id} onChange={(e) => {
                                let { editPolicyData } = this.state;
                                editPolicyData.plan_id = e.target.value;
                                this.setState({ editPolicyData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="policy_name">Plan Name</Label>
                            <Input id="policy_name" placeholder="Enter the name of the plan" value={this.state.editPolicyData.policy_name} onChange={(e) => {
                                let { editPolicyData } = this.state;
                                editPolicyData.policy_name = e.target.value;
                                this.setState({ editPolicyData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input id="description" placeholder="Enter the description" value={this.state.editPolicyData.description} onChange={(e) => {
                                let { editPolicyData } = this.state;
                                editPolicyData.description = e.target.value;
                                this.setState({ editPolicyData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="share">Share</Label>
                            <Input id="share" placeholder="Enter the Share" value={this.state.editPolicyData.share} onChange={(e) => {
                                let { editPolicyData } = this.state;
                                editPolicyData.share = e.target.value;
                                this.setState({ editPolicyData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="premium_amount">Premium Amount</Label>
                            <Input id="premium_amount" placeholder="Enter the premium amount" value={this.state.editPolicyData.premium_amount} onChange={(e) => {
                                let { editPolicyData } = this.state;
                                editPolicyData.premium_amount = e.target.value;
                                this.setState({ editPolicyData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="coverage_amount">Coverage Amount</Label>
                            <Input id="coverage_amount" placeholder="Enter the coverage amount" value={this.state.editPolicyData.coverage_amount} onChange={(e) => {
                                let { editPolicyData } = this.state;
                                editPolicyData.coverage_amount = e.target.value;
                                this.setState({ editPolicyData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="is_active">Active Status</Label>
                            <Input type="number" id="is_active" placeholder="Enter the year the plan will start" value={this.state.editPolicyData.is_active} onChange={(e) => {
                                let { editPolicyData } = this.state;
                                editPolicyData.is_active = e.target.value;
                                this.setState({ editPolicyData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="start_date">Start Date</Label>
                            <Input type="date" id="start_date" placeholder="Enter the year the plan will end" value={this.state.editPolicyData.start_date} onChange={(e) => {
                                let { editPolicyData } = this.state;
                                editPolicyData.start_date = e.target.value;
                                this.setState({ editPolicyData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="end_date">End Date</Label>
                            <Input type="date" id="end_date" placeholder="Enter the year the plan will end" value={this.state.editPolicyData.end_date} onChange={(e) => {
                                let { editPolicyData } = this.state;
                                editPolicyData.end_date = e.target.value;
                                this.setState({ editPolicyData });
                            }} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updatePolicy.bind(this)}>Update</Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditPolicyModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.ddeletePolicyModal} toggle={this.toggleDeletePolicyModal.bind(this)}>
                    <ModalHeader toggle={this.toggleDeletePolicyModal.bind(this)}>Delete a Policy</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="plan_id">Plan ID*</Label>
                            <Input id="plan_id" placeholder="Enter the Plan-ID of the policy*" value={this.state.ddeletePolicyData.plan_id} onChange={(e) => {
                                let { ddeletePolicyData } = this.state;
                                ddeletePolicyData.plan_id = e.target.value;
                                this.setState({ ddeletePolicyData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="share">Share</Label>
                            <Input id="share" placeholder="Enter the Share" value={this.state.ddeletePolicyData.share} onChange={(e) => {
                                let { ddeletePolicyData } = this.state;
                                ddeletePolicyData.share = e.target.value;
                                this.setState({ ddeletePolicyData });
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="coverage_amount">Coverage Amount</Label>
                            <Input id="coverage_amount" placeholder="Enter the coverage amount" value={this.state.ddeletePolicyData.coverage_amount} onChange={(e) => {
                                let { ddeletePolicyData } = this.state;
                                ddeletePolicyData.coverage_amount = e.target.value;
                                this.setState({ ddeletePolicyData });
                            }} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.deletePolicy.bind(this)}>Delete</Button>{' '}
                        <Button color="secondary" onClick={this.toggleDeletePolicyModal.bind(this)}>Cancel</Button>
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
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Policy Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {policies}
                    </tbody>
                </Table>

            </div>

        )
    }
}

export default TempWorld



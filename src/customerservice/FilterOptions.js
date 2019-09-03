import React, { Component } from 'react'
import { FormText, Table, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, CustomInput, Form, FormGroup, Label, Input } from 'reactstrap';
import StripeCheckout from 'react-stripe-checkout';
import AuthService from '../components/AuthService';

import axios from 'axios'

const Auth = new AuthService();

export class FilterOptions extends Component {
    constructor() {
        super();
        this.state = {
            policies: [],
            email_id: localStorage.getItem('email_id'),
            token: localStorage.getItem('id_token'),
            filterPolicy: {
                share: '',
                min_premium_amount: '',
                max_premium_amount: '',
                min_coverage_amount: '',
                max_coverage_amount: '',
                C1: '',
                C2: '',
                C3: '',
                C4: '',
                //is_active: '',
            },
            buyPolicyData: {
                // pid: '',
                policy_name: '',
                description: '',
                share: '',
                premium_amount: '',
                coverage_amount: '',
                is_active: '',
                end_date: '',
                email_id: '',
            },
            filterPolicyModal: false
        }
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this._filterPolicy = this._filterPolicy.bind(this);
    }

    componentDidMount() {
        this.setState({
            email_id: Auth.getEmailId()
        })
    }

    toggleFilterPolicyModal() {
        this.setState({
            filterPolicyModal: !this.state.filterPolicyModal
        });
        //this.state.newPolicyModal = true;
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let filterPolicy = target.filterPolicy;

        this.setState({
            [filterPolicy]: value
        });
    }

    _filterPolicy() {

        axios.post('https://customerservicebackendappservice.azurewebsites.net/suggestpolicy', {
            min_premium_amount: this.state.filterPolicy.min_premium_amount,
            max_premium_amount: this.state.filterPolicy.max_premium_amount,
            min_coverage_amount: this.state.filterPolicy.min_coverage_amount,
            max_coverage_amount: this.state.filterPolicy.max_coverage_amount,
            C1: this.state.filterPolicy.C1,
            C2: this.state.filterPolicy.C2,
            C3: this.state.filterPolicy.C3,
            C4: this.state.filterPolicy.C4

        },
        {headers: {token: this.state.token}}
        ).then((response) => {
            //console.log(response.data);
            //this._refreshPolicy();
            this.setState({
                policies: response.data
            })
            // this.setState({
            //     filterPolicyModal: false
            // })

        });

    }

    onToken = (token) => {
        //console.log({ token });
        //console.log({ policies });
        fetch('https://customerservicebackendappservice.azurewebsites.net/customerpayment', {
            method: 'POST',
            body: JSON.stringify(token),
            headers: {
                token: this.state.token
              },
        }).then(response => {
            //console.log(response.data)
            response.json().then(data => {
                //console.log(data)
                //this._refreshPolicy();
                //this.handleChange();
                //this.buyPolicy();
                alert(`We are in business, ${this.state.email_id}`);
                //toast("Success! Check email for details", { type: "success" });
            });
        });
    }

    buyPolicy(plan_id, share, premium_amount, coverage_amount) {
        //let { plan_id, share, coverage_amount} = this.state.buyPolicyData;


        axios.post('https://customerservicebackendappservice.azurewebsites.net/insertpurchasedetails', {
            email_id: this.state.email_id, premium_amount, coverage_amount, share, plan_id
        },
        {headers: {token: this.state.token}}
        ).then((response) => {
            //this._refreshPolicy();
            //console.log(response.data);
            //alert(JSON.stringify(response.data))
        })
            .catch(function (error) {
                alert(error);
            });
    }

    _refreshPolicy() {
        axios.get('https://customerservicebackendappservice.azurewebsites.net/suggestpolicy', {headers: {token: this.state.token}}).then((response) => {
            //console.log(response.data)
            //alert(JSON.stringify(response.data))
            this.setState({
                policies: response.data
            })
        })
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
                    <td>{policies.end_date}</td>
                    <td>
                        <StripeCheckout

                            token={this.onToken}
                            stripeKey="pk_test_2zB62YCR9HB5W6vHCCFxIduY00RodbbncW"
                            name={policies.policy_name}
                            amount={policies.premium_amount * 100} // cents
                            currency="INR"
                            data={policies.premium_amount}

                        >
                            <Button variant="success" className="mr-2" onClick={this.buyPolicy.bind(this, policies.plan_id, policies.share, policies.premium_amount, policies.coverage_amount)}>Buy Plan</Button>
                        </StripeCheckout>

                    </td>
                </tr>
            )
        });
        return (
            <div>
                <Button className="my-3" color="primary" onClick={this.toggleFilterPolicyModal.bind(this)}>Filter Policy</Button>
                <Modal isOpen={this.state.filterPolicyModal} toggle={this.toggleFilterPolicyModal.bind(this)}>
                    <ModalHeader toggle={this.toggleFilterPolicyModal.bind(this)}>Filter Policy</ModalHeader>
                    <ModalBody>
                        <Form>
                            {/* <FormGroup>
                                <Label for="exampleCustomRange">Premium Amount</Label>
                                <CustomInput type="range" id="exampleCustomRange" name="customRange" min="0" max="1000" step="50" onChange={value => this.setState({ value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleCustomRange2">Coverage Amount</Label>
                                <CustomInput type="range" id="exampleCustomRange2" name="customRange2" />
                            </FormGroup> */}
                            <FormGroup>
                                <Label for="premium_amount">Premium Amount</Label>
                                <Row form>
                                    <Col md={6}>
                                        <Label for="min_premium_amount">Min Value</Label>
                                        <Input type="select" name="min_premium_amount" id="min_premium_amount" value={this.state.min_premium_amount} onChange={(e) => {
                                            let { filterPolicy } = this.state;
                                            filterPolicy.min_premium_amount = e.target.value;
                                            this.setState({ filterPolicy });
                                        }}>
                                            <option value="">Select The options</option>
                                            <option value="1000">1000</option>
                                            <option value="1500">1500</option>
                                            <option value="2000">2000</option>
                                            <option value="2500">2500</option>
                                            <option value="3000">3000</option>
                                            <option value="3500">3500</option>
                                        </Input>
                                    </Col>
                                    <Col md={6}>
                                        <Label for="max_premium_amount">Max Value</Label>
                                        <Input type="select" name="max_premium_amount" id="max_premium_amount" value={this.state.max_premium_amount} onChange={(e) => {
                                            let { filterPolicy } = this.state;
                                            filterPolicy.max_premium_amount = e.target.value;
                                            this.setState({ filterPolicy });
                                        }}>
                                            <option value="">Select The options</option>
                                            <option value="5000">5000</option>
                                            <option value="5500">5500</option>
                                            <option value="6000">6000</option>
                                            <option value="6500">6500</option>
                                            <option value="7000">7000</option>
                                            <option value="7500">7500</option>
                                            <option value="1000000">Max</option>
                                        </Input>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Label for="coverage_amount">Coverage Amount</Label>
                                <Row form>
                                    <Col md={6}>
                                        <Label for="min_coverage_amount">Min Value</Label>
                                        <Input type="select" name="min_coverage_amount" id="min_coverage_amount" value={this.state.min_coverage_amount} onChange={(e) => {
                                            let { filterPolicy } = this.state;
                                            filterPolicy.min_coverage_amount = e.target.value;
                                            this.setState({ filterPolicy });
                                        }}>
                                            <option value="">Select The options</option>
                                            <option value="100000">100000</option>
                                            <option value="150000">150000</option>
                                            <option value="200000">200000</option>
                                            <option value="250000">250000</option>
                                            <option value="300000">300000</option>
                                            <option value="350000">350000</option>
                                            <option value="400000">400000</option>
                                            <option value="450000">450000</option>
                                        </Input>
                                    </Col>
                                    <Col md={6}>
                                        <Label for="max_coverage_amount">Max Value</Label>
                                        <Input type="select" name="max_coverage_amount" id="max_coverage_amount" value={this.state.max_coverage_amount} onChange={(e) => {
                                            let { filterPolicy } = this.state;
                                            filterPolicy.max_coverage_amount = e.target.value;
                                            this.setState({ filterPolicy });
                                        }}>
                                            <option value="">Select The options</option>
                                            <option value="600000">600000</option>
                                            <option value="700000">700000</option>
                                            <option value="800000">800000</option>
                                            <option value="850000">850000</option>
                                            <option value="900000">900000</option>
                                            <option value="950000">950000</option>
                                            <option value="100000000">Max</option>
                                        </Input>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleCheckbox">Descriptions</Label>
                                <div>
                                    <CustomInput type="switch" id="C1" name="C1" label="Hospitalization Expenses" value="Hospitalization" onClick={(e) => {
                                        let { filterPolicy } = this.state;
                                        filterPolicy.C1 = e.target.value;
                                        this.setState({ filterPolicy });
                                    }} />
                                    <CustomInput type="switch" id="C2" name="C2" label="Pharmacy Expenses" value="Pharmacy" onChange={(e) => {
                                        let { filterPolicy } = this.state;
                                        filterPolicy.C2 = e.target.value;
                                        this.setState({ filterPolicy });
                                    }} />
                                    <CustomInput type="switch" id="C3" name="C3" label="Medical Consultation Expenses" value="Medical" onChange={(e) => {
                                        let { filterPolicy } = this.state;
                                        filterPolicy.C3 = e.target.value;
                                        this.setState({ filterPolicy });
                                    }} />
                                    <CustomInput type="switch" id="C4" name="C4" label="Dental Expenses" value="Dental" onChange={(e) => {
                                        let { filterPolicy } = this.state;
                                        filterPolicy.C4 = e.target.value;
                                        this.setState({ filterPolicy });
                                    }} />
                                </div>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <FormText color="muted" className="float-left">
                            All the fields are necessary. Please dont leave any field empty or unchecked.
                        </FormText>
                        <Button color="primary" onClick={this._filterPolicy.bind(this)}>Apply</Button>{' '}
                        <Button color="secondary" onClick={this.toggleFilterPolicyModal.bind(this)}>Cancel</Button>
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
                        {policies}
                    </tbody>
                </Table>
            </div >
        )
    }
}

export default FilterOptions

import React, { Component } from 'react'
import { /*Input, FormGroup, Label, Modal, ModalHeader, ModalBody, Form, Button, ModalFooter,*/ Table, Button } from 'react-bootstrap';
//import { FormControl } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
//import RangeSlider from 'reactrangeslider';
//import { toast } from "react-toastify";
import FilterOptions from './FilterOptions'

import AuthService from '../components/AuthService';

import axios from 'axios'

const Auth = new AuthService();

//import { Redirect } from 'react-router-dom'




//toast.configure();


export class CustomerBuyPolicy extends Component {
    state = {
        policies: [],
        token: localStorage.getItem('id_token'),
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
        buyPolicyModal: false
    }

    componentWillMount() {
        this._refreshPolicy();
    }

    componentDidMount() {
        this.setState({
            email_id: Auth.getEmailId()
        })
    }

    handleChange(e) {
        let { buyPolicyData } = this.state;
        buyPolicyData.premium_amount = e.target.value;
        buyPolicyData.coverage_amount = e.target.value;
        buyPolicyData.share = e.target.value;
        this.setState({ buyPolicyData });
      }


    // toggleBuyPolicyModal() {
    //     this.setState({
    //         newPolicyModal: !this.state.newPolicyModal
    //     });
    // }

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
                //this.handleChange();
                //this.buyPolicy();
                alert(`We are in business, ${this.state.email_id}`);
                //toast("Success! Check email for details", { type: "success" });
            });
        });
        //     axios.post('https://jsonplaceholder.typicode.com/posts', {
        //         token,
        //         policies
        //     });
        //     const { status } = response.data;
        //     console.log("Response:", response.data);
        //     if (status === "success") {
        //         toast("Success! Check email for details", { type: "success" });
        //     } else {
        //         toast("Something went wrong", { type: "error" });
        //     }
        // }

    }

    //const url = 'http://10.196.11.101:5005/insertpurchasedetails'

    buyPolicy(plan_id, share, premium_amount, coverage_amount ) {
        //let { plan_id, share, coverage_amount} = this.state.buyPolicyData;
        

        axios.post('https://customerservicebackendappservice.azurewebsites.net/insertpurchasedetails', {
            email_id: this.state.email_id ,premium_amount, coverage_amount, share, plan_id
        },
        {headers: {token: this.state.token}}
        ).then((response) => {
            //this._refreshPolicy();
            //console.log(response.data);
            //alert(JSON.stringify(response.data))
        })
        .catch(function (error) {
            alert(JSON.stringify(error));
        });
    }

    _refreshPolicy() {
        axios.get('https://customerservicebackendappservice.azurewebsites.net/allpolicies', {headers: {token: this.state.token}}).then((response) => {
            //console.log(response.data)
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
                        {/* <Button color="success" size="sm" className="mr-2" onClick={this.editPolicy.bind(this,  policies.policy_name, policies.description, policies.share, policies.premium_amount, policies.coverage_amount, policies.is_active, policies.end_date)}>Update</Button> */}
                        {/* {this.renderRedirect()} */}
                        {/* <Button color="success" size="sm" className="mr-2" onClick={this.setRedirect} /*onClick={this.buyPolicy.bind(this, policies.plan_id)}>Buy</Button> */}
                        
                        <StripeCheckout
                        
                            token={this.onToken}
                            stripeKey="pk_test_2zB62YCR9HB5W6vHCCFxIduY00RodbbncW"
                            name={policies.policy_name}
                            amount={policies.premium_amount *100} // cents
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
            <div className="App__container">
                <div>
                    
                </div>
                {/* <Form className="my-1">
                    <Form inline>
                        <FormControl type="text" placeholder="Search for Policy" className="mr-sm-3" onChange={this.onPolicySearch} />
                        <Button variant="outline-success" >Search</Button>
                    </Form>
                </Form> */}
                <FilterOptions />

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
            </div>
        )
    }
}

export default CustomerBuyPolicy
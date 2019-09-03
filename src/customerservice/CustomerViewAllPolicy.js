import React, { Component } from 'react';
import { MDBDataTable, Row, Col, Card, CardBody } from 'mdbreact';
import axios from 'axios';
import CustomerNavBar from './CustomerNavBar';
import CustomerTop from './CustomerTop';
import AuthService from '../components/AuthService'

import { Button } from 'react-bootstrap';

const Auth = new AuthService();


const url = 'https://customerservicebackendappservice.azurewebsites.net/allpolicies';


class CustomerViewAllPolicy extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            email_id: localStorage.getItem('email_id'),
            token: localStorage.getItem('id_token'),
            isLoading: true,
            tableRows: [],
        };
    }

    handleLogout() {
        axios.post('https://registerservicebackendappservice1.azurewebsites.net/logout', {email_id: this.state.email_id}, {headers: {token: this.state.token}})
        Auth.logout()
        this.props.history.replace('/sign-in');
    }

    componentWillMount = async () => {

        await axios.get(url, {headers: {token: this.state.token}})

            .then(response => response.data)

            .then(data => {

                //console.log(data);

                // if (err) throw err;

                this.setState({ posts: data })

            })

            .then(async () => {

                this.setState({ tableRows: this.assemblePosts(), isLoading: false })

                //console.log(this.state.tableRows);

            });

    }




    assemblePosts = () => {

        let posts = this.state.posts.map((post) => {

            return (
                {

                    plan_id: post.plan_id,
                    policy_name: post.policy_name,
                    description: post.description,
                    share: post.share,
                    premium_amount: post.premium_amount,
                    coverage_amount: post.coverage_amount,
                    is_active: post.is_active,
                    start_date: post.start_date,
                    end_date: post.end_date,

                }

            )

        });

        return posts;

    }

    render() {
        const data = {
            columns: [
                {
                    label: 'Policy ID',
                    field: 'plan_id',
                },

                {
                    label: 'Policy Name',
                    field: 'policy_name',
                },

                {
                    label: 'Description',
                    field: 'description',
                },

                {
                    label: 'Share',
                    field: 'share',
                },

                {
                    label: 'Premium Amount',
                    field: 'premium_amount',
                },

                {
                    label: 'Coverage Amount',
                    field: 'coverage_amount',
                },

                {
                    label: 'Active Status',
                    field: 'is_active',
                },
                {
                    label: 'Start Date',
                    field: 'start_date',
                },
                {
                    label: 'End Date',
                    field: 'end_date',
                },
            ],
            rows: this.state.tableRows,
        }

        return (
            <div>
                <CustomerNavBar />
                <p className="App-intro">
                    Hello Customer  <Button type="button" className="float-right" onClick={this.handleLogout.bind(this)}>Logout</Button>
                </p>
                <CustomerTop />
                <Row className="mb-4">
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <MDBDataTable
                                    striped
                                    bordered
                                    hover
                                    data={data}
                                    theadColor="indigo"
                                    btn
                                    sortable
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CustomerViewAllPolicy


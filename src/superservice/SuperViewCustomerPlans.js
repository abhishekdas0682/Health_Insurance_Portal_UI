import React, { Component } from 'react';
import { MDBDataTable, Row, Col, Card, CardBody } from 'mdbreact';
import axios from 'axios';

import SuperNavBar from './SuperNavBar';
import SuperTop from './SuperTop';

const url = 'https://policyservicebackendappservice.azurewebsites.net/viewAllCustomerPlansAdmin';


class SuperViewCustomerPlans extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            isLoading: true,
            tableRows: [],
            token: localStorage.getItem('id_token'),
            admin_email_id: localStorage.getItem('email_id'),
        };
    }

    componentWillMount = async () => {

        await axios.post(url, {
            admin_email_id: this.state.admin_email_id
        },
        {headers: {token: this.state.token}}
        )

            .then(response => response.data)

            .then(data => {

                // console.log(data);

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

                    user_id: post.user_id,
                    user_name: post.user_name,
                    email_id: post.email_id,
                    contact_number: post.contact_number,
                    address: post.address,
                    gender: post.gender,
                    //request_id: post.request_id,
                    plan_id: post.plan_id,
                    policy_name: post.policy_name,

                }

            )

        });

        return posts;

    }

    render() {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'user_id',
                },

                {
                    label: 'User Name',
                    field: 'user_name',
                },

                {
                    label: 'Email ID',
                    field: 'email_id',
                },

                {
                    label: 'Contact Number',
                    field: 'contact_number',
                },

                {
                    label: 'Address',
                    field: 'address',
                },

                {
                    label: 'Gender',
                    field: 'gender',
                },

                {
                    label: 'Plan ID',
                    field: 'plan_id',
                },
                {
                    label: 'Plan Name',
                    field: 'policy_name',
                },
            ],
            rows: this.state.tableRows,
        }

        return (
            <div>
                <SuperNavBar />
                <SuperTop />
                <Row className="mb-4">
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <MDBDataTable
                                    striped
                                    bordered
                                    hover
                                    data={data}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SuperViewCustomerPlans


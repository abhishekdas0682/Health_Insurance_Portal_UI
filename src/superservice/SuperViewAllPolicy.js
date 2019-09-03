import React, { Component } from 'react';
import { MDBDataTable, Row, Col, Card, CardBody } from 'mdbreact';
import axios from 'axios';

//import SuperNavBar from './SuperNavBar';
//import SuperTop from './SuperTop';

const url = 'https://policyservicebackendappservice.azurewebsites.net/viewallpolicies';


class SuperViewAllPolicy extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            isLoading: true,
            email_id: localStorage.getItem('email_id'),
            token: localStorage.getItem('id_token'),
            tableRows: [],
        };
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

export default SuperViewAllPolicy


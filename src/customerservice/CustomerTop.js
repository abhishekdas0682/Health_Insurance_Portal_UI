import React, { Component } from 'react'
//import { Jumbotron } from 'reactstrap'
import axios from 'axios'

export class CustomerTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            customer_profile: [],
            user_name: '',
            email_id: localStorage.getItem('email_id'),
            token: localStorage.getItem('id_token'),
            role: '',
        }
    }
    componentDidMount() {
        this.setState({
            email_id: localStorage.getItem('email_id')
        })
    
        var that=this;
          
       
        axios.post('https://customerservicebackendappservice.azurewebsites.net/details',
        {
            email_id: this.state.email_id
        },
        {headers: {token: this.state.token}}
     ).then((response) => {
    
        that.setState({
            user_name: response.data[0]['user_name'],
            role: response.data[0]['role'],
    
          })
         //console.log(that.state);
    
             that.state.customer_profile= response.data
        
        
        //console.log(that.state.customer_profile)
        
        that.assemblePosts();
    
           
        }).catch(error => {
            //console.log(error)
            alert(JSON.stringify(error))

        })
     }
    
    
     assemblePosts = () => {
    
        let customer_profile = this.state.customer_profile.map((customer_profile) => {
    
            return (
                {
    
                    user_name: customer_profile.user_name,
                    role: customer_profile.role,
    
                }
    
            )
    
        });
        return customer_profile
    
         
    
    }
    
    

    render() {

            return (
                <div>
                    <div /*className="container"*/>
                        {/* <Jumbotron> */}
                        <div className="lead">
                            {/* <div className="col-sm-1 mx-auto">

                                <h1 className="text">PROFILE</h1> 
                            </div> */}
                            <table className="table col-md-20 mx-auto">
                                <tbody>
                                    <tr>
                                        <td>Welcome: {this.state.user_name}</td>
                                        <td>Role: Customer</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* </Jumbotron> */}
                    </div>
                </div>
            )
        
    }
}
export default CustomerTop

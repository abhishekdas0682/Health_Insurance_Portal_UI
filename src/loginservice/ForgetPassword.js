import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import { FormGroup, Label, Input } from 'reactstrap';

import axios from 'axios';

import './ForgetPassword.css';

class ForgetPassword extends Component {
  constructor() {
    super();

    this.state = {
      email_id: '',
      password: '',
      security_question: '',
      security_answer: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post('https://registerservicebackendappservice1.azurewebsites.net/forgotPassword', {
      email_id: this.state.email_id,
      password: this.state.password,
      security_question: this.state.security_question,
      security_answer: this.state.security_answer
    })
      .then((response) => {
        console.log(response.data);
        alert(JSON.stringify(response.data));
      }, (error) => {
        console.log(error);
        alert(JSON.stringify(error));
      });

    //  axios.get('http://10.196.11.101:5000/login')
    //  .then((response) => {
    //    console.log(response);

    //  }) 
  }

  render() {
    return (
      <div>
        <NavigationBar />
      <div className="App__Aside">
      </div>
      <div className="App__Form">
      <div className="FormCenter">
      <div className="FormTitle">
          <NavLink to="/forget-password" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Forget Password</NavLink>
        </div>
        <form onSubmit={this.handleSubmit} className="FormFields">
          <div className="FormField">
            <label className="FormField__Label" htmlFor="email_id">Email ID</label>
            <input type="text" id="email_id" className="FormField__Input" placeholder="Enter your Email ID" name="email_id" value={this.state.email_id} onChange={this.handleChange} required />
          </div>
          <div className="FormField">

            <label className="FormField__Label" htmlFor="security_question">Security Question:</label>
            <FormGroup>
                  <Label for="security_question"></Label>
                  <Input type="select" name="security_question" id="security_question" value={this.state.security_question} onChange={this.handleChange} required >
                    <option>Select the questions below:</option>
                    <option>In which city was your mother born in?</option>
                    <option>What was your childhood nickname?</option>
                    <option>What was your favorite sport in high school?</option>
                    <option>What school did you attend for sixth grade?</option>
                    <option>What is your favorite team?</option>
                    <option>What was the name of the company where you had your first job?</option>
                  </Input>
                </FormGroup>

            <input type="text" id="security_answer" className="FormField__Input" placeholder="Enter your Answer" name="security_answer" value={this.state.security_answer} onChange={this.handleChange} required />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">New Password</label>
            <input type="password" id="password" className="FormField__Input" placeholder="Enter your new password" name="password" value={this.state.password} onChange={this.handleChange} required />
          </div>

          <div className="FormField">
            <button className="FormField__Button mr-20">Submit</button> <Link to="/sign-in" className="FormField__Link">Return back to Sign In</Link>
          </div>
        </form>
      </div>
      </div>
      </div>
    );
  }
}

export default ForgetPassword;
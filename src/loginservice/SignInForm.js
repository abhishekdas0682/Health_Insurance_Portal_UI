import React, { Component } from 'react';
import { Link, NavLink, /*Redirect*/ } from 'react-router-dom';
//import Alert from 'react-bootstrap/Alert'
import NavigationBar from './NavigationBar';
import SuccessAlert from '../components/SuccessAlert';
import ErrorAlert from '../components/ErrorAlert';
import AuthService from '../components/AuthService';
//import axios from 'axios';
//import Home from './Home'

//import logo from './opitum.png';

import './SignInForm.css';

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      role: '',
      email_id: '',
      password: '',
      alert_message: ''
      //fireRedirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.login(this.state.email_id, this.state.password)
      .then(res => {
        if (res.data.role === 'C') this.props.history.replace('/customer-world');
        else if (res.data.role === 'P') this.props.history.replace('/payer-world')
        else if (res.data.role === 'S') this.props.history.replace('/super-world')
      })
      .catch(err => {
        alert(err);
      })
  }
  //redirection if we are already loggedIn
  componentWillMount() {
    if (this.Auth.loggedIn())
      this.props.history.replace('/home');
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  // handleSubmit(e) {
  //   e.preventDefault();

  //   axios.post('http://10.196.11.101:5000/login', {
  //     email: this.state.email,
  //     password: this.state.password
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       //alert('You have successfully logged in');

  //       this.setState({alert_message:"success"})

  //       //this.setState({ fireRedirect: true })

  //     }, (error) => {
  //       console.log(error);
  //       //alert('User_ID and Password Combination not valid' + error);

  //       this.setState({alert_message:"failure"})

  //     });
  //   }



  render() {
    // if(this.state.fireRedirect) {
    //   return <Redirect to={HelloWorld}/>
    // }
    return (
      <div>
        <NavigationBar />
        <div className="App__Aside">
       
        </div>

        <div className="App__Form">
          <div className="FormCenter">
            <div className="PageSwitcher">
              <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Login</NavLink>
              <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Register</NavLink>
            </div>
            <div className="FormTitle">
              <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Login</NavLink>
            </div>
            <hr />
            {this.state.alert_message === "success" ? <SuccessAlert /> : null}
            {this.state.alert_message === "failure" ? <ErrorAlert /> : null}
           
            <form onSubmit={this.handleFormSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email_id">E-Mail Address</label>
                <input type="email" id="email_id" className="FormField__Input" placeholder="Enter your email" name="email_id" value={this.state.email_id} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <Link to="/forget-password" className="FormField__Link">Forgot Password?</Link>
              </div>
              <div className="FormField">
                <button className="FormField__Button mr-20">Sign In</button> <Link to="/" className="FormField__Link">Create an account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInForm;
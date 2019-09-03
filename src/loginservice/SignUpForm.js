import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import { Form, FormGroup, Label, Input } from 'reactstrap';



//import RegisterSuccess from '../components/RegisterSuccess';
//import RegisterFail from '../components/RegisterFail';

import './SignUpForm.css';

//import Noty from 'noty';


  


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const passwordRegex = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
);

const  regName =RegExp(
  /^[a-zA-Z ]{2,30}$/
  );

  const mobileRegex = RegExp(
    /^([+]\d{2})?\d{10}$/
    );

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};




class SignUpForm extends Component {

  constructor(props) {
    super(props);
    //var self = this;
    this.state = {
      user_name: '',
      password: '',
      email_id: '',
      contact_number: '',
      date_of_birth: '',
      gender: '',
      address: '',
      security_question: '',
      security_answer: '',
      role: '',
      formErrors: {
        user_name:"",
        email_id:"",
        password:"",
        contact_number:"",
        address:"",
        gender:"",
        role:"",
      },

      //alert_message: '',
      dropdownOpen: false

      // hasAgreed: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  

  handleChange(e) {
    // let target = e.target;
    // let value = target.type === 'checkbox' ? target.checked : target.value;
    // let name = target.name;

    // this.setState({
    //   [name]: value
    // });
    e.preventDefault();
   

    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    this.setState({
      [name]: value
    });

    switch(name){
      case "email_id":
      formErrors.email_id = emailRegex.test(value)
        ? ""
        : "Invalid email address";
      break;
      
      case "password":
      formErrors.password =passwordRegex.test(value)
        ? ""
        : "Minimum 8 characters long. Should contain at least one special character, digit, upper and lower case. Example: Harry$149";
      break;
      
      case "user_name":
      formErrors.user_name =regName.test(value)
        ? ""
        : "Invalid Name";
      break;
     
      case "contact_number":
      formErrors.contact_number =mobileRegex.test(value)
        ? ""
        : "Invalid Number";
      break;
      
      case "address":
      formErrors.address =
      value.length < 10 ? "Minimum 10 characaters required" : "";
      break;


      default:
      break;
    }
    this.setState({ formErrors, [name]: value });

  }

  //https://registerservicebackendappservice1.azurewebsites.net/register

  handleSubmit(e) {
    e.preventDefault();
    if(formValid(this.state)){
    axios.post('https://registerservicebackendappservice1.azurewebsites.net/register', {
      user_name: this.state.user_name,
      password: this.state.password,
      email_id: this.state.email_id,
      contact_number: this.state.contact_number,
      date_of_birth: this.state.date_of_birth,
      gender: this.state.gender,
      address: this.state.address,
      security_question: this.state.security_question,
      security_answer: this.state.security_answer,
      role: this.state.role

    })

      .then(function(response) {

        //console.log(response.data);
        //alert('Your details have been successfully submitted' + response.data);
        alert(JSON.stringify(response.data));
      
        //this.setState({ alert_message: "success" })
        //self.callPost();
      }
        , (error) => {
          //console.log(error);
          alert(JSON.stringify(error.data));
          //this.setState({ alert_message: "failure" })
        });
      }
  }

  //  callPost = () => {
  //      <Route exact path="/hello-world" component={HelloWorld}>
  //      </Route>
  //    }) 
  // }



  render() {
    const { formErrors } = this.state;
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
              <NavLink to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Register</NavLink>
            </div>

            <hr />
            {/* {this.state.alert_message === "success" ? <RegisterSuccess /> : null} */}
            {/* {this.state.alert_message === "failure" ? <RegisterFail /> : null} */}

            <Form onSubmit={this.handleSubmit} className="main-form needs-validation">
             
              {/* <div className="FormField">
                <label className="FormField__Label" htmlFor="user_name">Full Name</label>
                <input type="text" id="user_name" className="FormField__Input" placeholder="Enter your full name" name="user_name" value={this.state.user_name} onChange={this.handleChange} />
              </div> */}
            <div className="FormField">
              <label className="FormField__Label" htmlFor="user_name">Full Name</label>
                <input style={{width:500}}
                color= 'black'
                 className={formErrors.user_name.length > 0 ? "error" : null}
                 type="text" id=" user_name" 
                 placeholder="Enter your Full Name" name="user_name"
                noValidate 
                value={this.state.user_name}
                onChange={this.handleChange}
                required
                 />
                 <br/>
              
                  {formErrors.user_name.length > 0 && (
                <span className="errorMessage">* {formErrors.user_name}</span>
              )}
              </div>

              {/* <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div> */}
             
             
             <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input style={{width:500}}
                 className={formErrors.password.length > 0 ? "error" : null}
                 type="password" id="password" 
                 placeholder="Enter your password" name="password"
                noValidate 
                value={this.state.password}
                onChange={this.handleChange}
                required
                 />
                 <br />
                  {formErrors.password.length > 0 && (
                <span className="errorMessage">* {formErrors.password}</span>
              )}
              </div>
               {/* 
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email_id">E-Mail Address</label>
                <input type="email" id="email_id" className="FormField__Input" placeholder="Enter your email" name="email_id" value={this.state.email_id} onChange={this.handleChange} />
              </div> */}
                            <div className="FormField">
                <label className="FormField__Label" htmlFor="email_id">Email Address</label>
                <input style={{width:500}}
                 className={formErrors.email_id.length > 0 ? "error" : null}
                 type="text" id="email_id" 
                 placeholder="Enter your email id" name="email_id"
                noValidate 
                value={this.state.email_id}
                onChange={this.handleChange}
                required
                 />
                 <br />
                  {formErrors.email_id.length > 0 && (
                <span className="errorMessage">* {formErrors.email_id}</span>
              )}
            </div> 

              {/* <div className="FormField">
                <label className="FormField__Label" htmlFor="contact_number">Phone Number</label>
                <input type="number" id="contact_number" className="FormField__Input" placeholder="Enter your Phone Number" name="contact_number" value={this.state.contact_number} onChange={this.handleChange} />
              </div> */}
                           <div className="FormField">
                <label className="FormField__Label" htmlFor="contact_number">Contact Number</label>
                <input style={{width:500}}
                 className={formErrors.contact_number.length > 0 ? "error" : null}
                 type="number" id="contact_number" 
                 placeholder="Enter your number" name="contact_number"
                noValidate 
                value={this.state.contact_number}
                onChange={this.handleChange}
                required
                 />
                 <br />
                  {formErrors.contact_number.length > 0 && (
                <span className="errorMessage">* {formErrors.contact_number}</span>
              )}
            </div>

            <div className="FormField">
                <label className="FormField__Label" htmlFor="date_of_birth">Date of Birth</label>
                <input 
                type="date" id="date_of_birth" className="FormField__Input" placeholder="Enter your Date of Birth" name="date_of_birth" value={this.state.date_of_birth} onChange={this.handleChange} required/>
              </div>

               <div className="FormField">
                <label className="FormField__Label" htmlFor="gender">Gender</label>
                {/* <input type="text" id="gender" className="FormField__Input" placeholder="Enter your Gender as M/F/O" name="gender" value={this.state.gender} onChange={this.handleChange} /> */}
              
              <FormGroup>
                  <Label for="gender"></Label>
                  <Input type="select" name="gender" id="gender" value={this.state.gender} onChange={this.handleChange}>
                    <option value="">Select the options below:</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </Input>
                </FormGroup>
                </div>
              {/* <div className="FormField">
                <label className="FormField__Label" htmlFor="address">Address</label>
                <input type="text" id="address" className="FormField__Input" placeholder="Enter your Address" name="address" value={this.state.address} onChange={this.handleChange} />
              </div> */}
             
              <div className="FormField">
                <label className="FormField__Label" htmlFor="phone_no">Address</label>
                <input style={{width:500}}
                 className={formErrors.address.length > 0 ? "error" : null}
                 type="text" id="address" 
                 placeholder="Enter your address" name="address"
                noValidate 
                value={this.state.address}
                onChange={this.handleChange}
                required
                 />
                 <br />
                  {formErrors.address.length > 0 && (
                <span className="errorMessage">* {formErrors.address}</span>
              )}
            </div>

              <div className="FormField">

                <label className="FormField__Label" htmlFor="security_question">Security Question:</label>
                {/* <select>
                  <option value="qOne">In which city was your mother born in?</option>
                  <option value="qTwo">What was your childhood nickname?</option>
                  <option value="qThree">What was your favorite sport in high school?</option>
                  <option value="qFour">What school did you attend for sixth grade?</option>
                  <option value="qFive">What is your favorite team?</option>
                  <option value="qSix">What was the name of the company where you had your first job?</option>
                </select>  */}

                <FormGroup>
                  <Label for="security_question"></Label>
                  <Input type="select" name="security_question" id="security_question" value={this.state.security_question} onChange={this.handleChange}>
                    <option value="">Select the questions below:</option>
                    <option>In which city was your mother born in?</option>
                    <option>What was your childhood nickname?</option>
                    <option>What was your favorite sport in high school?</option>
                    <option>What school did you attend for sixth grade?</option>
                    <option>What is your favorite team?</option>
                    <option>What was the name of the company where you had your first job?</option>
                  </Input>
                </FormGroup>
                <label className="FormField__Label" htmlFor="security_answer">Security Answer:</label>
                <input type="text" id="security_answer" className="FormField__Input" placeholder="Enter your Answer" name="security_answer" value={this.state.security_answer} onChange={this.handleChange} required />
              </div>

              <div>

              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="role">Role</label>
                {/* <input type="text" id="role" className="FormField__Input" placeholder="Enter your Role as C/P/S" name="role" value={this.state.role} onChange={this.handleChange} /> */}

                <FormGroup>
                  <Label for="gender"></Label>
                  <Input type="select" name="role" id="role" value={this.state.role} onChange={this.handleChange}>
                    <option value="">Select the options below:</option>
                    <option value="C">Customer</option>
                    <option value="P">Payer</option>
                    <option value="S">Super-User</option>
                  </Input>
                </FormGroup>

              </div>

              <div className="FormField">
                <label className="FormField__CheckboxLabel">
                  <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} /> I agree all statements in <a href="/about" className="FormField__TermsLink">Terms and Services</a>
                </label>
              </div>

              <div className="FormField">
                <button className="FormField__Button mr-20">Sign Up</button> <Link to="/sign-in" className="FormField__Link">I'm already member</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default SignUpForm;
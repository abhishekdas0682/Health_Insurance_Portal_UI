import React, { Component } from 'react';
import { BrowserRouter as Router, Route, /*Link, NavLink*/ } from 'react-router-dom';
//import {Nav, NavItem, NavBar, Badge} from 'react-bootstrap';

import Home from './components/Home';

import SignUpForm from './loginservice/SignUpForm';
import SignInForm from './loginservice/SignInForm';
import ForgetPassword from './loginservice/ForgetPassword';
//import NavigationBar from './loginservice/NavigationBar';
import TestPing from './loginservice/TestPing';
import About from './loginservice/About';

import PayerWorld from './payerservice/PayerWorld';
import PayerProfile from './payerservice/PayerProfile';
import TempWorld from './payerservice/TempWorld';
//import logo from './opitum.png';

import CustomerWorld from './customerservice/CustomerWorld';
import CustomerProfile from './customerservice/CustomerProfile';
import CustomerViewAllPolicy from './customerservice/CustomerViewAllPolicy';
import BoughtPolicy from './customerservice/BoughtPolicy';
import TransactionHistory from './customerservice/TransactionHistory';

import SuperWorld from './superservice/SuperWorld';
import SuperProfile from './superservice/SuperProfile';
import SuperPolicy from './superservice/SuperPolicy';
import SuperViewCustomerPlans from './superservice/SuperViewCustomerPlans';
import SuperBuyPolicy from './superservice/SuperBuyPolicy';
import SuperAdmin from './superservice/SuperAdmin';
//import BuyForReal from './superservice/BuyForReal';

//import AuthHelperMethods from './components/AuthHelperMethods';
//import withAuth from './components/withAuth';

import './App.css';
//import BuyForReal from './superservice/BuyForReal';

class App extends Component {
  render() {
    return (
      <Router>
        {/* <NavigationBar /> */}
        <div>
          {/* <div className="App__Aside">
            <img src={logo} alt="Logo" />;
          </div>
          <div className="App__Form"> */}

          {/* <div className="PageSwitcher">
              <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Login</NavLink>
              <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Register</NavLink>
            </div> */}

          {/* <div className="FormTitle">
              <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Login</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Register</NavLink>
            </div> */}

          <Route path="/home" component={Home}>
          </Route>
          <Route path="/protectedPing" component={TestPing}>
          </Route>
          <Route path="/about" component={About}>
          </Route>

          <Route exact path="/" component={SignUpForm}>
          </Route>
          <Route path="/sign-in" component={SignInForm}>
          </Route>
          <Route path="/forget-password" component={ForgetPassword}>
          </Route>


          <Route path="/payer-world" component={PayerWorld}>
          </Route>
          <Route path="/payer-profile" component={PayerProfile}>
          </Route>
          <Route path="/payer-view-all-policy" component={TempWorld}>
          </Route>



          <Route path="/customer-world" component={CustomerWorld}>
          </Route>
          <Route path="/customer-profile" component={CustomerProfile}>
          </Route>
          <Route path="/customer-view-all-policy" component={CustomerViewAllPolicy}>
          </Route>
          <Route path="/customer-my-policy" component={BoughtPolicy}>
          </Route>
          <Route path="/customer-transaction-history" component={TransactionHistory}>
          </Route>



          <Route path="/super-world" component={SuperWorld}>
          </Route>
          <Route path="/super-profile" component={SuperProfile}>
          </Route>
          <Route path="/super-policy" component={SuperPolicy}>
          </Route>
          <Route path="/super-view-customer-plan" component={SuperViewCustomerPlans}>
          </Route>
          <Route path="/super-buy-policy" component={SuperBuyPolicy}>
          </Route>
          <Route path="/super-administration" component={SuperAdmin}>
          </Route>

          {/* </div> */}
        </div>
      </Router>
    );
  }
}

export default App;
//export default withAuth(App);
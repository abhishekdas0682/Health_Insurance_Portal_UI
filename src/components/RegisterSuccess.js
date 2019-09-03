import React, { Component } from 'react'
import { Alert } from 'reactstrap';

class RegisterSuccess extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          visible: true
        };
    
        this.onDismiss = this.onDismiss.bind(this);
      }
    
      onDismiss() {
        this.setState({ visible: false });
      }
    
      render() {
        return (
          <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
            You have successfully registered.
          </Alert>
        );
      }
    }

export default RegisterSuccess

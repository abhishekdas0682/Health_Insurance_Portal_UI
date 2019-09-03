import React, { Component } from 'react'
import { Alert } from 'reactstrap';

export class RegisterFail extends Component {
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
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            There's some error while registering your profile. Please put correct details and try again.
          </Alert>
        );
      }
    }

export default RegisterFail

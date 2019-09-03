import React from 'react';
import { Alert } from 'reactstrap';

class AlertExample extends React.Component {
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
        There's some error occured during logging in.
      </Alert>
    );
  }
}

export default AlertExample;
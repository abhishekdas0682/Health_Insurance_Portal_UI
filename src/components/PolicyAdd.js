import React from 'react';
import { Alert } from 'reactstrap';

class PolicyAdd extends React.Component {
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
        You have successfully added a policy.
      </Alert>
    );
  }
}

export default PolicyAdd;
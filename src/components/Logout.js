import React, { Component } from 'react'

export class Logout extends Component {
    componentWillMount() {
        //localStorage.clear()
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Logout
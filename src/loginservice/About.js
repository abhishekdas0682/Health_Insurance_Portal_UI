import React, { Component } from 'react'
import NavigationBar from './NavigationBar';

import a1 from './a1.jpg';

export class About extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <div className="py-2 px-md-3">
                <div>
                    <br></br>
                    <p>Health insurance in India is not a new concept, but the shocking thing is that most Indians still do not understand the importance of having a health insurance.
                    Those living in cities and earning well are not aware of the benefits of taking health insurance.</p>
                </div>
                <br></br>
                <div>
                    People should understand that buying a health insurance is more important than life insurance because the chances of you or your parents needing medical care multiple times during your earning career are more realistic.
                </div>
                <div className="py-2 px-md-1">
                    <br></br>
                    <img src={a1} class="float-left" alt="" />
                    Everyone is aware of the rising cost of healthcare and in the last few years the cost of hospitalisation and medicines have gone through the roof making it hard to afford quality treatment on time.
                <br></br>
                    <br></br>
                    Quality treatment for critical diseases that include cancer or heart diseases can easily cost around Rs 5 lakh to Rs 50 lakh. This makes it important for all to buy health insurance or mediclaim.
                <br></br>
                    Sup
                </div>
                <div>
                <br></br>
                    <div className="top-element-formatting">
                    We will discuss the top three reasons for you to understand the importance of buying health insurance. 
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default About

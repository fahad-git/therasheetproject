import React from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';

import './../assets/css/BasicComponents.css';

function About(props){

    var setHeaderComponent = props.setHeaderComponent;
    setHeaderComponent(true);

    return  <div>
                <div className="about">
                    <h1 >About Us</h1>
                    <p>Therasheet is clinic service providers</p>
                </div>
            </div>
    
}
export default About;
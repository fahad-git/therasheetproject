import React from 'react';

function Services(props){

    var setHeaderComponent = props.setHeaderComponent;
    setHeaderComponent(true);

    return  <div>
                <div className="services">
                    <h1 >Our Services</h1>
                    <p>Therasheet is clinic service providers</p>
                </div>
            </div>
}

export default Services;
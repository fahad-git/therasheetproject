import React from 'react';

function Contact (props) {


    var setHeaderComponent = props.setHeaderComponent;
    setHeaderComponent(true);

    return <div className="contact">
                <h1>Contact Us</h1>
                <p>Therasheet clinic service providers</p>
            </div>

}

export default Contact;
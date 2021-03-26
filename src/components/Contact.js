import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const styles={
    icons:{
        color:"white"
    },
    services:{
        color:"white",
        fontSize:"calc(2px + 2vmin)",
    }
}

function Contact (props) {


    var setHeaderComponent = props.setHeaderComponent;
    setHeaderComponent(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const history = useHistory();

    useEffect(() => {
        if(user)
            history.push("/" + user.accountType);
     }, [])


    return <div className="contact">
                <br/>
                <h1>Contact Us</h1>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <i className="ion-ios-location" style={styles.icons}> Our Location</i>
                            <p style={styles.services}>Physical therapy clinic Frisco, TX, United States</p>
                        </div>
                        <div className="col">
                            <i className="ion-iphone" style={styles.icons}> Give us a Call</i>
                            <p style={styles.services}>
                                +92-42-3569-4095
                                <br/>
                                +92-30-9366-6631
                            </p>
                        </div>
                        <div className="col">
                            <i className="ion-ios-email" style={styles.icons}> Send us a Email</i>
                            <p style={styles.services}>info@therasheet.com</p>
                        </div>
                        <div className="col">
                            <i className="ion-clock" style={styles.icons}> Timings</i>
                            <p style={styles.services}>Monday to Saturday
                            <br/>
                            9:00 AM - 9:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>

}

export default Contact;
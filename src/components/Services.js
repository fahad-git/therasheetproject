import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const styles = {
    services:{
        color:"white",
        fontSize:"calc(5px + 2vmin)",
        marginTop:"10px",
        marginLeft:"100px"
    }
}

function Services(props){

    var setHeaderComponent = props.setHeaderComponent;
    setHeaderComponent(true);


    const user = JSON.parse(localStorage.getItem("user"));
    const history = useHistory();

    
    useEffect(() => {
        if(user)
            history.push("/" + user.accountType);
     }, [])


    return  <div>
                <div className="services">
                    <div className="container">
                        <h1>Therapy Services at Therasheet</h1>
                        <p>At Therasheet we offer a diverse range of services, aligned with and suited to each individual, through our team of qualified and dedicated specialists. Our services cater to individuals across the age spectrum, catering to each of our clients with the due regard, respect and integrity they deserve.
                            There are several forms of psychotherapies that are available at our therapy center including individual therapy, couples therapy as well as group counselling etc.
                            Our core services are listed below:
                        </p>
                        <div className="row">
                            <ul className="col" style={styles.services}>
                                <li>
                                    Individual Therapy
                                </li>
                                <br/>

                                <li>
                                    Children with Special Needs
                                </li>
                                <br/>

                                <li>
                                    Slow Learners
                                </li>
                            </ul>
                            <ul className="col" style={styles.services}>
                                <li >
                                    Sensory Therapy
                                </li>
                                <br/>
                                <li>
                                    Speech-Language Therapy
                                </li>
                                <br/>

                                <li>
                                    Parental Counselling
                                </li>
                            </ul>
                            <ul className="col" style={styles.services}>
                                <li >
                                    Merital Counselling
                                </li>
                                <br/>

                                <li>
                                    Group Therapy
                                </li>
                                <br/>

                                <li>
                                    Occupational Therapy
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
}

export default Services;
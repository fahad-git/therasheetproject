import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import '../assets/bootstrap/css/bootstrap.min.css';

import './../assets/css/BasicComponents.css';

const styles = {
    txt:{
        fontSize:"calc(3px + 2vmin)"
    }
}

function About(props){

    var setHeaderComponent = props.setHeaderComponent;
    setHeaderComponent(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const history = useHistory();

    
    useEffect(() => {
        if(user)
            history.push("/" + user.accountType);
     }, [])



    return  <div>
                <div className="about">
                    <div class="container">
                        <br/><br/>
                        <h1>About US</h1>
                        <br/>
                        <div className="row">
                            <div className="col">
                                <h1>Our Vision</h1>
                                <p style={styles.txt}>
                                    To become the first choice for the community for any and all problems pertaining to mental health by providing them a safe space and access to quality care, enabling them to appropriately address their problems;
                                    And to seek and provide resources for the professional and personal growth and development of our team and the community, in the area of mental health.
                                </p>
                            </div>
                            <div className="col">
                                <h1>Our Mission</h1>
                                <p style={styles.txt}>
                                    To provide specialized, quality, client-centred care, aimed at strengthening the community by improving and fostering their mental health and well-being, through a multi-disciplinary team of qualified specialists working together as a cohesive unit.
                                </p>
                            </div>
                            <div className="col">
                                <h1>Core Values</h1>
                                <p style={styles.txt}>
                                   Therasheet operates on the core values of respect, empathy, integrity, confidentiality, teamwork, quality and professionalism.
                                    We believe that all individuals, regardless of their struggles or conditions, are entitled to treatment with dignity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
}
export default About;
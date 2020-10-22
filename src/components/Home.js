import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './../assets/css/BasicComponents.css';
import './../assets/bootstrap/css/bootstrap.min.css';

import {Modal} from 'react-bootstrap';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

function Home(){

    // const history = useHistory();
    var [isRegistrationFormModalOpen, toggleRegistrationFormModal] = useState(false);
    var [isLoginModalOpen, toggleLoginModal] = useState(false);

    const login_btn_click_handler = () => {
        //    history.push('/login');
        toggleLoginModal(true);
    }

    
    const register_btn_click_handler = () => {
            // history.push('/register');
            toggleRegistrationFormModal(true)
            // alert("ok");
     }

    return <div className="home">
                {/* Modals */}
                {/* Modal 1 this modal is for RegistrationForm*/}
                <Modal show={isRegistrationFormModalOpen}
                       onHide = {()=> { toggleRegistrationFormModal(false)}}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header className="jumbotron" closeButton>
                            <div className="container">
                                <div className="jumbotron">
                                    <div className="row">
                                        <div className="col-12">
                                            <h2 style={{textAlign:"center"}}><strong>Register Clinic</strong></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </Modal.Header>
                    <Modal.Body>
                        {<RegistrationForm />}
                    </Modal.Body>
                    {/* <Modal.Footer>
                        <button className="btn btn-primary text-center" onClick={()=> this.setState({"popup":false})} style={{maxWidth: "200px", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:"#5376f4"}}>Close</button>
                    </Modal.Footer> */}
                </Modal>

                {/* Modal 2 this modal is for Login*/}
                <Modal show={isLoginModalOpen}
                       onHide = {()=> { toggleLoginModal(false)}}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="login-modal"
                >
                    {<LoginForm />}
                </Modal>

                    <h2>Come and Register Today</h2>
                    <h1>Therasheet</h1>
                    <p>Therasheet clinic service providers</p>
                    <div className="home_button">
                        <button onClick={login_btn_click_handler} className="home_btn_login" >Login</button>
                        <button onClick={register_btn_click_handler} className="home_btn_register" >Register</button>
                    </div>
            </div>
}

export default Home;
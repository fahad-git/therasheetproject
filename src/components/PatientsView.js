import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/Admin.css';


import active_patient_icon from '../assets/img/active_patient_icon.png';
import all_patient_icon from '../assets/img/all_patient_icon.png';

import PatientViewInfo from './PatientViewInfo';

import getPatientsForView from '../services/director.service';
//<a id="downloadable" href="/images/myw3schoolsimage.jpg" download>Click</a>
function PatientsView() {

    
    // Accessing data

    // let patient1 = {
    //     "patientname":"patient1",
    //     "username":"User1",
    //     "status":"Active",
    //     };

    // let patient2 = {
    //     "patientname":"patient2",
    //     "username":"User2",
    //     "status":"Active",
    //     };

    // let patient3 = {
    //         "patientname":"patient3",
    //         "username":"User3",
    //         "status":"Blocked",
    //         };

    // let patient4 = {
    //         "patientname":"patient4",
    //         "username":"User4",
    //         "status":"Active",
    //         };


    // let patient5 = {
    //         "patientname":"patient5",
    //         "username":"User5",
    //         "status":"Active",
    //         };

    // let patient6 = {
    //         "patientname":"patient6",
    //         "username":"User6",
    //         "status":"Blocked",
    //         };

    // let patient7 = {
    //         "patientname":"patient7",
    //         "username":"User7",
    //         "status":"Active",
    //         };


    // const all_patients = [patient1,  patient2, patient3, patient4, patient5, patient6, patient7];

    const history = useHistory();
    const modalHeaderColor = "rgba(4, 13, 43, 0.8)";

    var [patientInformation, setPatientInformation] = useState([]);
    var [isPatientInfoOpen, patientInfoToggle] = useState(false);
    var [params, setParams] = useState([]);


    useEffect(()=>{
        getPatientsForView.getPatientsForView()
        .then((response) => {
            console.log(response.data)
            let object = []
            for(let obj of response.data){
                let tmp = {
                    "patientname":obj["name"],
                    "id":obj["patientId"],
                    "status":obj["status"]
                }

                object.push(tmp);
            }
            setPatientInformation(object);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    const patientInfoHandler = (id) =>{
        setParams([id])
        patientInfoToggle(true);        
    }

    const goBackHandler = () => {
        history.goBack();
    }

    return  <div className="admin" >

                {/* Modal 1 this modal is for Patient Info*/}
                <Modal show={isPatientInfoOpen}
                    onHide = {()=> patientInfoToggle(false)}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <h2 className="text-center" style={{color:modalHeaderColor}}><strong>Patient Information</strong></h2>
                    </Modal.Header>
                    <Modal.Body>
                        {<PatientViewInfo params={params}/>}
                    </Modal.Body>
                </Modal>

                <div className="container">
                    <div className="row">        
                        <div className="col-12 col-md-9 col-lg-9 col-xl-10  offset-xl-2  offset-lg-3 offset-md-3 offset-0 card" style={{minHeight:"88vh"}}>
                            <div className="card-body float-left">
                                {/* back button */}
                                <div className="row">
                                    <button className="col-2 offset-1 col-sm-2 offset-sm-0 col-md-2 offset-md-0 col-lg-1 offset-lg-0 col-xl-1 offset-xl-0 btn btn-primary text-center" style={{backgroundColor:modalHeaderColor, fontSize:"calc(2px + 2vmin)"}}  onClick={goBackHandler}><i className="ion-android-arrow-back"></i></button>
                                </div>

                                <div className="row justify-content-center align-items-center top-buffer" style={{marginTop:"100px"}}>
                                    <div className="col-12">
                                        {patientInformation.map( ({patientname, id, status}, index)=>{
                                        return (
                                                <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2 offset-0" style={{float:"left", marginTop:"20px"}} onClick={() => patientInfoHandler(id)}>
                                                    <div className="card tile" >
                                                        <img alt="Not found" className="clinicicon" src={(status === "Completed") ? all_patient_icon : active_patient_icon }/>
                                                    </div>                                                                  
                                                    <label className="card align-text-center" style={{textAlign:"center"}}>{patientname}</label>                                               
                                                </div>
                                                )
                                        })}
                                    </div>
                                </div>

                            </div>
                    </div>
                    </div>
                </div>
            </div>

}

export default PatientsView;
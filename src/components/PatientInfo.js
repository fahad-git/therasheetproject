import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';

import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/ClinicInfo.css';

import getPatientInfo from '../services/clinician.service';

function PatientInfo (props) {


    const history = useHistory();

    const ID = props.params[0];
    var [patientName, setPatientName] = useState('');
    var [contact, setContact] = useState('');
    var [date, setDate] = useState('');
    var [diagnosis, setDiagnosis] = useState('');
    var [precaution, setPrecaution] = useState('');
    var [exerciseStatus, setExerciseStatus] = useState(props.params[1]);



    const buttonColor = "rgba(4, 13, 43, 0.8)";

    const checkInHandler = (event)=>{
        event.preventDefault();

        let data = { 
            "id": ID, 
            "patientName":patientName,
            "diagnosis":diagnosis,
            "date":date,
            "exerciseStatus":exerciseStatus
        }
        localStorage.setItem("exerciseDataForPatient", JSON.stringify(data));
        history.push('/exercise');
    }

    useEffect(()=>{
        getPatientInfo.getPatientInfo(ID)
        .then((response) =>{
            setPatientName(response.data["name"]);
            setContact(response.data["contact"]);
            setDiagnosis(response.data["diagnosis"]);
            setPrecaution(response.data["precausion"]);
            setDate(response.data["date"]);
        }).catch((err) => console.log(err));

    }, []);

    return <div>
                 <div className="clinicinfo">
                     <div className="container ">
                         <form onSubmit={checkInHandler}>
                            <div className="row no-gutters">
                                 <div className="col-5" ><label className="form-control" >Patient Name</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}}><textarea disabled={true} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={patientName}/></div>
                             </div>

                             {/* <div className="row no-gutters">
                                 <div className="col-5" ><label className="form-control" >Contact</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}}><textarea disabled={true} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={contact}/></div>
                             </div>              */}

                             <div className="row no-gutters">
                                 <div className="col-5" ><label className="form-control" >Diagnosis</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}}><textarea disabled={true} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={diagnosis}/></div>
                             </div>

                             <div className="row no-gutters">
                                 <div className="col-5" ><label className="form-control" >Precaution</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}}><textarea disabled={true} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={precaution}/></div>
                             </div>                             
                        

                             <div className="row no-gutters">
                                 <div className="col-5" ><label className="form-control" >Exercise Status</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}}><textarea disabled={true} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={exerciseStatus}/></div>
                             </div>                             


                             <div className="row no-gutters">
                                 <div className="col-5" ><label className="form-control" >Date</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}}><textarea disabled={true} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={date}/></div>
                             </div>                              

                             <button className="btn btn-primary text-center" style={{maxWidth: "200px", float:"right", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:buttonColor}}>Check-In</button>
                         </form>
                     </div>
                 </div>       
                <script src="../assets/js/jquery.min.js"></script>
                <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            </div>

}
export default PatientInfo;


import React, { useState, useEffect } from 'react';

import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/ClinicInfo.css';

import getPatientsByID from '../services/director.service';

function PatientViewInfo (props) {

    const ID = props.params[0];
    var [patientName, setPatientName] = useState();
    var [precaution, setPrecaution] = useState();
    var [diagnosis, setDiagnosis] = useState();
    var [registractionDate, setRegistractionDate] = useState();
    var [protocol, setProtocol] = useState(null);
    
    const buttonColor = "rgba(4, 13, 43, 0.8)";

    useEffect(()=>{
        getPatientsByID.getPatientsByID(ID)
        .then((response) => {
            // console.log(response.data);
            setPatientName(response.data["name"]);
            setDiagnosis(response.data["diagnosis"]);
            setPrecaution(response.data["precausion"]);
            setRegistractionDate(response.data["date"]);
            let file =  "data:" + response.data["file"]["type"] + ";base64," + response.data["file"]["data"]; 
            setProtocol(file)
        })
        .catch((err) => {
            console.log('');
        })
    },[])



    return <div>
                 <div className="clinicinfo">
                     <div className="container ">
                         <form>
                            <div className="row no-gutters">
                                 <div className="col-5" ><label className="form-control" >Patient Name</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}}><textarea disabled={true} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={patientName}/></div>
                             </div>

                              {/* <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Contact</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={contact}/></div>
                             </div> */}

                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Diagnosis</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={diagnosis}/></div>
                             </div>


                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Precaution</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={precaution}/></div>
                             </div>

                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Protocol</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><a disabled={false}  className="form-control"  href={protocol} download={patientName+".pdf"}>Download<i className="ion-code-download"></i></a></div>
                             </div>

                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Registration Date</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={registractionDate}/></div>
                             </div>

                              {/* <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Username</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={userName}/></div>
                             </div> */}
{/* 
                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Email</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><textarea disabled={true} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={emailAddress}/></div>
                             </div>  */}

                             {/* <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Account Status</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={accountStatus}/></div>
                             </div>  */}

                         </form>
                     </div>
                 </div>       
                <script src="../assets/js/jquery.min.js"></script>
                <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            </div>

}
export default PatientViewInfo;


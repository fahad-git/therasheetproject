import React, { useState } from 'react';

import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/ClinicInfo.css';

function PatientViewInfo (props) {

    var [userName, setUserName] = useState(props.params[0]);
    var [clinicianName, setClinicianName] = useState(props.params[1]);
    var [emailAddress, setEmailAddress] = useState('azhar@perfektsolution.com');
    var [accountStatus, setAccountStatus] = useState('Active');

    const buttonColor = "rgba(4, 13, 43, 0.8)";


    return <div>
                 <div className="clinicinfo">
                     <div className="container ">
                         <form>
                            <div className="row no-gutters">
                                 <div className="col-5" ><label className="form-control" >Patient Name</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}}><textarea disabled={true} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={clinicianName}/></div>
                             </div>

                              <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Username</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={userName}/></div>
                             </div>

                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Email</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><textarea disabled={true} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={emailAddress}/></div>
                             </div> 

                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Account Status</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={accountStatus}/></div>
                             </div> 

                         </form>
                     </div>
                 </div>       
                <script src="../assets/js/jquery.min.js"></script>
                <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            </div>

}
export default PatientViewInfo;


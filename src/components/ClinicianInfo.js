import React, { useState } from 'react';

import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/ClinicInfo.css';

function ClinicianInfo (props) {

    var [userName, setUserName] = useState(props.params[0]);
    var [clinicName, setClinicName] = useState(props.params[1]);
    var [ownerName, setOwnerName] = useState('Azhar');
    var [phoneNumber, setPhoneNumber] = useState('+923132534867');
    var [facilityAddress, setFacilityAddress] = useState('Gareebabad Near Sufi Zaheer SUkkur');
    var [emailAddress, setEmailAddress] = useState('azhar@perfektsolution.com');
    var [registrationDate, setRegistrationDate] = useState('12/4/2020');
    var [subscriptionDate, setSubscriptionDate] = useState('15/5/2020');
    var [numberOfClinicians, setNumberOfClinicians] = useState('20');
    var [accountStatus, setAccountStatus] = useState('Active');
    var [accountStatusButton, setAccountStatusButton] = useState('Deactivate');


    const buttonColor = "rgba(4, 13, 43, 0.8)";

    const changeStatusHandler = (event)=>{
        event.preventDefault();

        // database Update query

        if(accountStatusButton === "Activate"){
            
            setAccountStatus("Active");
            setAccountStatusButton("Deactivate");
            }
        else{
            setAccountStatus("Disabled");
            setAccountStatusButton("Activate");
        }
    }

    return <div>
                 <div className="clinicinfo">
                     <div className="container ">
                         <form onSubmit={changeStatusHandler}>
                            <div className="row no-gutters">
                                 <div className="col-5" ><label className="form-control" >Clinic Name</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}}><textarea disabled={true} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={clinicName}/></div>
                             </div>
                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Owner Name</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}}><input disabled={true} className="form-control"  type="text" placeholder={ownerName}/></div>
                             </div>
                              <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Username</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={userName}/></div>
                             </div>
                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Phone Number</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={phoneNumber}/></div>
                             </div>                           

                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Facility Address</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><textarea  disabled={true} rows="1" className="form-control" style={{resize: "none"}}  type="text" placeholder={facilityAddress}/></div>
                             </div> 

                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Email</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><textarea disabled={true} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={emailAddress}/></div>
                             </div> 

                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Registration Date</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={registrationDate}/></div>
                             </div> 

                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Subscription Date</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={subscriptionDate}/></div>
                             </div> 

                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Number of Clinicians</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={numberOfClinicians}/></div>
                             </div> 

                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Account Status</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={accountStatus}/></div>
                             </div> 

                             <button className="btn btn-primary text-center" onClick={changeStatusHandler} style={{maxWidth: "200px", float:"right", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:buttonColor}}>{accountStatusButton}</button>
                         </form>
                     </div>
                 </div>       
                <script src="../assets/js/jquery.min.js"></script>
                <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            </div>

}
export default ClinicianInfo;


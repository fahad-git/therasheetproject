import React, { useState, useEffect } from 'react';

import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/ClinicInfo.css';

import getClinicianInfo from '../services/director.service';
import blockClinician from "../services/director.service";
import activeClinician from "../services/director.service";

function ClinicianInfo (props) {

    const ID = props.params[0]
    var [userName, setUserName] = useState('');
    var [clinicianName, setClinicianName] = useState('');
    var [emailAddress, setEmailAddress] = useState('');
    var [accountStatus, setAccountStatus] = useState('Active');
    var [accountStatusButton, setAccountStatusButton] = useState('Deactivate');


    const buttonColor = "rgba(4, 13, 43, 0.8)";


    useEffect(()=>{
        getClinicianInfo.getClinicianInfo(ID)
        .then((response) => {
            // API
        //    console.log(response.data);
           setUserName(response.data["login"]["username"])
           setClinicianName(response.data["name"]);
           setEmailAddress(response.data["email"])
           setAccountStatus(response.data["login"]["status"])

        // database Update query

        if(response.data["login"]["status"] == "Active")
            setAccountStatusButton("Deactivate");
        else
            setAccountStatusButton("Activate");
            

          }).catch((err)=>{
            // console.log("Can not find user!")
            console.log('');            
          });
    }, [])


    const changeStatusHandler = (event)=>{
        event.preventDefault();

        // database Update query

        if(accountStatusButton === "Activate"){
            
            activeClinician.activeClinician(ID)
            .then((response) => {
                if(response.data == "True"){
                    // console.log("ID: "+ ID + " Active")

                    setAccountStatus("Active");
                    setAccountStatusButton("Deactivate");
                }
            }).catch((err) => {
                console.log('');
                // console.log(err);
            })
           
            }
        else{

            blockClinician.blockClinician(ID)
            .then((response) => {
                if(response.data == "True"){
                    // console.log("ID: "+ ID + " Blocked");
                    setAccountStatus("Disabled");
                    setAccountStatusButton("Activate");
                }
            }).catch((err) => {
                console.log('');
                // console.log(err);
            })
            
        }
    }

    return <div>
                 <div className="clinicinfo">
                     <div className="container ">
                         <form onSubmit={changeStatusHandler}>
                            <div className="row no-gutters">
                                 <div className="col-5" ><label className="form-control" >Clinician Name</label></div>
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

                             <button className="btn btn-primary text-center" onClick={changeStatusHandler} style={{maxWidth: "200px", float:"right", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:buttonColor}}>{accountStatusButton}</button>
                         </form>
                     </div>
                 </div>       
                <script src="../assets/js/jquery.min.js"></script>
                <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            </div>

}
export default ClinicianInfo;


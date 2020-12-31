import React, { useState, useEffect } from 'react';

import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/ClinicInfo.css';

import getClinicInfo from "../services/admin.service";

import blockClinics from "../services/admin.service";
import activeClinics from "../services/admin.service";

function ClinicInfo(props) {

    const ID = useState(props.params[0]);
    var [userName, setUserName] = useState('');
    var [clinicName, setClinicName] = useState('');
    var [ownerName, setOwnerName] = useState('');
    var [phoneNumber, setPhoneNumber] = useState('');
    var [facilityAddress, setFacilityAddress] = useState('');
    var [emailAddress, setEmailAddress] = useState('');
    var [registrationDate, setRegistrationDate] = useState('');
    var [subscriptionDate, setSubscriptionDate] = useState('');
    var [numberOfClinicians, setNumberOfClinicians] = useState('');
    var [accountStatus, setAccountStatus] = useState('');
    var [accountStatusButton, setAccountStatusButton] = useState('');


    const buttonColor = "rgba(4, 13, 43, 0.8)";

    useEffect(()=>{
        getClinicInfo.getClinicInfo(ID)
        .then((response) => {
            // API
           console.log(response.data);
           setUserName(response.data["userName"])
           setClinicName(response.data["clinicName"]);
           setOwnerName(response.data["ownerName"])
           setPhoneNumber(response.data["phoneNumber"])
           setFacilityAddress(response.data["facilityAddress"])
           setEmailAddress(response.data["emailAddress"])
           setRegistrationDate(response.data["registrationDate"])
           setSubscriptionDate(response.data["subscriptionDate"])
           setNumberOfClinicians(response.data["numberOfClinicians"])
           setAccountStatus(response.data["accountStatus"])

        // database Update query

        if(response.data["accountStatus"] == "Active")
            setAccountStatusButton("Deactivate");
        else
            setAccountStatusButton("Activate");
            

          }).catch((err)=>{
            console.log("Can not find user!")
            
          });
    }, [])



    const changeStatusHandler = (event)=>{
        event.preventDefault();

        const id = ID[0];
        // database Update query
        if(accountStatusButton === "Activate"){
            activeClinics.activeClinics(id)
            .then((response) => {
            setAccountStatus("Active");
            setAccountStatusButton("Deactivate");
            }).catch((err) => {
                console.log(err);
            });
        }
        else{
            blockClinics.blockClinics(id)
            .then((response) => {
                if(response.data == "True"){
                    setAccountStatus("Disabled");
                    setAccountStatusButton("Activate");
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
export default ClinicInfo;



// class ClinicInfo extends React.Component{

//     constructor(props){
//         super(props)

//         // Here it will request for data
//         let user_name = this.props.params[0];
//         let index = this.props.params[1];
//         let clinic_name = this.props.params[2]


//         let status = 'Active';
//         let statusbtn;
//         // query (index,value)
        

//         if(status=== 'Active')
//             statusbtn = "Deactivate";
//         else
//             statusbtn = "Activate";
        


//         this.state = {
//             clinicname:clinic_name,
//             ownername:"James",
//             username:user_name,
//             phone:"333-21-212",
//             facilityaddress:"ABC Clinic US-72, Madison United States",
//             email:"clinic@madison.com",
//             registrationdate:"10/7/2020",
//             subscriptionenddate:"11/8/2020",
//             noofclinician:index,
//             accountstatus:status,
//             accountstatusbtn:statusbtn
//         }

//     }

//     changeStatusHandler = (event)=>{
//         event.preventDefault();

//         let currentStatus  = this.state.accountstatus;
//         // database Update query

//         if(currentStatus === 'Active')
//             this.setState({"accountstatus":"Disable","accountstatusbtn":"Activate"})
//         else
//             this.setState({"accountstatus":"Active", "accountstatusbtn":"Deactivate"})
//     }

//     render(){
//         return(
//             <div>
//                 <div className="popup">
//                     <div className="form-container">
//                         <form onSubmit={this.register_clinic_handler}>
//                             {/* <h2 className="text-center" style={{color:"#5376f4"}}><strong>Clinic Information</strong></h2>
//                              */}
//                             <div>
//                                 <div style={{float:"left"}} class="card"><label style={{padding:"10px 10px", width:"180px",  textAlign:"left", fontWeight:"bold"}} >Clinic Name</label></div>
//                                 <div style={{float:"right"}} class="card"><input disabled={true}  style={{padding:"10px 20px", width:"280px", height:"50px" }} className="form-control"  type="text" name="clinicname" value={this.state.clinicname}/></div>
//                             </div>

//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Owner Name</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={true}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="ownername" value={this.state.ownername}/></div>
//                             </div>

//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Username</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={true}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="username" value={this.state.username}/></div>
//                             </div>
                            

//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px",  textAlign:"left", fontWeight:"bold"}} >Phone Number</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={true}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="phone" value={this.state.phone}/></div>
//                             </div>
                                                

//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Facility Address</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={true}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="facilityaddress" value={this.state.facilityaddress}/></div>
//                             </div>


//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Email</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={true}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="email" value={this.state.email}/></div>
//                             </div>

//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Registration Date</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={true}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="registrationdate" value={this.state.registrationdate}/></div>
//                             </div>

//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Subscription End Date</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={true}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="subscriptionenddate" value={this.state.subscriptionenddate}/></div>
//                             </div>

//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Number of Clinicians</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={true}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="noofclinician" value={this.state.noofclinician}/></div>
//                             </div>

//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Account Status</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={true}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="accountstatus" value={this.state.accountstatus}/></div>
//                             </div>

//                             <button className="btn btn-primary text-center" onClick={this.changeStatusHandler} style={{maxWidth: "200px", float:"right", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:"#5376f4"}}>{this.state.accountstatusbtn}</button>
//                         </form>
//                     </div>
//                 </div>
//                 <script src="../assets/js/jquery.min.js"></script>
//                 <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
//             </div>
//         )
//     }
// }

// export default ClinicInfo;
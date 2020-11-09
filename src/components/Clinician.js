import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import {DatePickerInput } from 'rc-datepicker';

import 'rc-datepicker/lib/style.css';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/Admin.css';
import '../assets/css/Clinician.css';

import {Modal} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';


import active_patient_icon from '../assets/img/active_patient_icon.png';
import all_patient_icon from '../assets/img/all_patient_icon.png';


import PatientInfo from './PatientInfo';
import ChangePassword from './ChangePassword';
import AddNewPatient from './AddNewPatient';
import ClinicianAccountInfo from './ClinicianAccountInfo';


import { CLINICIAN_PROFILE_INFO_MODAL_CLOSE, CLINICIAN_PASSWORD_MODAL_CLOSE } from "../constants/modal";


function Clinician (props) {

    var setHeaderComponent = props.setHeaderComponent;
    setHeaderComponent(false);

    // const [setAccountUsername, setAccountType, setAccountProfileUrl] = props.userDetails;
    // setAccountUsername("Sarah");
    // setAccountType("Clinician");
    // setAccountProfileUrl("https://www.unitex.com/wp-content/uploads/2018/04/Unitex-Nursing-Shortage-1.jpg");



    // Accessing data

    let patient1 = {
        "patientname":"patient1",
        "username":"User1",
        "status":"Active",
        };

    let patient2 = {
        "patientname":"patient2",
        "username":"User2",
        "status":"Active",
        };

    let patient3 = {
            "patientname":"patient3",
            "username":"User3",
            "status":"Blocked",
            };

    let patient4 = {
            "patientname":"patient4",
            "username":"User4",
            "status":"Active",
            };


    let patient5 = {
            "patientname":"patient5",
            "username":"User5",
            "status":"Active",
            };

    let patient6 = {
            "patientname":"patient6",
            "username":"User6",
            "status":"Blocked",
            };

    let patient7 = {
            "patientname":"patient7",
            "username":"User7",
            "status":"Active",
            };


    const active_patients = [patient1, patient2, patient4, patient5, patient7]; 
    const all_patients = [patient1,  patient2, patient3, patient4, patient5, patient6, patient7];
        
    const dispatch = useDispatch();

    const modalHeaderColor = "rgba(4, 13, 43, 0.8)";

    const {isClinicianAccountInfoOpen} = useSelector((state) => state.modalReducer);
    const {isClinicianPasswordChange} = useSelector((state) => state.modalReducer);

    const history = useHistory(); 
    
    var today = new Date();
    var dd = String(today.getDate());

    var [clinicianName, setClinicianName] = useState('John');
    var [userName, setUserName] = useState('johntherasheet');
    var [profileURL, setProfileURL] = useState('');
    var [patientInformation, setPatientInformation] = useState(active_patients);
    var [params, setParams] = useState([]);
    var [background_color, setBackground_color] = useState("rgba(4, 13, 43, 0.8)");
    var [isPatientInfoOpen, patientInfoToggle] = useState(false);
    // var [isAccountInfoOpen, accountInfoToggle] = useState(false);
    // var [isPasswordChange, passwordChangeToggle] = useState(false);
    var [isAddNewPatientOpen, addNewPatientToggle] = useState(false);
    var [selectedDate, setSelectedDate] = useState({dd});


    const accountInfoToggle = () => {
        dispatch({
            type: CLINICIAN_PROFILE_INFO_MODAL_CLOSE,
            isClinicianAccountInfoOpen: false
        });
    }

    const passwordChangeToggle = () => {
        dispatch({
            type: CLINICIAN_PASSWORD_MODAL_CLOSE,
            isClinicianPasswordChange: false
        });
    }


    const addPatientHandler = () =>{
        // alert("New Clinic Will be Added")
        setParams([userName]);
        // passwordChangeToggle(true);
        // accountInfoToggle(true);
        addNewPatientToggle(true);
    }
    

    const patientSelectHandler = (event) =>{
        let value = event.target.value;
        
        switch(value){
            case "Today's All Patients":
                setPatientInformation(all_patients);
            break;

            case "Today's Patients":
                setPatientInformation(active_patients)
            break;
            default:
                setPatientInformation(active_patients);
            break;
        }
    }

    const patientInfoHandler = (username, patientname) =>{
        setParams([username, patientname])
        patientInfoToggle(true);        
    }


    const onchange = (jsDate, dateString) => {
        // ...

        let date = jsDate.getDate();
        let month = (jsDate.getMonth()+1);
        let year = jsDate.getFullYear();

        let fulldate = date+":"+month+":"+year;
        console.log("Date: "+date+" Month: "+month+" Year: "+year);

        alert(fulldate);

        // API call for this date.

      }


    return <div className="admin">
                    
            {/* ***************************************** Modals ****************************** */}
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
                        {<PatientInfo params={params}/>}
                    </Modal.Body>
                </Modal>

                {/* Modal 2 this modal is for Clinic Director Info*/}
                <Modal show={isClinicianAccountInfoOpen}
                    onHide = {accountInfoToggle}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <h2 className="text-center" style={{color:modalHeaderColor}}><strong>Clinician Information</strong></h2>
                    </Modal.Header>
                    <Modal.Body>
                        {<ClinicianAccountInfo params={params}/>}
                    </Modal.Body>
                </Modal>

                {/* Modal 3 this modal is for Clinician Password Change*/}
                <Modal show={isClinicianPasswordChange}
                    onHide = {passwordChangeToggle}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <h3 className="text-center" style={{color:background_color}}><strong>Clinician Password Change</strong></h3>
                    </Modal.Header>
                    <Modal.Body>
                        {<ChangePassword params={params}/>}
                    </Modal.Body>
                </Modal>

                {/* Modal 4 this modal is for Add New Patient*/}
                <Modal show={isAddNewPatientOpen}
                    onHide = {()=> addNewPatientToggle(false)}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <h3 className="text-center" style={{color:background_color}}><strong>Add New Patient</strong></h3>
                    </Modal.Header>
                    <Modal.Body>
                        {<AddNewPatient />}
                    </Modal.Body>
                </Modal>

            <div className="container">
                <div className="row" >
                    <div className="col-12 offset-0" >
                        {/* this is add new patient button  */}
                        <button className="btn btn-primary text-left float-right" style={{backgroundColor:background_color}} onClick={addPatientHandler} >Add New Patient</button>
                    </div>
                </div>

                <div className="row top-buffer">        
                    <div className="col-12 col-md-9 col-lg-9 col-xl-10  offset-xl-2  offset-lg-3 offset-md-3 offset-0 card">
                        <div className="card-body float-left">
                            <div className="row justify-content-left">
                                {/* this is dropdown menu for patients */}
                                <div className="dropdown">
                                    <select className="btn btn-primary dropdown-toggle" type="button" onChange={patientSelectHandler} style={{backgroundColor:background_color, maxWidth: "200px", width:"200px", maxHeight: "70px", height:"40px", border:"0px", outline:"none", fontSize:"16px"}}>
                                        <option className="dropoptions" value="Today's Patients">Today's Patients</option>   
                                        <option className="dropoptions" value="Today's All Patients">All Patients</option>
                                    </select>
                                </div>
                            </div>


                            <div className="col-12 col-sm-8 offset-sm-4 col-md-6 offset-md-6 col-lg-4 offset-lg-8" style={{float:"right", marginTop:"10px"}}>
                                {/* // this renders the full component (input and datepicker) */}
                                <DatePickerInput
                                onChange={onchange}
                                value={today}
                                className='my-custom-datepicker-component'
                                />
                            </div>

                            <div className="row justify-content-center align-items-center top-buffer" style={{marginTop:"100px"}}>
                                <div className="col-12">
                                    {patientInformation.map( ({patientname, username, status}, index)=>{
                                    return (
                                            <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2 offset-0" style={{float:"left", marginTop:"20px"}} onClick={() => patientInfoHandler(username, patientname)}>
                                                <div className="card tile" >
                                                    <img alt="Not found" className="clinicicon" src={(status === "Active") ? active_patient_icon : all_patient_icon} />
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

export default Clinician;




// import React from 'react';
// import {DatePickerInput } from 'rc-datepicker';
// import {Modal} from 'react-bootstrap';

// import '../assets/bootstrap/css/bbootstrap.min.css';
// import '../assets/bootstrap/css/bootstrap.min.css';

// import 'rc-datepicker/lib/style.css';
// import Background from '../assets/img/btnimg.png';

// // import PatientInfo from './patientInfo';
// // import ClinicianInfo from './clinicianInfo';
// // import AddPatientInfo from './addPatientInfo';
// import ChangePassword from './ChangePassword';

// import {withRouter} from 'react-router-dom';

// class ClinicianDashboard extends React.Component{


//     constructor(props){

//         super(props);

    
//         // Accessing data

//         const img_url = "https://www.pinclipart.com/picdir/big/133-1332476_crowd-of-users-transparent-user-icon-png-clipart.png";

//         let Patient1 = {
//             "patientname":"Patient1",
//             "username":"User1",
//             "status":"Active",
//             "display":"block",
//             "profile":img_url
//             };
    

//         let Patient2 = {
//             "patientname":"Patient2",
//             "username":"User2",
//             "status":"Active",
//             "display":"block",
//             "profile":img_url
//             };
        

//         let Patient3 = {
//             "patientname":"Patient3",
//             "username":"User3",
//             "status":"Active",
//             "display":"block",
//             "profile":img_url
//             };



//         let Patient4 = {
//             "patientname":"Patient4",
//             "username":"User4",
//             "status":"Active",
//             "display":"block",
//             "profile":img_url
//             };


//         let Patient5 = {
//             "patientname":"Patient5",
//             "username":"User5",
//             "status":"Active",
//             "display":"block",
//             "profile":img_url
//             };
            

//         let Patient6 = {
//             "patientname":"Patient6",
//             "username":"User6",
//             "status":"Active",
//             "display":"block",
//             "profile":img_url
//             };


//         let Patient7 = {
//             "patientname":"Patient7",
//             "username":"User7",
//             "status":"Active",
//             "display":"block",
//             "profile":img_url
//              };
                            
            
//         // this data will be provided by API
//         const elems = [Patient1, Patient2, Patient3, Patient4, Patient5, Patient6, Patient7];
    

//         var today = new Date();
//         var dd = String(today.getDate())


//         this.state = {
//             clinician:"Clinician",
//             clinicianName: "Sarah",
//             username:"sarah",
//             profileUrl:"https://www.unitex.com/wp-content/uploads/2018/04/Unitex-Nursing-Shortage-1.jpg",
//             todate:{dd},
//             params:[],
//             popup:false,
//             patientInformation:elems,
//             accountInfoPopup:false,
//             addnewpatientpopup:false,
//             changepasswordpopup:false
//         }
//     }

//     settinghandler= () => {
//         let settings = document.getElementById('settings');

//         if(settings.value === 'AccountInfo'){
//             this.setState({"accountInfoPopup":true, "params":[this.state.username, this.state.clinicianName]});
//         }
//         else if (settings.value === 'Logout')
//             // alert("Going to "+settings.value);
//             this.props.history.goBack();
//         else if (settings.value === 'ChangePassword'){
//             this.setState({"changepasswordpopup":true, "params":[this.state.username]});
//         }

//         settings.selectedIndex = 0;
//     }

//     addPatientHandler = () =>{
//         this.setState({"addnewpatientpopup":true})
//     }


//     patientSelectHandler = (event) =>{
//         let value = event.target.value;
        
//         if(value === "Patients"){
//             alert("Patient API call");
            
        
//         }else if(value === "All Patients"){
//             alert("All Patient API call");
//         }
//     }

//     patientInfoHandler = (username, index, patientname) =>{
//         let text = document.getElementById("patientselect").value;

//         if(text === "Patients"){

//             let checkoutEnable = false;
//             this.setState({"popup":true, params:[username, index, patientname, checkoutEnable]});
        
//         }else if(text === "All Patients"){

//             let checkoutEnable = true;
//             this.setState({"popup":true, params:[username, index, patientname, checkoutEnable]});
//         }
      
//     }

    
//     onchange = (jsDate, dateString) => {
//         // ...

//         let date = jsDate.getDate();
//         let month = (jsDate.getMonth()+1);
//         let year = jsDate.getFullYear();

//         let fulldate = date+":"+month+":"+year;
//         console.log("Date: "+date+" Month: "+month+" Year: "+year);

//         alert(fulldate);

//         // API call for this date.

//       }

//     render (){
//         // this data will be provided by API
//         const elems = ['Patient1', 'Patient2', 'Patient3', "Patient4","Patient5","Patient6", "Patient7",'Patient1', 'Patient2', 'Patient3', "Patient4","Patient5","Patient6", "Patient7"];
//         return (

//             <div>

//                 {/* Modal 1 this modal is for Patient Info */}

//                 <Modal  show={this.state.popup}
//                         onHide = {()=> {this.setState({"popup":false}); window.location.reload(false); }}
//                         size="md"
//                         aria-labelledby="contained-modal-title-vcenter"
//                         centered
//                 >
//                 <Modal.Header closeButton>
//                     <h2 className="text-center" style={{color:"#5376f4"}}><strong>Patient Information</strong></h2>
//                 </Modal.Header>
//                     <Modal.Body>
//                         {/* {<PatientInfo params={this.state.params}/>} */}
//                     </Modal.Body>
//                     {/* <Modal.Footer>
//                         <button className="btn btn-primary text-center" onClick={()=> this.setState({"popup":false})} style={{maxWidth: "200px", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:"#5376f4"}}>Close</button>
//                     </Modal.Footer> */}
//                 </Modal>

//                     {/* Modal 2 this modal is for Clinician Info*/}
//                 <Modal show={this.state.accountInfoPopup}
//                        onHide = {()=>{ this.setState({"accountInfoPopup":false}); window.location.reload(false);
//                     }}
//                 size="md"
//                 aria-labelledby="contained-modal-title-vcenter"
//                 centered
//                 >
//                     <Modal.Header closeButton>
//                         <h3 className="text-center" style={{color:"#5376f4"}}><strong>Clinician Information</strong></h3>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {/* {<ClinicianInfo params={this.state.params}/>} */}
//                     </Modal.Body>
//                     {/* <Modal.Footer>
//                         <button className="btn btn-primary text-center" onClick={()=> this.setState({"popup":false})} style={{maxWidth: "200px", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:"#5376f4"}}>Close</button>
//                     </Modal.Footer> */}
//                 </Modal>
            
//                 {/* Modal 3 this modal is for Admin Password Change*/}
//                 <Modal show={this.state.changepasswordpopup}
//                 onHide = {()=>{ this.setState({"changepasswordpopup":false}); window.location.reload(false);}}
//                 size="md"
//                 aria-labelledby="contained-modal-title-vcenter"
//                 centered
//                 >
//                     <Modal.Header closeButton>
//                         <h3 className="text-center" style={{color:"#5376f4"}}><strong>Admin Password Change</strong></h3>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {<ChangePassword username={this.state.username}/>}
//                     </Modal.Body>
//                     {/* <Modal.Footer>
//                         <button className="btn btn-primary text-center" onClick={()=> this.setState({"popup":false})} style={{maxWidth: "200px", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:"#5376f4"}}>Close</button>
//                     </Modal.Footer> */}
//                 </Modal>

//                 {/* Modal 4 this modal is for adding new patient*/}
//                 <Modal 
//                 show={this.state.addnewpatientpopup}
//                 onHide = {()=>{ this.setState({"addnewpatientpopup":false}); window.location.reload(false);}}
//                 size="md"
//                 aria-labelledby="contained-modal-title-vcenter"
//                 centered
//                 >
//                     <Modal.Header closeButton>
//                         <h3 className="text-center" style={{color:"#5376f4"}}><strong>Add New Patient</strong></h3>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {/* {<AddPatientInfo />} */}
//                     </Modal.Body>
//                     {/* <Modal.Footer>
//                         <button className="btn btn-primary text-center" onClick={()=> this.setState({"popup":false})} style={{maxWidth: "200px", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:"#5376f4"}}>Close</button>
//                     </Modal.Footer> */}
//                 </Modal>  



//                 <nav className="navbar navbar-dark navbar-expand-lg fixed-top bg-white portfolio-navbar gradient" style={{backgroundColor:"#5376f4"}}>
//                         <div className="container" >
//                             <a className="navbar-brand logo" href={"#"} style={{marginRight: "10px"}}>{this.state.clinician}</a>
//                             <button datatoggle="collapse" className="navbar-toggler" datatarget="#navbarNav">
//                                 <span className="sr-only">Toggle navigation</span>
//                                 <span className="navbar-toggler-icon"></span>
//                             </button>
//                             <div className="collapse navbar-collapse" id="navbarNav">
//                                 <ul className="nav navbar-nav ml-auto">
//                                     <li className="nav-item" role="presentation" style={{width: "32px", height: "32px", paddingRight: "16px"}}>
//                                         {/* this is settings menu */}
//                                         <select id="settings" className="btn btn-primary text-right" type="button" onChange={this.settinghandler} style={{backgroundColor:"#5376f4", backgroundImage: "url("+Background+")", width: "32px", height: "32px"}}>
//                                             <option style={{backgroundColor:"white", color:"black", fontSize:"1px"}}></option>
//                                             <option value="AccountInfo" style={{backgroundColor:"white", color:"black", fontSize:"14px"}} >Account Info</option>
//                                             <option value="ChangePassword" style={{backgroundColor:"white", color:"black", fontSize:"14px"}} >Change Password</option>
//                                             <option value="Logout" style={{backgroundColor:"white", color:"black" , fontSize:"14px"}}>Logout</option>
//                                         </select> 
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </nav>
//                     <main className="page contact-page"></main>
//                     <div className="border-dark">
//                         <div className="container" style={{padding: "0px", margin: "0px", width: "1191px", maxwidth: "1191px"}}>
//                             <div className="row justify-content-start" style={{margin: "0px", maxwidth: "1191px", width: "1191px"}}>
//                                 <div className="col-sm-1 col-md-2 col-lg-2 col-xl-3 offset-0" style={{height: "650px", padding: "0px", backgroundColor: "#5376f4", maxWidth: "30%"}}>
//                                     <center>
//                                         <img className="rounded-circle img-fluid border d-lg-flex justify-content-lg-center align-items-lg-center" src={this.state.profileUrl} data-bs-hover-animate="pulse" style={{marginTop: "80px", width: "150px", height: "150px"}} />
//                                         <label className="text-center text-white d-lg-flex  justify-content-center justify-content-lg-center" style={{marginTop: "20px", padding:"10px", fontSize:"20px", fontWeight:"bold", backgroundColor:"#5376f4", maxWidth: "250px", width:"180px", maxHeight: "70px", height:"50px"}}>{this.state.clinicianName}</label>
//                                     </center>
//                                 </div>
//                                 <div className="col-sm-4 col-md-8 col-lg-8 col-xl-8 offset-0" style={{marginLeft:"60px", marginTop:"20px", padding: "0px", maxWidth: "1500px", width: "1300px"}}>
//                                     {/* this is add new patient button */}
//                                     <button className="btn btn-primary text-left float-right" onClick={this.addPatientHandler} style={{maxWidth: "200px", maxHeight: "50px", backgroundColor:"#5376f4"}}>Add New Patient</button>

//                                     <div className="card" style={{marginTop: "50px", height: "600px"}}>
//                                         <div className="card-body float-left">
//                                             {/* this is dropdown menu for patients */}
//                                             <div  className="dropdown" style={{float:"left", textAlign:"left", marginTop:"10px", marginLeft:"20px", marginBottom:"80px"}}>
//                                                 <select id="patientselect" className="btn btn-primary dropdown-toggle" type="button" onChange={this.patientSelectHandler} style={{backgroundColor:"#5376f4", maxWidth: "200px", width:"200px", maxHeight: "70px", height:"40px", border:"0px", outline:"none", fontSize:"16px"}}>
//                                                     <option value="Patients" style={{backgroundColor:"white", color:"black"}}>Today's Patients</option>
//                                                     <option value="All Patients" style={{backgroundColor:"white", color:"black"}}>Today's All Patients</option>
//                                                 </select>
//                                             </div>

//                                             <div style={{float:"right", marginTop:"10px"}}>
//                                                 {/* // this renders the full component (input and datepicker) */}
//                                                 <DatePickerInput
//                                                 onChange={this.onchange}
//                                                 value={this.state.todate}
//                                                 className='my-custom-datepicker-component'
//                                                 />

//                                             </div>

//                                             <div style={{float:"right", marginTop:"10px"}}>
//                                                 <label className="card" style={{marginLeft:"30px",  height:"35px", width:"120px", fontSize:"15px", fontWeight:"bold", padding:"5px"}}>Select Date: </label>
//                                             </div>
                                            
//                                             <br/><br/><br/><br/><br/>                             

//                                             <div style={{float:"clear" }}><br/>
//                                                 {this.state.patientInformation.map( ({patientname, username, status, profile}, index)=>{
//                                                         return <div key={index} style={{float:"left", marginBottom:"20px"}} onClick={() => this.patientInfoHandler(username, index, patientname)}>
//                                                                     <div className="card" style={{backgroundColor: "#5376f4", marginLeft:"30px", width: "100px", height: "100px", marginTop: "10px"}}>
//                                                                         <div className="card-body" style={{backgroundColor: "rgba(83,118,244,0)"}}>
//                                                                             <h4 className="card-title"><img style={{width:"100%", height:"100%"}} src={profile} /></h4>
//                                                                         </div>
//                                                                     </div>                                                                  
//                                                                     <label className="card" style={{marginLeft:"30px"}}>{patientname}</label>                                                                
//                                                                 </div>
//                                                         }
//                                                     )
//                                                 }
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <script src="../assets/js/jjquery.min.js"></script>
//                     <script src="../assets/bootstrap/js/bbootstrap.min.js"></script>
//                     <script src="../assets/js/bs-init.js"></script>
//                     <script src="../assets/js/theme.js"></script>
//             </div>

//         );
//     }


// }

// export default withRouter(ClinicianDashboard);
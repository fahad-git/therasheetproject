import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';

import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/Admin.css';

import {Modal} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import active_clinician_icon from '../assets/img/active_clinician_icon.png';
import blocked_clinician_icon from '../assets/img/blocked_clinician_icon.png';


import ClinicianInfo from './ClinicianInfo';
import ChangePassword from './ChangePassword';
import ClinicDirectorInfo from './ClinicDirectorInfo';
import AddNewClinician from './AddNewClinician';

import { DIRECTOR_PROFILE_INFO_MODAL_CLOSE, DIRECTOR_PASSWORD_MODAL_CLOSE } from "../constants/modal";


function ClinicDirector (props) {

    var setHeaderComponent = props.setHeaderComponent;
    setHeaderComponent(false);

    // const [setAccountUsername, setAccountType, setAccountProfileUrl] = props.userDetails;
    // setAccountUsername("Mike");
    // setAccountType("Director");
    // setAccountProfileUrl("https://img.freepik.com/free-psd/confident-young-doctor-posing_1459-5943.jpg?size=626&ext=jpg");



    // Accessing data

    let clinician1 = {
        "clinicname":"clinician1",
        "username":"User1",
        "status":"Active",
        };

    let clinician2 = {
        "clinicname":"clinician2",
        "username":"User2",
        "status":"Active",
        };

    let clinician3 = {
            "clinicname":"clinician3",
            "username":"User3",
            "status":"Blocked",
            };

    let clinician4 = {
            "clinicname":"clinician4",
            "username":"User4",
            "status":"Active",
            };


    let clinician5 = {
            "clinicname":"clinician5",
            "username":"User5",
            "status":"Active",
            };

    let clinician6 = {
            "clinicname":"clinician6",
            "username":"User6",
            "status":"Blocked",
            };

    let clinician7 = {
            "clinicname":"clinician7",
            "username":"User7",
            "status":"Active",
            };


    const active_clinic = [clinician1, clinician2, clinician4, clinician5, clinician7]; 
    const blocked_clinic = [clinician3, clinician6]; 
    const elems = [clinician1,  clinician2, clinician3, clinician4, clinician5, clinician6, clinician7];
        

    const modalHeaderColor = "rgba(4, 13, 43, 0.8)";

    const history = useHistory(); 
    const dispatch = useDispatch();  

    var [directorName, setDirectorName] = useState('John');
    var [userName, setUserName] = useState('johntherasheet');
    var [profileURL, setProfileURL] = useState('');
    var [clinicianInformation, setClinicianInformation] = useState(elems);
    var [params, setParams] = useState([]);
    var [background_color, setBackground_color] = useState("rgba(4, 13, 43, 0.8)");
    var [isClinicianInfoOpen, clinicianInfoToggle] = useState(false);
    // var [isAccountInfoOpen, accountInfoToggle] = useState(false);
    // var [isPasswordChange, passwordChangeToggle] = useState(false);
    var [isAddNewClinicianOpen, addNewClinicianToggle] = useState(false);

    const {isDirectorAccountInfoOpen} = useSelector((state) => state.modalReducer);
    const {isDirectorPasswordChange} = useSelector((state) => state.modalReducer);

    const accountInfoToggle = () => {
        dispatch({
            type: DIRECTOR_PROFILE_INFO_MODAL_CLOSE,
            isDirectorAccountInfoOpen: false
        });
    }

    const passwordChangeToggle = () => {
        dispatch({
            type: DIRECTOR_PASSWORD_MODAL_CLOSE,
            isDirectorPasswordChange: false
        });
    }

    const addClinicHandler = () =>{
        // alert("New Clinic Will be Added")
        setParams([userName]);
        // passwordChangeToggle(true);
        // accountInfoToggle(true);
        addNewClinicianToggle(true);
    }
    

    const clinicSelectHandler = (event) =>{
        let value = event.target.value;
        
        switch(value){
            case "Blocked Clinics":
                setClinicianInformation(blocked_clinic);
            break;

            case "Active Clinics":
                setClinicianInformation(active_clinic)
            break;
            default:
                setClinicianInformation(elems);
            break;
        }
    }

    const clinicInfoHandler = (username, clinicname) =>{
        setParams([username, clinicname])
        clinicianInfoToggle(true);
    }



    return <div className="admin">
                    
            {/* ***************************************** Modals ****************************** */}
                {/* Modal 1 this modal is for Clinician Info*/}
                <Modal show={isClinicianInfoOpen}
                    onHide = {()=> clinicianInfoToggle(false)}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <h2 className="text-center" style={{color:modalHeaderColor}}><strong>Clinician Information</strong></h2>
                    </Modal.Header>
                    <Modal.Body>
                        {<ClinicianInfo params={params}/>}
                    </Modal.Body>
                </Modal>

                {/* Modal 2 this modal is for Clinic Director Info*/}
                <Modal show={isDirectorAccountInfoOpen}
                    onHide = {accountInfoToggle}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <h2 className="text-center" style={{color:modalHeaderColor}}><strong>Director Information</strong></h2>
                    </Modal.Header>
                    <Modal.Body>
                        {<ClinicDirectorInfo params={params}/>}
                    </Modal.Body>
                </Modal>

                {/* Modal 3 this modal is for Director Password Change*/}
                <Modal show={isDirectorPasswordChange}
                    onHide = {passwordChangeToggle}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <h3 className="text-center" style={{color:background_color}}><strong>Director Password Change</strong></h3>
                    </Modal.Header>
                    <Modal.Body>
                        {<ChangePassword params={params}/>}
                    </Modal.Body>
                </Modal>

                {/* Modal 4 this modal is for Add New Clinician*/}
                <Modal show={isAddNewClinicianOpen}
                    onHide = {()=> addNewClinicianToggle(false)}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <h3 className="text-center" style={{color:background_color}}><strong>Add New Clinician</strong></h3>
                    </Modal.Header>
                    <Modal.Body>
                        {<AddNewClinician />}
                    </Modal.Body>
                </Modal>

            <div className="container">
                <div className="row" >
                    <div className="col-12 offset-0" >
                        {/* this is add new patient button  */}
                        <button className="btn btn-primary text-left float-right" style={{backgroundColor:background_color}} onClick={addClinicHandler} >Add New Clinician</button>
                    </div>
                </div>

                <div className="row top-buffer">        
                    <div className="col-12 col-md-9 col-lg-9 col-xl-10  offset-xl-2  offset-lg-3 offset-md-3 offset-0 card">
                        <div className="card-body float-left">
                            <div className="row justify-content-left">
                                {/* this is dropdown menu for patients */}
                                <div className="dropdown">
                                    <select className="btn btn-primary dropdown-toggle" type="button" onChange={clinicSelectHandler} style={{backgroundColor:background_color, maxWidth: "200px", width:"200px", maxHeight: "70px", height:"40px", border:"0px", outline:"none", fontSize:"16px"}}>
                                        <option className="dropoptions"  defaultValue>All Clinics</option>
                                        <option className="dropoptions" value="Active Clinics">Active Clinics</option>
                                        <option className="dropoptions" value="Blocked Clinics">Blocked Clinics</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row justify-content-center align-items-center top-buffer">
                                <div className="col-12">
                                    {clinicianInformation.map( ({clinicname, username, status}, index)=>{
                                    return (
                                            <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2 offset-0" style={{float:"left", marginTop:"20px"}} onClick={() => clinicInfoHandler(username, clinicname)}>
                                                <div className="card tile" >
                                                    <img alt="Not found" className="clinicicon" src={(status === "Active") ? active_clinician_icon : blocked_clinician_icon} />
                                                </div>                                                                  
                                                <label className="card align-text-center" style={{textAlign:"center"}}>{clinicname}</label>                                               
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

export default ClinicDirector;





// // import ClinicianInfo from './clinicianInfo';
// // import AddClinicianInfo from './addClinicianInfo';
// // import ClinicDirectorInfo from './clinicDirectorInfo';

// import {withRouter} from 'react-router-dom';

// class ClinicDirector extends React.Component{


//     constructor(props){
//         super(props)

//     // Accessing data

//     const img_url = "https://www.pinclipart.com/picdir/big/133-1332476_crowd-of-users-transparent-user-icon-png-clipart.png";

//     let Clinician1 = {
//         "clinicianname":"Clinician1",
//         "username":"User1",
//         "status":"Active",
//         "display":"block",
//         "profile":img_url
//         };

//     let Clinician2 = {
//         "clinicianname":"Clinician2",
//         "username":"User2",
//         "status":"Active",
//         "display":"block",
//         "profile":img_url
//         };

//     let Clinician3 = {
//         "clinicianname":"Clinician3",
//         "username":"User3",
//         "status":"Blocked",
//         "dis":"block",
//         "profile":img_url
//         };

//     let Clinician4 = {
//         "clinicianname":"Clinician4",
//         "username":"User4",
//         "status":"Active",
//         "dis":"block",
//         "profile":img_url
//         };


//     let Clinician5 = {
//         "clinicianname":"Clinician5",
//         "username":"User5",
//         "status":"Active",
//         "dis":"block",
//         "profile":img_url
//         };

//     let Clinician6 = {
//         "clinicianname":"Clinician6",
//         "username":"User6",
//         "status":"Blocked",
//         "dis":"block",
//         "profile":img_url
//         };

//     let Clinician7 = {
//         "clinicianname":"Clinician7",
//         "username":"User7",
//         "status":"Active",
//         "dis":"block",
//         "profile":img_url
//         };


//     // this data will be provided by API
//     const elems = [Clinician1, Clinician2, Clinician3, Clinician4, Clinician5, Clinician6, Clinician7];



//     this.state = {
//             clinicalDirector:"Clinical Director",
//             directorName:"Clinical Director Name",
//             username:"Director1",
//             clinicianInformation:elems,
//             profileUrl:"https://img.freepik.com/free-photo/portrait-smiling-handsome-male-doctor-man_171337-5055.jpg?size=626&ext=jpg",
//             params : [],
//             accountInfoPopup:false,
//             changepasswordpopup:false,
//             addnewpatientpopup:false,
//             popup:false
//         };
//     }


//     settinghandler= () =>{
//         let settings = document.getElementById('settings');

//         if(settings.value === 'AccountInfo'){
//             this.setState({"accountInfoPopup":true, "params":[this.state.username]});
//         }
//         else if (settings.value === 'Logout')
//             // alert("Going to "+settings.value);
//             this.props.history.goBack();
//         else if (settings.value === 'ChangePassword'){
//             this.setState({"changepasswordpopup":true, "params":[this.state.username]});
//         }

//         settings.selectedIndex = 0;
//     }

//     addClinicianHandler = () =>{
//         this.setState({"addnewpatientpopup":true});
//     }


//     clinicianSelectHandler = (event) =>{
//         let value = event.target.value;
//         let all_clinicians = this.state.clinicianInformation;

//         switch(value){
        
//             case "Blocked Clinicians":
//                 for(let i in all_clinicians)
//                     if(all_clinicians[i]["status"] === "Active")
//                         all_clinicians[i]["dis"] = "none";
//                     else
//                         all_clinicians[i]["dis"] = "block";
//             break;

//             case "Active Clinicians":
//                 for(let i in all_clinicians)
//                     if(all_clinicians[i]["status"] === "Active")
//                         all_clinicians[i]["dis"] = "block";
//                     else
//                         all_clinicians[i]["dis"] = "none";
//             break;
//             default:
//                 for(let i in all_clinicians)
//                     all_clinicians[i]["dis"] = "block";
//             break;
//         }

//         this.setState({"clinicianInformation":all_clinicians});
//     }

//     clinicianInfoHandler = (clinicianname, username, index) =>{
//         this.setState({"popup":true, params:[username, index, clinicianname]});
//     }




//     render (){
//         return (
//             <div>
//                 {/* Modal 1 this modal is for Clinician Info */}

//             {/*  onHide = {()=> {this.setState({"popup":false}); window.location.reload(false); } */}

//                 <Modal  show={this.state.popup}
//                         onHide = {()=> {this.setState({"popup":false}); window.location.reload(false); }}
//                         size="md"
//                         aria-labelledby="contained-modal-title-vcenter"
//                         centered
//                 >
//                 <Modal.Header closeButton>
//                     <h2 className="text-center" style={{color:"#5376f4"}}><strong>Clinician Information</strong></h2>
//                 </Modal.Header>
//                     <Modal.Body>
//                         {/* {<ClinicianInfo params={this.state.params}/>} */}
//                     </Modal.Body>
//                     {/* <Modal.Footer>
//                         <button className="btn btn-primary text-center" onClick={()=> this.setState({"popup":false})} style={{maxWidth: "200px", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:"#5376f4"}}>Close</button>
//                     </Modal.Footer> */}
//                 </Modal>

//                     {/* Modal 2 this modal is for Clinic Director Info*/}
//                 <Modal show={this.state.accountInfoPopup}
//                        onHide = {()=>{ this.setState({"accountInfoPopup":false}); window.location.reload(false);
//                     }}
//                 size="md"
//                 aria-labelledby="contained-modal-title-vcenter"
//                 centered
//                 >
//                     <Modal.Header closeButton>
//                         <h3 className="text-center" style={{color:"#5376f4"}}><strong>Clinic Director Information</strong></h3>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {/* {<ClinicDirectorInfo params={this.state.params}/>} */}
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

//                 {/* Modal 4 this modal is for adding new clinician*/}
//                 <Modal 
//                 show={this.state.addnewpatientpopup}
//                 onHide = {()=>{ this.setState({"addnewpatientpopup":false}); window.location.reload(false);}}
//                 size="md"
//                 aria-labelledby="contained-modal-title-vcenter"
//                 centered
//                 >
//                     <Modal.Header closeButton>
//                         <h3 className="text-center" style={{color:"#5376f4"}}><strong>Add New Clinician</strong></h3>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {/* {<AddClinicianInfo />} */}
//                     </Modal.Body>
//                     {/* <Modal.Footer>
//                         <button className="btn btn-primary text-center" onClick={()=> this.setState({"popup":false})} style={{maxWidth: "200px", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:"#5376f4"}}>Close</button>
//                     </Modal.Footer> */}
//                 </Modal>  

//                 <nav className="navbar navbar-dark navbar-expand-lg fixed-top bg-white portfolio-navbar gradient" style={{backgroundColor:"#5376f4"}}>
//                         <div className="container" >
//                             <a className="navbar-brand logo" href={"#"} style={{marginRight: "10px"}}>{this.state.clinicalDirector}</a>
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
//                                         <img src={this.state.profileUrl} className="rounded-circle img-fluid border d-lg-flex justify-content-lg-center align-items-lg-center" data-bs-hover-animate="pulse" style={{ marginTop: "80px", width: "150px", height: "150px"}} />
//                                         <label className="text-center text-white d-lg-flex  justify-content-center justify-content-lg-center" style={{marginTop: "20px", padding:"10px", fontSize:"20px", fontWeight:"bold", backgroundColor:"#5376f4", maxWidth: "300px", width:"200px", maxHeight: "70px", height:"50px"}}>{this.state.directorName}</label>
//                                     </center>
//                                 </div>
//                                 <div className="col-sm-4 col-md-8 col-lg-8 col-xl-8 offset-0" style={{marginLeft:"60px", marginTop:"20px", padding: "0px", maxWidth: "1500px", width: "1300px"}}>
//                                     {/* this is add new patient button */}
//                                     <button className="btn btn-primary text-left float-right" onClick={this.addClinicianHandler} style={{maxWidth: "200px", maxHeight: "50px", backgroundColor:"#5376f4"}}>Add New Clinician</button>
                                    
//                                     <div className="card" style={{marginTop: "50px", height: "600px"}}>
//                                         <div className="card-body float-left">
//                                             {/* this is dropdown menu for patients */}
//                                             <div className="dropdown" style={{textAlign:"left", marginTop:"10px", marginLeft:"20px", marginBottom:"80px"}}>
//                                                 <select className="btn btn-primary dropdown-toggle" type="button" onChange={this.clinicianSelectHandler} style={{backgroundColor:"#5376f4", maxWidth: "200px", width:"200px", maxHeight: "70px", height:"40px", border:"0px", outline:"none",  fontSize:"16px"}}>
//                                                     <option style={{backgroundColor:"white", color:"black"}} defaultValue>All Clinicians</option>
//                                                     <option value="Active Clinicians" style={{backgroundColor:"white", color:"black"}}>Active Clinicians</option>
//                                                     <option value="Blocked Clinicians" style={{backgroundColor:"white", color:"black"}}>Blocked Clinicians</option>
//                                                 </select>
//                                             </div>

//                                             <div>
//                                                 {this.state.clinicianInformation.map( ({clinicianname, username, status, dis, profile}, index)=>{
//                                                         if(status === "Active")
                                                 
//                                                             return (
//                                                                     <div key={index} style={{float:"left", marginBottom:"20px", display:dis}} onClick={() => this.clinicianInfoHandler(clinicianname, username, index)}>
//                                                                         <div className="card" style={{backgroundColor: "#5376f4", marginLeft:"30px", width: "100px", height: "100px", marginTop: "10px"}}>
//                                                                             <div className="card-body" style={{backgroundColor: "rgba(83,118,244,0)"}}>
//                                                                                 <h4 className="card-title"><img style={{width:"100%", height:"100%"}} src={profile} /></h4>
//                                                                             </div>
//                                                                         </div>                                                                  
//                                                                         <label className="card" style={{marginLeft:"30px"}}>{clinicianname}</label>                                                                
//                                                                     </div>
//                                                                     )
//                                                          else
//                                                              return (
//                                                                  <div key={index} style={{float:"left", marginBottom:"20px", display:dis}} onClick={() => this.clinicianInfoHandler(username, index)}>
//                                                                      <div className="card" style={{backgroundColor: "#505e6c", marginLeft:"30px", width: "100px", height: "100px", marginTop: "10px"}}>
//                                                                          <div className="card-body" style={{backgroundColor: "rgba(83,118,244,0)"}}>
//                                                                              <h4 className="card-title"><img style={{width: "100%", height:"100%"}} src={profile} /></h4>
//                                                                          </div>
//                                                                      </div>                                                                  
//                                                                      <label className="card" style={{marginLeft:"30px"}}>{clinicianname}</label>                                                                
//                                                                  </div>
//                                                                  )
//                                                          })  

//                                                         }
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

// export default withRouter(ClinicDirector);
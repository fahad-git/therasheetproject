import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';

import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/Admin.css';

import {Modal} from 'react-bootstrap';

import active_clinic_icon from '../assets/img/active_clinic_icon.png';
import blocked_clinic_icon from '../assets/img/blocked_clinic_icon.png';


import ClinicInfo from './ClinicInfo';
import AdminInfo from './AdminInfo';
import ChangePassword from './ChangePassword';
import {ADMIN_PASSWORD_MODAL_CLOSE, ADMIN_PROFILE_INFO_MODAL_CLOSE } from '../constants/modal';
import { useSelector, useDispatch } from 'react-redux';

import getAdminBoard from '../services/user.service';
import getAdminInfo from '../services/admin.service';
import tmpGetFile from '../services/admin.service';


function Admin (props) {


    var setHeaderComponent = props.setHeaderComponent;
    setHeaderComponent(false);

    // const [setAccountUsername, setAccountType, setAccountProfileUrl] = props.userDetails;
    // setAccountUsername("John");
    // setAccountType("Admin");
    // setAccountProfileUrl("https://thumbs.dreamstime.com/b/asian-male-doctor-man-indian-wearing-white-coat-shirt-tie-stethoscope-pictured-hospital-30888074.jpg");

    // Accessing data
/*
    let clinic1 = {
        "clinicname":"Clinic1",
        "username":"User1",
        "status":"Active",
        };

    let clinic2 = {
        "clinicname":"Clinic2",
        "username":"User2",
        "status":"Active",
        };

    let clinic3 = {
            "clinicname":"Clinic3",
            "username":"User3",
            "status":"Blocked",
            };

    let clinic4 = {
            "clinicname":"Clinic4",
            "username":"User4",
            "status":"Active",
            };


    let clinic5 = {
            "clinicname":"Clinic5",
            "username":"User5",
            "status":"Active",
            };

    let clinic6 = {
            "clinicname":"Clinic6",
            "username":"User6",
            "status":"Blocked",
            };

    let clinic7 = {
            "clinicname":"Clinic7",
            "username":"User7",
            "status":"Active",
            };


    // const active_clinic = [clinic1, clinic2, clinic4, clinic5, clinic7]; 
    // const blocked_clinic = [clinic3, clinic6]; 
    const elems = [clinic1,  clinic2, clinic3, clinic4, clinic5, clinic6, clinic7];
*/

    const modalHeaderColor = "rgba(4, 13, 43, 0.8)";

    const history = useHistory(); 
    
    const user = JSON.parse(localStorage.getItem("user"));

    const dispatch = useDispatch();

    var [adminName, setAdminName] = useState('');
    var [userName, setUserName] = useState('');
    var [profileURL, setProfileURL] = useState('');
    var [clinicsInformation, setClinicsInformation] = useState([]);
    var [params, setParams] = useState([]);
    var [background_color, setBackground_color] = useState("rgba(4, 13, 43, 0.8)");
    var [isClinicInfoOpen, clinicInfoToggle] = useState(false);
    // var [isAccountInfoOpen, accountInfoToggle] = useState(false);
    // var [isPasswordChange, passwordChangeToggle] = useState(false);


    // const {isClinicInfoOpen} = useSelector((state) => state.modalReducer);
    const {isAccountInfoOpen} = useSelector((state) => state.modalReducer);
    const {isPasswordChange} = useSelector((state) => state.modalReducer);

    const passwordChangeToggle = () => {
        dispatch({
            type: ADMIN_PASSWORD_MODAL_CLOSE,
            isPasswordChange: false
        });
    }

    const accountInfoToggle = () => {
        dispatch({
            type: ADMIN_PROFILE_INFO_MODAL_CLOSE,
            isAccountInfoOpen: false
        });
    }

    const addClinicHandler = () =>{
        tmpGetFile.tmpGetFile()
        .then((response) => {
                    // API
                    // document.querySelector("#img").src = "data:" + response.data["type"] + ";base64," + response.data["data"];

                    // var user = JSON.parse(localStorage.getItem("user"));
                    // user["accountProfileUrl"] = "https://kinsta.com/wp-content/uploads/2015/11/low-compression-high-quality-jpg.jpg";
                    // localStorage.setItem("user", JSON.stringify(user));

                    // var imageUrl = URL.createObjectURL(response.data);
                    // console.log(imageUrl);
                    // Buffer.from(response.data, 'binary').toString('base64');

                    // var reader = new FileReader();
                    // var mBlob = new Blob([response.data], {type: 'image/jpeg'});
                    // console.log("Blob");    
                    // console.log(mBlob);

                    // var buffer = new Buffer.from( response.data, 'binary' );
                    // console.log(buffer);
                    // var bufferBase64 = buffer.toString('base64');
                    // console.log(bufferBase64);
                    // document.querySelector("#img").src = "data:image/jpeg;base64," + bufferBase64;

                    // reader.readAsDataURL(mBlob); 
                    // reader.onloadend = function() {
                    //     var base64data = reader.result;                
                    //     console.log(base64data);
                    //     document.querySelector("#img").src = base64data;
                    // }

            }).catch((err)=>{

                console.log('');
            // console.log(err)
            });
    }
    

    const clinicSelectHandler = (event) =>{
        let value = event.target.value;

        getAdminBoard.getAdminBoard()
            .then((response) => {
                // API
                // console.log(response.data);

            switch(value){
                case "Blocked Clinics":
                    let blocked_clinic = []
                    for(let obj of response.data){
                        if(obj["status"] == "Blocked")
                            blocked_clinic.push(obj);
                    }
                    setClinicsInformation(blocked_clinic);
                break;

                case "Active Clinics":
                    let active_clinic = []
                    for(let obj of response.data){
                        if(obj["status"] == "Active")
                            active_clinic.push(obj);
                    }
                    setClinicsInformation(active_clinic)
                break;
                default:
                    // console.log("Default");
                    setClinicsInformation(response.data)
                    // setClinicsInformation(elems);
                break;
            }

        }).catch((err)=>{
        // console.log("Can not find clinics!")
        setClinicsInformation([])
    });

    }

    const clinicInfoHandler = (id) =>{
        setParams([id])
        clinicInfoToggle(true);
    }


    // this is Hook which replaces 3 life cycle methods
    // componentDidMount
    // componentDidUpdate
    // componentWillUnmount 
    useEffect(()=>{

        if(!user){
            history.push("/home");
            return;
        }
        else if(user.accountType !== "admin"){
            history.push("/" + user.accountType);
            return;
        }

        getAdminBoard.getAdminBoard()
        .then((response) => {
            // API
            // console.log(response.data);
            setClinicsInformation(response.data)
          }).catch((err)=>{
            // console.log("Can not find user!")
            setClinicsInformation([])
          });
    }, [])

    
    useEffect(()=>{
        if(!user){
            history.push("/home");
            return;
        }
        else if(user.accountType !== "admin"){
            history.push("/" + user.accountType);
            return;
        }

        getAdminInfo.getAdminInfo()
        .then((response) => {
            // API
            // console.log(response.data);
            setAdminName(response.data["name"])
            setUserName(response.data["username"])
          }).catch((err)=>{
              console.log('');
            // console.log("Can not find user!")
          });
    }, [])

{/* <img id = "img" style={{width:"100px", height:"100px"}} src = "https://upload.wikimedia.org/wikipedia/en/e/e1/Thomas_D._Baird_%28low-resolution%29.jpg"/> */}

    return <div className="admin">                    
            {/* ***************************************** Modals ****************************** */}
                {/* Modal 1 this modal is for Clinic Info*/}
                <Modal show={isClinicInfoOpen}
                    onHide = { () => clinicInfoToggle(false)}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <h2 className="text-center" style={{color:modalHeaderColor}}><strong>Clinic Information</strong></h2>
                    </Modal.Header>
                    <Modal.Body>
                        {<ClinicInfo params={params}/>}
                    </Modal.Body>
                </Modal>

                {/* Modal 2 this modal is for Admin Info*/}
                <Modal show={isAccountInfoOpen}
                    onHide = {accountInfoToggle}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <h2 className="text-center" style={{color:modalHeaderColor}}><strong>Admin Information</strong></h2>
                    </Modal.Header>
                    <Modal.Body>
                        {<AdminInfo params={params}/>}
                    </Modal.Body>
                </Modal>

                {/* Modal 3 this modal is for Admin Password Change*/}
                <Modal show={isPasswordChange}
                    onHide = {passwordChangeToggle}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <h3 className="text-center" style={{color:background_color}}><strong>Admin Password Change</strong></h3>
                    </Modal.Header>
                    <Modal.Body>
                        {<ChangePassword params={userName}/>}
                    </Modal.Body>
                </Modal>


            <div className="container">
                <div className="row" >
                    <div className="col-12 offset-0" >
                        {/* this is add new patient button  */}
                        <button className="btn btn-primary text-left float-right" style={{backgroundColor:background_color, display:"none"}} onClick={addClinicHandler} >Add New Clinic</button>
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
                                    {clinicsInformation.map( ({clinicname, id, status}, index)=>{
                                    return (
                                            <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2 offset-0" style={{float:"left", marginTop:"20px"}} onClick={() => clinicInfoHandler(id)}>
                                                <div className="card tile" >
                                                    <img alt="Not found" className="clinicicon" src={(status === "Active") ? active_clinic_icon : blocked_clinic_icon} />
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

export default Admin;


















// class Admin extends React.Component{

//     constructor(props){
//         super(props);


        
//         this.state = {
//             websiteAdmin:"Website Admin",
//             adminName: "Admin Name",
//             username:"admin",
//             profileUrl:"https://c8.alamy.com/comp/EXNE60/professional-male-nurse-writing-medical-reports-EXNE60.jpg",
//             clinicsInformation:elems,
//             params:[],
//             popup:false,
//             accountInfoPopup: false,
//             changepasswordpopup: false,
//             currentSelectedIndex:0,
//             // "#7aadd6"
//             colorbg:"rgba(4, 13, 43, 0.8)",
//         }




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

//     addClinicHandler = () =>{
//         alert("New Clinic Will be Added")
//     }
    

//     clinicSelectHandler = (event) =>{
//         let value = event.target.value;
//         let all_clinics = this.state.clinicsInformation;

//         switch(value){
        
//             case "Blocked Clinics":
//                 for(let i in all_clinics)
//                     if(all_clinics[i]["status"] === "Active")
//                         all_clinics[i]["dis"] = "none";
//                     else
//                         all_clinics[i]["dis"] = "block";
//             break;

//             case "Active Clinics":
//                 for(let i in all_clinics)
//                     if(all_clinics[i]["status"] === "Active")
//                         all_clinics[i]["dis"] = "block";
//                     else
//                         all_clinics[i]["dis"] = "none";
//             break;
//             default:
//                 for(let i in all_clinics)
//                     all_clinics[i]["dis"] = "block";
//             break;
//         }

//         this.setState({"clinicsInformation":all_clinics});
    
//     }

//     clinicInfoHandler = (username, index, clinicname) =>{
//         this.setState({"popup":true, params:[username, index, clinicname]})
//         // alert(index+" Clinic name is "+value);
//     }

//     render (){
//         // this data will be provided by API
//         return (
//             <div>
                
//                 {/* Modals */}
//                     {/* Modal 1 this modal is for Clinic Info*/}
//                 <Modal show={this.state.popup}
//                        onHide = {()=> { this.setState({"popup":false}); window.location.reload(false);}}
//                 size="md"
//                 aria-labelledby="contained-modal-title-vcenter"
//                 centered
//                 >
//                     <Modal.Header closeButton>
//                         <h2 className="text-center" style={{color:"#7aadd6"}}><strong>Clinic Information</strong></h2>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {/* {<ClinicInfo params={this.state.params}/>} */}
//                     </Modal.Body>
//                 </Modal>

//                     {/* Modal 2 this modal is for Admin Info*/}
//                 <Modal show={this.state.accountInfoPopup}
//                        onHide = {()=> { this.setState({"accountInfoPopup":false}); window.location.reload(false);}}
//                 size="md"
//                 aria-labelledby="contained-modal-title-vcenter"
//                 centered
//                 >
//                     <Modal.Header closeButton>
//                         <h2 className="text-center" style={{color:this.state.colorbg}}><strong>Admin Information</strong></h2>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {/* {<AdminInfo params={this.state.params}/>} */}
//                     </Modal.Body>
//                 </Modal>

//                 {/* Modal 3 this modal is for Admin Password Change*/}
//                 <Modal show={this.state.changepasswordpopup}
//                 onHide = {()=> {this.setState({"changepasswordpopup":false}); window.location.reload(false);}}
//                 size="md"
//                 aria-labelledby="contained-modal-title-vcenter"
//                 centered
//                 >
//                     <Modal.Header closeButton>
//                         <h3 className="text-center" style={{color:this.state.colorbg}}><strong>Admin Password Change</strong></h3>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {/* {<ChangePassword username={this.state.username}/>} */}
//                     </Modal.Body>
//                     {/* <Modal.Footer>
//                         <button className="btn btn-primary text-center" onClick={()=> this.setState({"popup":false})} style={{maxWidth: "200px", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:this.state.colorbg}}>Close</button>
//                     </Modal.Footer> */}
//                 </Modal>
// <div className="container">
//     <div className="row" >
//         <div className="col-12 offset-0" >
//             {/* this is add new patient button  */}
//             <button className="btn btn-primary text-left float-right" style={{backgroundColor:this.state.colorbg}} onClick={this.addClinicHandler} >Add New Clinic</button>
//         </div>
//     </div>

//     <div className="row top-buffer">        
//         <div className="col-12 col-md-9 col-lg-9 col-xl-10  offset-xl-2  offset-lg-3 offset-md-3 offset-0 card">
//             <div className="card-body float-left">
                
//                 <div className="row justify-content-left">
//                     {/* this is dropdown menu for patients */}
//                     <div className="dropdown">
                        
//                         <select className="btn btn-primary dropdown-toggle" type="button" onChange={this.clinicSelectHandler} style={{backgroundColor:this.state.colorbg, maxWidth: "200px", width:"200px", maxHeight: "70px", height:"40px", border:"0px", outline:"none", fontSize:"16px"}}>
//                             <option className="dropoptions"  defaultValue>All Clinics</option>
//                             <option className="dropoptions" value="Active Clinics">Active Clinics</option>
//                             <option className="dropoptions" value="Blocked Clinics">Blocked Clinics</option>
//                         </select>

//                     </div>
//                 </div>

//                 <div className="row justify-content-center align-items-center top-buffer">
//                     <div className="col-12">
//                         {this.state.clinicsInformation.map( ({clinicname, username, status, dis, profile}, index)=>{
//                             // if(status === "Active")
                            
//                             return (
//                                     <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2 offset-0" style={{float:"left", marginTop:"20px", display:dis}} onClick={() => this.clinicInfoHandler(username, index, clinicname)}>
//                                         <div className="card tile" >
//                                             <img className="clinicicon" src={(status === "Active") ? profile : profile} />
//                                         </div>                                                                  
//                                         <label className="card align-text-center" style={{textAlign:"center"}}>{clinicname}</label>                                               
//                                     </div>
//                                     )
//                             // else
//                             //     return (
//                             //         <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-3" style={{float:"left", marginTop:"20px", display:dis}} onClick={() => this.clinicInfoHandler(username, index)}>
//                             //             <div className="card" style={{backgroundColor: "#505e6c",}}>
//                             //                 <div className="card-body" style={{backgroundColor: "rgba(83,118,244,0)"}}>
//                             //                     <h4 className="card-title"><img className="clinicicon" src={profile} /></h4>
//                             //                 </div>
//                             //             </div>                                                                  
//                             //             <label className="card" style={{marginLeft:"30px"}}>{clinicname}</label>                                                                
//                             //         </div>
//                             //         )
//                             })
//                         }
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>




                    
//                     {/* <main className="page contact-page"></main>
//                     <div className="border-dark">
//                         <div className="container" style={{padding: "0px", margin: "0px", width: "1191px", maxwidth: "1191px"}}>
//                             <div className="row justify-content-start" style={{margin: "0px", maxwidth: "1191px", width: "1191px"}}>
//                                 <div className="d-none d-md-block col-sm-1 col-md-2 col-lg-2 col-xl-3 offset-0" style={{minHeight: "650px", padding: "0px", backgroundColor: this.state.colorbg, maxWidth: "30%", background:"radial-gradient(at center center, #2d7e9270 0%, #1c40617c 0%), url("+bgimg+")"}}>
//                                     {/* this is Admin Info sections 
//                                     <center>
//                                         <img src={this.state.profileUrl} className="rounded-circle img-fluid border d-lg-flex justify-content-lg-center align-items-lg-center" data-bs-hover-animate="pulse" style={{ marginTop: "80px", width: "150px", height: "150px"}} />
                                    
//                                         <label className="text-center text-white d-lg-flex  justify-content-center justify-content-lg-center" style={{marginTop: "20px", textDecoration:"none", outline:"0", padding:"10px", fontSize:"20px", fontWeight:"bold",  maxWidth: "250px", width:"180px", maxHeight: "70px", height:"50px", border:"0px"}}>{this.state.adminName}</label>
//                                     </center>
//                                 </div>
//                                 <div className="col-sm-4 col-md-8 col-lg-8 col-xl-8 offset-0" style={{marginLeft:"60px", marginTop:"20px", padding: "0px", maxWidth: "800px", minWidth: "800px"}}>
//                                     {/* this is add new patient button 
//                                     <button className="btn btn-primary text-left float-right" onClick={this.addClinicHandler} style={{maxWidth: "200px", maxHeight: "50px", backgroundColor:this.state.colorbg}}>Add New Clinic</button>
                                    
//                                     <div className="card" style={{marginTop: "50px", height: "600px"}}>
//                                         <div className="card-body float-left">
//                                             {/* this is dropdown menu for patients 
//                                             <div className="dropdown" style={{textAlign:"left", marginTop:"10px", marginLeft:"20px", marginBottom:"80px"}}>
                                                
//                                                 <select className="btn btn-primary dropdown-toggle" type="button" onChange={this.clinicSelectHandler} style={{backgroundColor:this.state.colorbg, maxWidth: "200px", width:"200px", maxHeight: "70px", height:"40px", border:"0px", outline:"none", fontSize:"16px"}}>
//                                                     <option style={{backgroundColor:"white", color:"black"}} defaultValue>All Clinics</option>
//                                                     <option value="Active Clinics" style={{backgroundColor:"white", color:"black"}}>Active Clinics</option>
//                                                     <option value="Blocked Clinics" style={{backgroundColor:"white", color:"black"}}>Blocked Clinics</option>
//                                                 </select>

//                                             </div>


//                                             <div>
//                                                 {this.state.clinicsInformation.map( ({clinicname, username, status, dis, profile}, index)=>{
//                                                     if(status === "Active")
                                                 
//                                                    return (
//                                                             <div key={index} style={{float:"left", marginBottom:"20px", display:dis}} onClick={() => this.clinicInfoHandler(username, index, clinicname)}>
//                                                                 <div className="card" style={{backgroundColor: this.state.colorbg, marginLeft:"30px", width: "100px", height: "100px", marginTop: "10px"}}>
//                                                                     <div className="card-body" style={{backgroundColor: "rgba(83,118,244,0)"}}>
//                                                                         <h4 className="card-title"><img style={{width:"100%", height:"100%"}} src={profile} /></h4>
//                                                                     </div>
//                                                                 </div>                                                                  
//                                                                 <label className="card" style={{marginLeft:"30px"}}>{clinicname}</label>                                                                
//                                                             </div>
//                                                             )
//                                                     else
//                                                         return (
//                                                             <div key={index} style={{float:"left", marginBottom:"20px", display:dis}} onClick={() => this.clinicInfoHandler(username, index)}>
//                                                                 <div className="card" style={{backgroundColor: "#505e6c", marginLeft:"30px", width: "100px", height: "100px", marginTop: "10px"}}>
//                                                                     <div className="card-body" style={{backgroundColor: "rgba(83,118,244,0)"}}>
//                                                                         <h4 className="card-title"><img style={{width: "100%", height:"100%"}} src={profile} /></h4>
//                                                                     </div>
//                                                                 </div>                                                                  
//                                                                 <label className="card" style={{marginLeft:"30px"}}>{clinicname}</label>                                                                
//                                                             </div>
//                                                             )
//                                                     })
//                                                 }
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div> */}
//                     <script src="../assets/js/jjquery.min.js"></script>
//                     <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
//                     <script src="../assets/js/bs-init.js"></script>
//                     <script src="../assets/js/theme.js"></script>
//             </div>

//         );
//     }


// }

// export default withRouter(Admin);
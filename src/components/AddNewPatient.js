import React, { useState } from 'react';

import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/ClinicInfo.css';

function AddNewPatient () {

    var [patientName, setPatientName] = useState("Enter Patient Name");
    var [userName, setUserName] = useState("Enter Username");
    var [diagnosis, setDiagnosis] = useState("Enter Diagnosis");
    var [protocol, setProtocol] = useState(["Protocol",null]);
    var [precaution, setPrecaution] = useState("Type here");
    var [otherPrecaution, setOtherPrecaution] = useState("none");

    var [newPassword, setNewPassword] = useState('Enter Password');
    var [confirmPassword, setConfirmPassword] = useState('Confirm Password');


    var [status, setStatus] = useState('');
    var [accountStatusButton, setAccountStatusButton] = useState('Add');
    var [disableFields, disableFieldsToggle] = useState(false);

    var [userNameErrorMessage, setUserNameErrorMessage] = useState(['none', 'Error', 'red']);
    var [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState(['none','Error']);
    var [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState(['none','Error']);

    var [new_password_eye_icon, set_new_password_eye_icon] = useState("ion-eye");

    const updatePatientName = e => setPatientName(e.target.value);
    const updateUserName = e => setUserName(e.target.value);
    const updateDiagnosis = e => setDiagnosis(e.target.value);
    const updatePrecaution = e => setPrecaution(e.target.value);
    const updateNewPassword = e => setNewPassword(e.target.value);
    const updateConfirmPassword = e => setConfirmPassword(e.target.value);


    const ButtonColor = "rgba(4, 13, 43, 0.8)";

    const changeStatusHandler = (event)=>{
        event.preventDefault();
        // database Update query
        
        let data = {
            "patientName":patientName,
            "userName":userName,
            "diagnosis":diagnosis,
            "protocol":protocol[1],
            "precaution":precaution
        }

        console.log(data);
    }

    const verifyUserName = () =>{
        setUserName(userName.trim());
        // Check Username availability

        if(userName === "fahad" || userName === "Fahad")
            setUserNameErrorMessage(['block',"Username available", "green"])
        else
            setUserNameErrorMessage(['block',"Username not available", "red"])
            
    }

    const verifyNewPassword = () =>{
        setNewPassword(newPassword.trim());
        if(newPassword.length < 8){
            setNewPasswordErrorMessage(['block',"Password length must be greater than 8"])
        }
    }

    const verifyConfirmPassword = () =>{
        setConfirmPassword(confirmPassword.trim());
        if(confirmPassword !== newPassword){
            setConfirmPasswordErrorMessage(['block',"Password Mismatch"])
        }
    }


    const toggleNewPassword = () => {
        if(new_password_eye_icon === "ion-eye")
            set_new_password_eye_icon("ion-eye-disabled");
        else
            set_new_password_eye_icon("ion-eye");
    }

    const protocolHandler = (event) => {
        try {
            
        let file = event.target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            setProtocol([file.name,reader.result]);
            }

        } catch (error) {
            console.log(error);
            return;
        }

    }

    const precautionHandler = (event) => {
        let value = event.target.value;
        if(value === "Others")
            setOtherPrecaution("block");
        else
            setOtherPrecaution("none");
            setPrecaution(value);
        
    }

    return <div>
                 <div className="clinicinfo">
                     <div className="container ">
                         <form onSubmit={changeStatusHandler}>
                            <div className="row no-gutters">
                                 <div className="col-5" ><label className="form-control" >Patient Name</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}}><textarea disabled={disableFields} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={patientName} onChange={updatePatientName}/></div>
                             </div>

                              <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Username</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={disableFields}  className="form-control"  type="text" placeholder={userName} onBlur={verifyUserName} onFocus={()=> setUserNameErrorMessage(["none","","green"])} onChange={updateUserName}/></div>
                             </div>

                            <div className="row no-gutters">
                                <div className="col-6 offset-6" ><label style={{color:userNameErrorMessage[2],fontSize:"calc(1px + 2vmin)", display:userNameErrorMessage[0]}} >{userNameErrorMessage[1]}</label></div>
                            </div>

                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Diagnosis</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={disableFields}  className="form-control"  type="text" placeholder={diagnosis} onChange={updateDiagnosis}/></div>
                             </div>



                            <div className="row no-gutters" style={{marginBottom:"20px"}}>
                                 <div className="col-12"  >
                                    <select className="form-control" onChange={precautionHandler} style={{width:"97%"}}>
                                        <option value="" defaultValue>Precaution</option>
                                        <option value="Fall Risk" style={{backgroundColor:"white", color:"black", fontSize:"14px"}} >Fall Risk</option>
                                        <option value="NO E-STIM" style={{backgroundColor:"white", color:"black", fontSize:"14px"}} >NO E-STIM</option>
                                        <option value="Latex Allergy" style={{backgroundColor:"white", color:"black" , fontSize:"14px"}}>Latex Allergy</option>
                                        <option value="Post-op restrictions" style={{backgroundColor:"white", color:"black" , fontSize:"14px"}}>Post-op restrictions</option>
                                        <option value="Others" style={{backgroundColor:"white", color:"black" , fontSize:"14px"}}>Others</option>
                                    </select>
                                 </div>
                                 <div className="col-7 offset-5" style={{padding: "0px 10px",marginTop:"20px", display:otherPrecaution}} ><input disabled={disableFields}  className="form-control"  type="text" placeholder="Type here" onChange={updatePrecaution}/></div>                                 
                             </div>


                             <div className="custom-file mb-md-3" >
                                <input type="file"  className="custom-file-input" id="customFile" disabled={disableFields} onChange={protocolHandler} />
                                <label className="custom-file-label form-control" style={{width:"97%"}} htmlFor="customFile" >{protocol[0]}</label>
                            </div>

                             <div className="row no-gutters">
                                <div className="col-5"><label className="form-control">Set Password</label></div>
                                <div className="col-7" style={{padding: "0px 10px"}}>
                                    <div className="form-control">
                                        <input className="col-9 col-sm-10" style={{border:"0px", outline:"none", padding:"0px 0px", background:"#f7f9fc", color: "inherit"}} onBlur={verifyNewPassword} onFocus={()=> setNewPasswordErrorMessage(["none",""])} type={ (new_password_eye_icon=== "ion-eye") ? "password" : "text"} onChange={updateNewPassword}/>
                                        <i className= "col-3" className={new_password_eye_icon} onClick={toggleNewPassword} ></i>
                                    </div>
                                </div>
                            </div>

                            <div className="row no-gutters">
                                <div className="col-6 offset-6" ><label style={{color:"red",fontSize:"calc(1px + 2vmin)", display:newPasswordErrorMessage[0]}} >{newPasswordErrorMessage[1]}</label></div>
                            </div>


                            <div className="row no-gutters">
                                <div className="col-5"><label className="form-control">Confirm Password</label></div>
                                <div className="col-7" style={{padding: "0px 10px"}}>
                                    <div className="form-control">
                                        <input style={{border:"0px", outline:"none", padding:"0px 0px", background:"#f7f9fc", color: "inherit"}} onBlur={verifyConfirmPassword} onFocus={()=> setConfirmPasswordErrorMessage(["none",""])}  type="password" onChange={updateConfirmPassword}/></div>
                                    </div>
                            </div>

                            <div className="row no-gutters">
                                <div className="col-6 offset-6" ><label style={{color:"red",fontSize:"calc(1px + 2vmin)", display:confirmPasswordErrorMessage[0]}} >{confirmPasswordErrorMessage[1]}</label></div>
                            </div>

                            <div className="row no-gutters">
                                <div className="col-8"><label id="status" >{status}</label></div>
                                <div className="col-4" style={{padding: "0px 10px"}}><button className="btn btn-primary text-center" type="submit" style={{backgroundColor:ButtonColor, fontSize:"calc(2px + 2vmin)", width:"100%", padding: "0px 0px !important"}}>{accountStatusButton}</button></div>
                            </div>

                             {/* <button className="btn btn-primary text-center" onClick={changeStatusHandler} style={{maxWidth: "200px", float:"right", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:buttonColor}}>{accountStatusButton}</button> */}
                         </form>
                     </div>
                 </div>       
                <script src="../assets/js/jquery.min.js"></script>
                <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            </div>

}
export default AddNewPatient;


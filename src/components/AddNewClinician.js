import React, { useState } from 'react';

import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/ClinicInfo.css';

import checkUsernameAvailability from "../services/director.service";
import registerClinician from "../services/director.service";

function AddNewCLinician () {

    var [clinicianName, setClinicianName] = useState("Enter Clinician Name");
    var [userName, setUserName] = useState("Enter Username");
    var [emailAddress, setEmailAddress] = useState('Enter Email Address');
    var [phoneNumber, setPhoneNumber] = useState('Enter Phone Number');
    var [newPassword, setNewPassword] = useState('Enter Password');
    var [confirmPassword, setConfirmPassword] = useState('Confirm Password');


    var [status, setStatus] = useState(['','red']);
    var [accountStatusButton, setAccountStatusButton] = useState('Add');
    var [disableFields, disableFieldsToggle] = useState(false);

    var [userNameErrorMessage, setUserNameErrorMessage] = useState(['none', 'Error', 'red']);
    var [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState(['none','Error']);
    var [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState(['none','Error']);

    var [new_password_eye_icon, set_new_password_eye_icon] = useState("ion-eye");

    var [disableBtn, setDisableBtn] = useState(false);

    const updateClinicianName = e => setClinicianName(e.target.value);
    const updateUserName = e => setUserName(e.target.value);
    const updateEmailAddress = e => setEmailAddress(e.target.value);
    const updatePhoneNumber = e => setPhoneNumber(e.target.value);
    const updateNewPassword = e => setNewPassword(e.target.value);
    const updateConfirmPassword = e => setConfirmPassword(e.target.value);


    const ButtonColor = "rgba(4, 13, 43, 0.8)";

    const registerClinicianHandler = (event)=>{
        event.preventDefault();
        // database Update query
        setClinicianName(clinicianName.trim());
        setUserName(userName.trim());
        setEmailAddress(emailAddress.trim());
        setPhoneNumber(phoneNumber.trim());
        setNewPassword(newPassword.trim());
        

        if(clinicianName === "Enter Clinician Name" || clinicianName === "" ||
            userName === "Enter Username" || userName === "" ||
            emailAddress === 'Enter Email Address' || emailAddress === '' ||
            phoneNumber === 'Enter Phone Number' || phoneNumber === '' ||
            newPassword === 'Enter Password' || newPassword === ''){

            setStatus(['Fields can not be null', 'red']);
            return;
        }

        let data = {
            "name": clinicianName,
            "email": emailAddress,
            "contact": phoneNumber,
            "imagePath": "",
            "login": {
                "username": userName,
                "password": newPassword,
                "userType": "clinician",
                "status": "Active"
            },
            "patientRecords": []
        }

        registerClinician.registerClinician(data)
        .then((response) => {
            if(response.data !== null){
                setStatus([response.data["name"] + ' added sucessfully', 'green']);
                setDisableBtn(true);
            }else{
                setStatus(['Failed to add clinician', 'red']);
            }
            // console.log(response.data);
        }).catch((err) => {
            setStatus(['Failed to add clinician', 'red']);
        });       
    }

    const verifyUserName = () =>{
        setUserName(userName.trim());
        // Check Username availability
        checkUsernameAvailability.checkUsernameAvailability(userName)
        .then((response) => {
            if(response.data == "True")
                setUserNameErrorMessage(['block',"Username available", "green"])
            else   
                setUserNameErrorMessage(['block',"Username not available", "red"])

        }).catch((err) => {
            setUserNameErrorMessage(['block',"Username not available", "red"])
        })
            
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


    return <div>
                 <div className="clinicinfo">
                     <div className="container ">
                         <form onSubmit={registerClinicianHandler}>
                            <div className="row no-gutters">
                                 <div className="col-5" ><label className="form-control" >Clinician Name</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}}><textarea disabled={disableFields} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={clinicianName} onChange={updateClinicianName}/></div>
                             </div>

                              <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Username</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={disableFields}  className="form-control"  type="text" placeholder={userName} onBlur={verifyUserName} onFocus={()=> setUserNameErrorMessage(["none","","green"])} onChange={updateUserName}/></div>
                             </div>

                            <div className="row no-gutters">
                                <div className="col-6 offset-6" ><label style={{color:userNameErrorMessage[2],fontSize:"calc(1px + 2vmin)", display:userNameErrorMessage[0]}} >{userNameErrorMessage[1]}</label></div>
                            </div>

                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Email</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><textarea disabled={disableFields} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={emailAddress} onChange={updateEmailAddress}/></div>
                             </div> 

                             <div className="row no-gutters">
                                 <div className="col-5"><label className="form-control">Phone Number</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={disableFields}  className="form-control"  type="text" placeholder={phoneNumber} onChange={updatePhoneNumber}/></div>
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
                                <div className="col-8"><label id="status" style={{color:status[1]}} >{status[0]}</label></div>
                                <div className="col-4" style={{padding: "0px 10px"}}><button disabled={disableBtn} className="btn btn-primary text-center" type="submit" style={{backgroundColor:ButtonColor, fontSize:"calc(2px + 2vmin)", width:"100%", padding: "0px 0px !important"}}>{accountStatusButton}</button></div>
                            </div>

                             {/* <button className="btn btn-primary text-center" onClick={changeStatusHandler} style={{maxWidth: "200px", float:"right", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:buttonColor}}>{accountStatusButton}</button> */}
                         </form>
                     </div>
                 </div>       
                <script src="../assets/js/jquery.min.js"></script>
                <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            </div>

}
export default AddNewCLinician;


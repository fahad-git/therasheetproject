import React, { useState } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css'; 
import '../assets/fonts/ionicons.min.css';

function ChangePassword(props){

    var [userName, setUserName] = useState(props.params[0]);
    var [oldPassword, setOldPassword] = useState('');
    var [newPassword, setNewPassword] = useState('');
    var [confirmPassword, setConfirmPassword] = useState('');
    var [status, setStatus] = useState('');
    var [oldPasswordErrorMessage, setOldPasswordErrorMessage] = useState(['none','Error']);
    var [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState(['none','Error']);
    var [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState(['none','Error']);

    var [old_password_eye_icon, set_old_password_eye_icon] = useState("ion-eye");
    var [new_password_eye_icon, set_new_password_eye_icon] = useState("ion-eye");


    const updateOldPassword = e => setOldPassword(e.target.value);
    const updateNewPassword = e => setNewPassword(e.target.value);
    const updateConfirmPassword = e => setConfirmPassword(e.target.value);

    const buttonColor = "rgba(4, 13, 43, 0.8)";

    const changePasswordHandler = (event) => {
        event.preventDefault();

        var status_div = document.getElementById("status");
        status_div.style.color = "red";
    
        var passwordHash = require('password-hash');
        var hashedPassword = passwordHash.generate(oldPassword);


        var errors = (oldPasswordErrorMessage[1] + newPasswordErrorMessage[1] + confirmPasswordErrorMessage[1] )
        if( errors !== "")
                return;

        // pass hashedPassword to the API

        let correct_password = true;
        let response_change = true;
        // database response if ok
        if(correct_password && response_change){
            status_div.style.color = "green";
            setStatus("Password Changed");
        } else if(correct_password && !response_change){
            setStatus("Server busy! Please try later");
        }else
            setStatus("Incorrect Password");

    }

    const verifyOldPassword = () =>{
        setOldPassword(oldPassword.trim());
        if(oldPassword.length < 8){
            setOldPasswordErrorMessage(['block',"Password length must be greater than 8"])
        }
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

    const toggleOldPassword = () => {
        if(old_password_eye_icon === "ion-eye")
            set_old_password_eye_icon("ion-eye-disabled");
        else
            set_old_password_eye_icon("ion-eye");
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
                        <form onSubmit={changePasswordHandler}>
                            <div className="row no-gutters">
                                <div className="col-5" ><label className="form-control" >Username</label></div>
                                <div className="col-7" style={{padding: "0px 10px"}}><input disabled={true} className="form-control"  type="text" placeholder={userName}/></div>
                            </div>

                          
                            <div className="row no-gutters">
                                <div className="col-5"><label className="form-control">Old Password</label></div>
                                <div className="col-7" style={{padding: "0px 10px"}}>
                                    <div className="form-control">
                                        <input className="col-9 col-sm-10" style={{border:"0px", outline:"none", padding:"0px 0px", background:"#f7f9fc"}}  onBlur={verifyOldPassword} onFocus={()=> setOldPasswordErrorMessage(["none",""])} type={ (old_password_eye_icon=== "ion-eye") ? "password" : "text"} onChange={updateOldPassword}/>
                                        {/* "ion-eye" "ion-eye-disabled" */}
                                        <i className="col-3" className={old_password_eye_icon} onClick={toggleOldPassword} ></i>
                                    </div>
                                </div>
                            </div>

                            <div className="row no-gutters">
                                <div className="col-6 offset-6" ><label style={{color:"red",fontSize:"calc(1px + 2vmin)", display:oldPasswordErrorMessage[0]}} >{oldPasswordErrorMessage[1]}</label></div>
                            </div>


                            <div className="row no-gutters">
                                <div className="col-5"><label className="form-control">New Password</label></div>
                                <div className="col-7" style={{padding: "0px 10px"}}>
                                    <div className="form-control">
                                        <input className="col-9 col-sm-10" style={{border:"0px", outline:"none", padding:"0px 0px", background:"#f7f9fc"}} onBlur={verifyNewPassword} onFocus={()=> setNewPasswordErrorMessage(["none",""])} type={ (new_password_eye_icon=== "ion-eye") ? "password" : "text"} onChange={updateNewPassword}/>
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
                                        <input style={{border:"0px", outline:"none", padding:"0px 0px", background:"#f7f9fc"}} onBlur={verifyConfirmPassword} onFocus={()=> setConfirmPasswordErrorMessage(["none",""])}  type="password" onChange={updateConfirmPassword}/></div>
                                    </div>
                            </div>

                            <div className="row no-gutters">
                                <div className="col-6 offset-6" ><label style={{color:"red",fontSize:"calc(1px + 2vmin)", display:confirmPasswordErrorMessage[0]}} >{confirmPasswordErrorMessage[1]}</label></div>
                            </div>

                            
                            <div className="row no-gutters">
                                <div className="col-8"><label id="status" >{status}</label></div>
                                <div className="col-4" style={{padding: "0px 10px"}}><button className="btn btn-primary text-center" style={{backgroundColor:buttonColor, fontSize:"calc(2px + 2vmin)", width:"100%", padding: "0px 0px !important"}}>Update</button></div>
                            </div>
                        </form>
                    </div> 
                </div>
                <script src="../assets/js/jquery.min.js"></script>
                <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            </div>

} 
export default ChangePassword;



// class ChangePassword extends React.Component{

//     constructor(props){
//         super(props)

//         // Here it will request for data
//         let user_name = this.props.username;


//         this.state = {
//             username:user_name,
//             password:"",
//             newpassword:"",
//             passwordrepeat:"",
//             status:""
//         }

//     }

//     changeValueHandler = (event) =>{
//         this.setState({[event.target.name]:event.target.value});
//     }

//     changePasswordHandler = (event) => {
//         event.preventDefault();

//         var status_div = document.getElementById("status");
//         status_div.style.color = "red";
        
//         let oldPass = this.state.password;
//         let newPass = this.state.newpassword;
//         let newPassRepeat = this.state.passwordrepeat;

//         if(newPass.length < 8){
//             this.setState({"status":"New password length must be greater than 8"});
//             return;
//         }else if (newPass.trim() != newPassRepeat.trim()){
//             this.setState({"status":"Password Mismatch"});
//             return;
//         }else if(oldPass.trim().length === 0){
//             this.setState({"status":"Enter Password"});
//             return;
//         }
//         var passwordHash = require('password-hash');
//         var hashedPassword = passwordHash.generate(oldPass.trim());

//         // pass hashedPassword to the API

//         let correct_password = true;
//         let response_change = true;
//         // database response if ok
//         if(correct_password && response_change){
//             status_div.style.color = "green";
//             this.setState({"status":"Password Changed"});
//         } else if(correct_password && !response_change){
//             this.setState({"status":"Server busy! Please try later"});
//         }else
//            this.setState({"status":"Incorrect Password"});

//     }

//     render(){
//         return(
//             <div>
//                 <div className="popup">
//                     <div className="form-container">
//                         <form onSubmit={this.changePasswordHandler}>
                            
//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} className="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Username</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} className="card"><input disabled={true} style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="username"  value={this.state.username}/></div>
//                             </div>

//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} className="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Password</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} className="card"><input  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="password" name="password" onChange={this.changeValueHandler} value={this.state.password}/></div>
//                             </div>
                            
//                             <div style={{clear:"both", display:"block"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} className="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >New Password</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} className="card"><input style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="password" name="newpassword" onChange={this.changeValueHandler} value={this.state.newpassword}/></div>
//                             </div>

//                             <div style={{clear:"both", display:"block"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} className="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Repeat Password</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} className="card"><input  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="password" name="passwordrepeat" onChange={this.changeValueHandler} value={this.state.passwordrepeat}/></div>
//                             </div>

//                             <div style={{clear:"both", display:"block"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} ><label id="status" style={{padding:"10px 10px", color:"red", width:"180px", textAlign:"left", fontWeight:"bold"}} >{this.state.status}</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} ><button className="btn btn-primary text-center" type="submit" style={{maxWidth: "200px", float:"right", width:"200px", marginTop:"30px", maxHeight: "50px", backgroundColor:"#5376f4"}}>Change Password</button></div>
//                             </div>
                            
//                         </form>
//                     </div>
//                 </div>
//                 <script src="../assets/js/jquery.min.js"></script>
//                 <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
//             </div>
//         )
//     }
// }

// export default ChangePassword;
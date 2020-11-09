import React, {useState} from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/ClinicInfo.css';


function ClinicianAccountInfo(props){

    var [password_eye_icon, set_password_eye_icon] = useState("ion-eye");


    var [clinicianName, setClinicianName] = useState('Sarah');
    var [userName, setUserName] = useState("Sahra-05");
    var [emailAddress, setEmailAddress] = useState('sarah@therasheet.com');
    var [profilePicture, setProfilePicture] = useState('https://www.nicepng.com/png/full/52-522753_photo-of-a-business-woman-professional-woman-png.png');
    var [accountStatusButton, setAccountStatusButton] = useState('Edit');
    var [disableFields, disableFieldsToggle] = useState(true);
    var [password, setPassword] = useState(['none','']);
    var [status, setStatus] = useState('');
    var[showProfile, setShowProfile] = useState(["none","Profile Picture"]);

    const ButtonColor = "rgba(4, 13, 43, 0.8)";


    const updatePassword = (e) => setPassword(['block',e.target.value]);

    const updatInformationHandler = (event) => {
        event.preventDefault();

        if(accountStatusButton === "Edit"){
            disableFieldsToggle(false);
            setPassword(["block",""]);
            setAccountStatusButton("Update");
        }else{

            console.log()

            setStatus("Profile Updated");
            disableFieldsToggle(true);
            setPassword(["none",""]);
            setAccountStatusButton("Edit");
            
        }
    }

    const profilePictureHandler = (event) => {
        let file = event.target.files[0]
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            setProfilePicture(reader.result);
            setShowProfile(["block", file.name]);
            }
    }

    const togglePassword = () => {
        if(password_eye_icon === "ion-eye")
            set_password_eye_icon("ion-eye-disabled");
        else
            set_password_eye_icon("ion-eye");
    }

    return <div className="clinicinfo">
                <div className="container ">
                    <form onSubmit={updatInformationHandler}>

                        <div className="row no-gutters">
                            <div className="col-5"><label className="form-control">Clinician Name</label></div>
                            <div className="col-7" style={{padding: "0px 10px"}}><input disabled={disableFields} className="form-control"  type="text" placeholder={clinicianName}/></div>
                        </div>

                        <div className="row no-gutters">
                            <div className="col-5"><label className="form-control">Username</label></div>
                            <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={userName}/></div>
                        </div>

                        <div className="row no-gutters">
                            <div className="col-5"><label className="form-control">Email</label></div>
                            <div className="col-7" style={{padding: "0px 10px"}} ><textarea disabled={disableFields} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={emailAddress}/></div>
                        </div> 

                        {/*  This is image file upload code */}
                        <div className="custom-file mb-3" >
                            <input type="file"  className="custom-file-input" id="customFile" disabled={disableFields} onChange={profilePictureHandler} />
                            <label className="custom-file-label form-control" style={{width:"97%"}} htmlFor="customFile" >{showProfile[1]}</label>
                        </div>


                        <div className="row no-gutters">
                            <div className="col-12 col-sm-10 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3" style={{height:"auto", padding:"20px 10px", display:showProfile[0]}} >
                                <img className="rounded-circle img-fluid border d-md-flex justify-content-md-center align-items-md-center" src={profilePicture}></img>
                            </div>
                        </div> 



                        <div className="row no-gutters">
                            <div className="col-5" style={{display:password[0]}}><label className="form-control">Password</label></div>
                                <div className="col-7" style={{padding: "0px 10px", display:password[0]}}>                            
                                    <div className="form-control">
                                        <input className="col-9 col-sm-10"  disabled={disableFields}  type={ (password_eye_icon=== "ion-eye") ? "password" : "text"} style={{border:"0px", outline:"none", padding:"0px 0px", background:"#f7f9fc"}} placeholder="Enter password" onChange={updatePassword}/>
                                        <i className= "col-3" className={password_eye_icon} onClick={togglePassword} ></i>
                                    </div>
                                </div>
                        </div> 
    
                        <div className="row no-gutters">
                                <div className="col-8"><label id="status" >{status}</label></div>
                                <div className="col-4" style={{padding: "0px 10px"}}><button className="btn btn-primary text-center" type="submit" style={{backgroundColor:ButtonColor, fontSize:"calc(2px + 2vmin)", width:"100%", padding: "0px 0px !important"}}>{accountStatusButton}</button></div>
                        </div>

                    </form>
                </div>
            <script src="../assets/js/jquery.min.js"></script>
            <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            </div>
            
}

export default ClinicianAccountInfo;
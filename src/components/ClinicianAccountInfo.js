import React, {useState, useEffect} from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/ClinicInfo.css';

import getClinicianInfo from "../services/clinician.service";
import uploadProfilePicture from "../services/clinician.service";

function ClinicianAccountInfo(props){

    var [password_eye_icon, set_password_eye_icon] = useState("ion-eye");

    var [clinicianName, setClinicianName] = useState('');
    var [userName, setUserName] = useState('');
    var [emailAddress, setEmailAddress] = useState('');
    var [profilePicture, setProfilePicture] = useState('https://www.nicepng.com/png/full/52-522753_photo-of-a-business-woman-professional-woman-png.png');
    
    var [accountStatusButton, setAccountStatusButton] = useState('Edit');
    var [disableFields, disableFieldsToggle] = useState(true);
    var [password, setPassword] = useState(['none','']);
    var [status, setStatus] = useState('');
    var[showProfile, setShowProfile] = useState(["none","Profile Picture"]);

    var [selectedFile, setSelectedFile] = useState(null);

    const ButtonColor = "rgba(4, 13, 43, 0.8)";

    const updatePassword = (e) => setPassword(['block',e.target.value]);

    useEffect(()=>{
        getClinicianInfo.getClinicianInfo()
        .then(response => {
            console.log(response.data);
            setUserName(response.data["login"]["username"])
            setClinicianName(response.data["name"]);
            setEmailAddress(response.data["email"])
            // setStatus(response.data["login"]["status"])
        })
        .catch(err => console.log(err))
    },[]);

    const updatInformationHandler = (event) => {
        event.preventDefault();

        if(accountStatusButton === "Edit"){
            disableFieldsToggle(false);
            setPassword(["block",""]);
            setAccountStatusButton("Update");
        }else{

            console.log("Obj:")
            console.log(selectedFile)

            if(password[1].trim() === ''){
                setStatus("Type Password");
                return;
            }
    
            // Create an object of formData 
            const data = new FormData(); 

            var file = new File([], "foo.txt", {
                type: "text/plain",
                });

    
            if(selectedFile == null)
                //Update the formData object 
                data.append('file', file);
            else
                //Update the formData object 
                data.append('file', selectedFile);
                
            if(selectedFile.size > 3200000){
                // if file is greater than 3MB
                setStatus("File can not be greater than 3MB");
                return;
            }

            
            data.append('name', clinicianName);               
            data.append('password', password[1]);
            // return;
            uploadProfilePicture.uploadProfilePicture(data)
            .then((response) => {
                console.log("Clinician Object:");
                console.log(response.data);
                if(response.data !== []){
                    var user = JSON.parse(localStorage.getItem("user"));
                    // let profileURL = "data:" + response.data.file.type + ";base64," + response.data.file.data;
                    // console.log(profileURL);
                    // data:image/jpeg;base64,/9j/4AAQSkZJ
                    if(response.data.file !== null){
                    let profile = {
                        "data": response.data.file.data,
                        "fileId": response.data.file.fileId,
                        "fileName": response.data.file.fileName,
                        "type": response.data.file.type
                    }
                        user["file"] = profile;
                    }
                    user["name"] = response.data.name;
                    localStorage.setItem("user", JSON.stringify(user));
                    setStatus('Profile Updated');
                    disableFieldsToggle(true);
                    setPassword(["none",""]);
                    setAccountStatusButton("Edit");
                }
                else
                    setStatus('Failed to update try again with correct password');
            }).catch((err) => {
                setStatus('Failed to update try again');
                console.log(err);
            });
        }
    }

    const profilePictureHandler = (event) => {
        let file = event.target.files[0]
        setSelectedFile(file);
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
                            <div className="col-7" style={{padding: "0px 10px"}}><input disabled={disableFields} className="form-control"  type="text" placeholder={clinicianName} onChange={e => setClinicianName(e.target.value)} /></div>
                        </div>

                        <div className="row no-gutters">
                            <div className="col-5"><label className="form-control">Username</label></div>
                            <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={userName}/></div>
                        </div>

                        <div className="row no-gutters">
                            <div className="col-5"><label className="form-control">Email</label></div>
                            <div className="col-7" style={{padding: "0px 10px"}} ><textarea disabled={true} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={emailAddress}/></div>
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
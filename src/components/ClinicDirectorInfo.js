import React, {useState, useEffect} from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/ClinicInfo.css';

import getDirectorInfo from "../services/director.service";
import uploadProfilePicture from "../services/director.service";


function ClinicDirectorInfo(props){

    var [password_eye_icon, set_password_eye_icon] = useState("ion-eye");

    const ID = props.params[0];
// https://www.nicepng.com/png/full/52-522753_photo-of-a-business-woman-professional-woman-png.png
    var [directorName, setDirectorName] = useState('');
    var [userName, setUserName] = useState('');
    var [facilityAddress, setFacilityAddress] = useState('');
    var [emailAddress, setEmailAddress] = useState('');
    var [phoneNumber, setPhoneNumber] = useState('');
    var [registrationDate, setRegistrationDate] = useState('');
    var [subscriptionDate, setSubscriptionDate] = useState('');
    var [expiryDate, setExpiryDate] = useState('');
    var [numberOfClinicians, setNumberOfClinicians] = useState('');
    var [profilePicture, setProfilePicture] = useState('');
    var [accountStatusButton, setAccountStatusButton] = useState('Edit');
    var [disableFields, disableFieldsToggle] = useState(true);
    var [password, setPassword] = useState(['none','']);
    var [status, setStatus] = useState('');
    var[showProfile, setShowProfile] = useState(["none","Profile Picture"]);


    var [selectedFile, setSelectedFile] = useState(null);

    const ButtonColor = "rgba(4, 13, 43, 0.8)";

    const updatePassword = (e) => setPassword(['block',e.target.value]);

    useEffect(()=>{
        getDirectorInfo.getDirectorInfo()
        .then((response => {
            setDirectorName(response.data["ownerName"]);
            setUserName(response.data["userName"]);
            setFacilityAddress(response.data["facilityAddress"]);
            setEmailAddress(response.data["emailAddress"]);
            setPhoneNumber(response.data["phoneNumber"]);
            setRegistrationDate(response.data["registrationDate"].toString().substring(0, 10));
            setSubscriptionDate(response.data["subscriptionDate"].toString().substring(0, 10));
            setExpiryDate(response.data["expiryDate"].toString().substring(0, 10));
            setNumberOfClinicians(response.data["numberOfClinicians"]);
        }))
        .catch(err=>console.log(err))
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

            setStatus("")


            if(selectedFile == null)
                // Update the formData object 
                data.append('file', file);
            else
                // Update the formData object 
                data.append('file', selectedFile);

            if(selectedFile.size > 3200000){
                // if file is greater than 3MB
                setStatus("File can not be greater than 3MB");
                return;
            }

            data.append('name', directorName);
            data.append('facilityAddress', facilityAddress);
            data.append('password', password[1]);
            // return;
            uploadProfilePicture.uploadProfilePicture(data)
            .then((response) => {
                console.log("Clinic Object:");
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
                    user["name"] = response.data.ownerName;
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
                            <div className="col-5"><label className="form-control">Director Name</label></div>
                            <div className="col-7" style={{padding: "0px 10px"}}><input disabled={disableFields} className="form-control"  type="text" placeholder={directorName} onChange={e => setDirectorName(e.target.value)}/></div>
                        </div>

                        <div className="row no-gutters">
                            <div className="col-5"><label className="form-control">Username</label></div>
                            <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={userName}/></div>
                        </div>

                        <div className="row no-gutters">
                            <div className="col-5"><label className="form-control">Facility Address</label></div>
                            <div className="col-7" style={{padding: "0px 10px"}} ><textarea disabled={disableFields} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={facilityAddress} onChange={e => setFacilityAddress(e.target.value)} /></div>
                        </div> 


                        <div className="row no-gutters">
                            <div className="col-5"><label className="form-control">Email</label></div>
                            <div className="col-7" style={{padding: "0px 10px"}} ><textarea disabled={true} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={emailAddress}/></div>
                        </div> 

                        <div className="row no-gutters">
                            <div className="col-5"><label className="form-control">Phone Number</label></div>
                            <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={phoneNumber}/></div>
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
                            <div className="col-5"><label className="form-control">Expiry Date</label></div>
                            <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={expiryDate}/></div>
                        </div>

                        <div className="row no-gutters">
                            <div className="col-5"><label className="form-control">Number of Clinicians</label></div>
                            <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={numberOfClinicians}/></div>
                        </div>

                        {/*  This is image file upload code */}
                        <div className="custom-file mb-3" >
                            <input type="file"  className="custom-file-input" id="customFile" disabled={disableFields} onChange={profilePictureHandler} />
                            <label className="custom-file-label form-control" style={{width:"97%"}} htmlFor="customFile" >{showProfile[1]}</label>
                        </div>


                        <div className="row no-gutters">
                            
                            {/* <div className="col-5"><label className="form-control">Profile Picture</label></div> */}
                            {/* <div className="col-7 custom-file mb-3" style={{padding: "10px 20px"}} ><input disabled={disableFields} onChange={profilePictureHandler} type="file"/></div> */}
                            
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


                        {/* <button className="btn btn-primary text-center" style={{maxWidth: "200px", float:"right", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:ButtonColor}}>{accountStatusButton}</button> */}
                    </form>
                </div>
            <script src="../assets/js/jquery.min.js"></script>
            <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            </div>
            
}

export default ClinicDirectorInfo;
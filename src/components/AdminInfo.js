import React, {useState, useEffect} from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/ClinicInfo.css';

import getAdminInfo from '../services/admin.service';
import uploadProfilePicture from '../services/admin.service';

function AdminInfo(props){

    var [password_eye_icon, set_password_eye_icon] = useState("ion-eye");
    const ID = props.params[0];
    var [adminName, setAdminName] = useState('');
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
        getAdminInfo.getAdminInfo()
        .then((response) => {
            // API
            // console.log(response.data);
            setAdminName(response.data["name"]);
            setUserName(response.data["username"]);
          }).catch((err)=>{
              console.log('');
            // console.log(err)
          });
    },[])


    // const imgToBase64 = (img) => {
    //     const canvas = document.createElement('canvas');
    //     const ctx = canvas.getContext('2d');
    //     canvas.width = img.width;
    //     canvas.height = img.height;
      
    //     // I think this won't work inside the function from the console
    //     img.crossOrigin = 'anonymous';
      
    //     ctx.drawImage(img, 0, 0);
      
    //     return canvas.toDataURL();
    //   }

    const updatInformationHandler = (event) => {
        event.preventDefault();

        if(accountStatusButton === "Edit"){
            disableFieldsToggle(false);
            setPassword(["block",""]);
            setAccountStatusButton("Update");
        }else{

            // console.log("Obj: "+ selectedFile);

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

            // console.log("Name: "+adminName);
            data.append('name', adminName);
            data.append('password', password[1]);

            // "https://kinsta.com/wp-content/uploads/2015/11/low-compression-high-quality-jpg.jpg";
                                        
            uploadProfilePicture.uploadProfilePicture(data)
            .then((response) => {
                // console.log(response.data);
                if(response.data !== []){
                    var user = JSON.parse(localStorage.getItem("user"));
                    // let profileURL = "data:" + response.data.file.type + ";base64," + response.data.file.data;
                    // console.log(profileURL);
                    // data:image/jpeg;base64,/9j/4AAQSkZJ
                    let profile = {
                        "data": response.data.file.data,
                        "fileId": response.data.file.fileId,
                        "fileName": response.data.file.fileName,
                        "type": response.data.file.type
                    }
                    user["file"] = profile
                    user["name"] = response.data.name;
                    localStorage.setItem("user", JSON.stringify(user));
                    
                    setStatus("Profile Updated");
                    disableFieldsToggle(true);
                    setPassword(["none",""]);
                    setAccountStatusButton("Edit");
                }
                else
                    setStatus('Failed to update try again with correct password');
            }).catch((err) => {
                setStatus('Failed to update try again');
                // console.log(err);
            });

                            // Blob conversion 
                            // this code converts base64 to blob and blob to base64
                            // fetch(profilePicture)
                            // .then(res => {
                            //   return res.blob();
                            // }).then(myBlob => {
                        
                            //     console.log(myBlob)
                            //     var reader = new FileReader();
                            //     reader.readAsDataURL(myBlob); 
                            //     reader.onloadend = function() {
                            //         var base64data = reader.result;                
                            //         console.log(base64data);
                            //         setProfilePicture(base64data);
                            //     }
                            // })
                            // .catch(err=> console.log(err))

                            // setProfilePicture(btoa(selectedFile))

                            // validatePassword.validatePassword({"password": password[1].trim()})
                            // .then( (passResponse) => {
                            
                            //     let res = passResponse.data["res"];

                            //     if(res == false){
                            //         setStatus("Invalid Password");
                            //         return;
                            //     }

                            //     uploadProfilePicture.uploadProfilePicture(data)
                            //     .then( (response) => {
                            //         console.log(response);
                            //         let path = response.data.path;
                            //         let changeObject = {
                            //             "adminName":adminName,
                            //             "profilePicture":path
                            //         }
                            //         updateAdminInfo.updateAdminInfo(changeObject)
                            //         .then((res) => {
                            //             console.log("Saved Successfully!")
                            //             setStatus("Profile Updated");
                            //             disableFieldsToggle(true);
                            //             setPassword(["none",""]);
                            //             setAccountStatusButton("Edit");
                            //         })
                            //         .catch((err) => {
                            //             console.log("error");
                            //         });
                            //     })
                            //     .catch((err) => {
                            //         console.log(err);
                            //     });
                            // })
                            // .catch((err) => {
                            //     console.log("error");
                            // });
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
                            <div className="col-5"><label className="form-control">Admin Name</label></div>
                            <div className="col-7" style={{padding: "0px 10px"}}><input disabled={disableFields} className="form-control"  type="text" placeholder={adminName} onChange={e => setAdminName(e.target.value)}/></div>
                        </div>

                        <div className="row no-gutters">
                            <div className="col-5"><label className="form-control">Username</label></div>
                            <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={true}  className="form-control"  type="text" placeholder={userName}/></div>
                        </div>

                        <div className="row no-gutters" style={{display:"none"}}>
                            <div className="col-5"><label className="form-control">Email</label></div>
                            <div className="col-7" style={{padding: "0px 10px"}} ><textarea disabled={disableFields} rows="1" className="form-control" style={{resize: "none"}} type="text" placeholder={emailAddress}/></div>
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

export default AdminInfo;



// class AdminInfo extends React.Component{

//     constructor(props){
//         super(props)

//         // Here it will request for data
//         let username = this.props.params[0];


//         this.state = {
//             adminname:"Admin",
//             username:username,
//             phone:"333-21-212",
//             address:"AL 35758, United States",
//             email:"admin@therasheet.com",
//             selectedFile:null,
//             accountstatusbtn:"Edit",
//             password:"",
//             disablefields:true,
//             status:""
//         }

//     }

//     editFieldsHandler = (event)=>{
//         event.preventDefault();

        

//         if(this.state.accountstatusbtn === 'Edit')
//             this.setState({"disablefields":false, "accountstatusbtn":"Update"});
//         else{
//              // Update All infor to the db
//             let password = this.state.password;

//             var passwordHash = require('password-hash');
//             var hashedPassword = passwordHash.generate(password.trim());

//             // Here password validation will be done through 

//             this.setState({"disablefields":true, "accountstatusbtn":"Edit"});
//             document.getElementById("status").style.color = "green";
//             this.setState({"status":"Info Updated!"});
//         }

//     }
//     fileHandler = (event) => {
//         let file = event.target.files[0]
//         alert(file.name+" "+file.size);
//         this.setState({"selectedFile":file});
//     }

//     changeValueHandler = (event) =>{
//         this.setState({[event.target.name]:event.target.value});
//     }

//     render(){
//         return(
//             <div>
//                 <div className="popup">
//                     <div className="form-container">
//                         <form onSubmit={this.editFieldsHandler}>
//                             {/* <h2 className="text-center" style={{color:"#5376f4"}}><strong>Clinic Information</strong></h2>
//                              */}
//                             <div>
//                                 <div style={{float:"left"}} class="card"><label style={{padding:"10px 10px", width:"180px",  textAlign:"left", fontWeight:"bold"}} >Admin Name</label></div>
//                                 <div style={{float:"right"}} class="card"><input disabled={this.state.disablefields}  style={{padding:"10px 20px", width:"280px", height:"50px" }} className="form-control"  type="text" name="adminname" onChange={this.changeValueHandler} value={this.state.adminname}/></div>
//                             </div>

//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Username</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={this.state.disablefields}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="username" onChange={this.changeValueHandler} value={this.state.username}/></div>
//                             </div>
                            

//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px",  textAlign:"left", fontWeight:"bold"}} >Phone Number</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={this.state.disablefields}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="phone" onChange={this.changeValueHandler} value={this.state.phone}/></div>
//                             </div>
                                                

//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Address</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={this.state.disablefields}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="address" onChange={this.changeValueHandler} value={this.state.address}/></div>
//                             </div>


//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Email</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={this.state.disablefields}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="text" name="email" onChange={this.changeValueHandler} value={this.state.email}/></div>
//                             </div>

//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Profile Picture</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={this.state.disablefields}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="file" name="profilepicture" onChange={this.fileHandler}/></div>
//                             </div>

//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} class="card"><label style={{padding:"10px 10px", width:"180px", textAlign:"left", fontWeight:"bold"}} >Password</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} class="card"><input disabled={this.state.disablefields}  style={{padding:"10px 20px", width:"280px", height:"50px"}} className="form-control"  type="password" name="password" value={this.state.password}/></div>
//                             </div>

//                             <div style={{clear:"both"}}>
//                                 <div style={{float:"left", marginTop:"20px"}} ><label id="status" style={{padding:"10px 10px", color:"red", width:"180px", textAlign:"left", fontWeight:"bold"}} >{this.state.status}</label></div>
//                                 <div style={{float:"right", marginTop:"20px"}} ><button className="btn btn-primary text-center" type="submit" style={{maxWidth: "200px", float:"right", width:"200px", marginTop:"30px", maxHeight: "50px", backgroundColor:"#5376f4"}}>{this.state.accountstatusbtn}</button></div>
//                             </div>

//                             {/* <button className="btn btn-primary text-center" onClick={this.editFieldsHandler} style={{maxWidth: "200px", float:"right", width:"150px", marginTop:"30px", maxHeight: "50px", backgroundColor:"#5376f4"}}>{this.state.accountstatusbtn}</button> */}
//                         </form>
//                     </div>
//                 </div>
//                 <script src="../assets/js/jquery.min.js"></script>
//                 <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
//             </div>
//         )
//     }
// }

// export default AdminInfo;
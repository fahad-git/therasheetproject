import React, { useState } from 'react';

import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/ClinicInfo.css';

import addNewPatient from "../services/clinician.service";

function AddNewPatient () {

    var [patientName, setPatientName] = useState("Enter Patient Name");
    var [diagnosis, setDiagnosis] = useState("Enter Diagnosis");
    var [protocol, setProtocol] = useState(["Protocol",null]);
    var [precaution, setPrecaution] = useState("Type here");
    var [otherPrecaution, setOtherPrecaution] = useState("none");

    var [status, setStatus] = useState('');
    var [accountStatusButton, setAccountStatusButton] = useState('Add');
    var [disableFields, disableFieldsToggle] = useState(false);

    const updatePatientName = e => setPatientName(e.target.value);
    const updateDiagnosis = e => setDiagnosis(e.target.value);
    const updatePrecaution = e => setPrecaution(e.target.value);


    var [selectedFile, setSelectedFile] = useState(null);

    const ButtonColor = "rgba(4, 13, 43, 0.8)";

    const changeStatusHandler = (event)=>{
        event.preventDefault();
        // database Update query
        
        if(selectedFile === null){
            setStatus("Select Protocol File");
            return;
        }else if(selectedFile.size > 3200000){
            // if file is greater than 3MB
            setStatus("File can not be greater than 3MB");
            return;
        }

        setStatus("");
        console.log(selectedFile);


        // var file = new File(["Hello World"], "foo.txt", {
        //     type: "text/plain",
        //   });

        const user = JSON.parse(localStorage.getItem("user"));

        const today = new Date();
        const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

        const data = new FormData();
        data.append('file',selectedFile);
        data.append('patientName',patientName);
        data.append('diagnosis',diagnosis);
        data.append('precaution',precaution);
        data.append('id',user.id);
        data.append('date',new Date(date));
        
        // let data = {
        //     "patientName":patientName,
        //     "diagnosis":diagnosis,
        //     "precaution":precaution,
        //     "file":selectedFile
        // }

         console.log(data);

        addNewPatient.addNewPatient(data)
        .then(response => {
            if(response.data === "True"){
                setStatus("Patient Added Successfully");
                disableFieldsToggle(true);
            }
            else
                setStatus("Failed to add patient");
        })
        .catch(err => {
            setStatus("Failed to add patient");
            console.log(err)});

    }

    const protocolHandler = (event) => {
        try {
            let file = event.target.files[0];
            setSelectedFile(file);
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
                                 <div className="col-5"><label className="form-control">Diagnosis</label></div>
                                 <div className="col-7" style={{padding: "0px 10px"}} ><input disabled={disableFields}  className="form-control"  type="text" placeholder={diagnosis} onChange={updateDiagnosis}/></div>
                             </div>

                            <div className="row no-gutters" style={{marginBottom:"20px"}}>
                                 <div className="col-12"  >
                                    <select className="form-control" onChange={precautionHandler} style={{width:"97%"}} disabled={disableFields}>
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
                                <div className="col-8"><label id="status" >{status}</label></div>
                                <div className="col-4" style={{padding: "0px 10px"}}><button disabled={disableFields} className="btn btn-primary text-center" type="submit" style={{backgroundColor:ButtonColor, fontSize:"calc(2px + 2vmin)", width:"100%", padding: "0px 0px !important"}}>{accountStatusButton}</button></div>
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


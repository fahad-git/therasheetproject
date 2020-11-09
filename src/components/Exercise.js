import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {Modal} from 'react-bootstrap';


import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/Admin.css';


function Exercise(props){

    const background_color = "rgba(4, 13, 43, 0.8)";

    var today = new Date();
    var todate = String(today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear());

    let exerciseTemplateTypea = ["Upper body", "Lower body", "Back/Core"]
    let exerciseTemplatesa = ["Template 1", "Template 2", "Template 3"];
    let exerciseTypesa = ["Cardio Equipment", "Table Exercise", "Balance Exercise", "Stretching"];


    var [exerciseTemplateType, setExerciseTemplateType] = useState(exerciseTemplateTypea);
    var [exerciseTemplates, setExerciseTemplates] = useState(exerciseTemplatesa);
    var [exerciseTypes, setExerciseTypes] = useState(exerciseTypesa);
    var [exerciseSubTypes, setExerciseSubTypes] = useState(exerciseTypesa);
    var [exerciseData, setExerciseData] = useState([]);

    var [isExerciseModalOpen, exerciseModalToggle] = useState(false);

    const loadTemplates = (event) => {
        
        let tmp = [];
        switch(event.target.value){
            case "Upper body":
                tmp = ["U Temp 1", "U Temp 2", "U Temp 3", "U Temp 4"];
                setExerciseTemplates(tmp);
            break;
            case "Lower body":
                tmp = ["L Temp 1", "L Temp 2", "L Temp 3", "L Temp 4"];
                setExerciseTemplates(tmp);
            break;
            case "Back/Core":
                tmp = ["B/C Temp 1", "B/C Temp 2", "B/C Temp 3", "B/C Temp 4"];
                setExerciseTemplates(tmp);
            break;
            default:
                tmp = [""];
                setExerciseTemplates(tmp);
            break;
        }

    }

    const loadExerciseTypes = (event) => {
       
        let tmp = [];
        switch(event.target.value){
            case "U Temp 1":
                tmp = ["Cardio Equipment", "Table Exercise"];
                setExerciseTypes(tmp);
            break;
            case "U Temp 2":
                tmp = ["Cardio Equipment", "Table Exercise", "Balance Exercise"];
                setExerciseTypes(tmp);
            break;
            case "U Temp 3":
                tmp = ["Cardio Equipment", "Table Exercise", "Balance Exercise", "Stretching"];
                setExerciseTypes(tmp);
            break;
            case "U Temp 4":
                tmp = [ "Table Exercise", "Stretching"];
                setExerciseTypes(tmp);
            break;
            default:
                tmp = [""];
                setExerciseTypes(tmp);
            break;
        }

    }

    const selectExercisesHandler = (event) => {
        
        let tmp = [];
        switch(event.target.value){
            case "Cardio Equipment":
                tmp = ["Upright Bike", "Rec Bike", "Treadmil"];
                setExerciseSubTypes(tmp);
            break;
            case "Table Exercise":
                tmp = ["SLR-Flex", "SLR-AB", "SLR-EXT", "SLR-ADD", "Quard", "HS Set"];
                setExerciseSubTypes(tmp);
            break;
            case "Balance Exercise":
                tmp = ["Rhomberg-1/2","Rhomberg-Full", "Rhomberg-ECO", "EC", "Foam"];
                setExerciseSubTypes(tmp);
            break;
            case "Stretching":
                tmp = ["Hamstring-Strap", "Hamstring-Fig 4", "Hamstring-Stand", "Quard-Strap", "Quard-Stand"];
                setExerciseSubTypes(tmp);
            break;
            default:
                tmp = [""];
                setExerciseSubTypes(tmp);
                return;
            // break;
        }

        exerciseModalToggle(true);
    }

    const exercciseHandler = () => {

        let superType = document.getElementById('exerciseType').value;
        let subTypes = []

        var checkboxes = document.getElementsByName('exerciseSubType');
        for (var checkbox of checkboxes) {
          if (checkbox.checked)
              subTypes.push(checkbox.value)
            // console.log(checkbox.value + ' ');
        }

        if(exerciseData.length == 0 ){
            let obj = {
                        "type": superType,
                        "subtype": subTypes
                    }
                    // alert("working")
            setExerciseData([obj]);
            console.log(subTypes);
            console.log("len: "+exerciseData.length);
            console.log(exerciseData);
            exerciseModalToggle(false);
            return;
        }

        // let check_new_type = false;

        // for(let i=0; i < exerciseData.length; i++){
        //     if(exerciseData[i]["type"] === superType){
        //         check_new_type = true;
        //         if(exerciseData[i]["subtype"].indexOf(subexty.value) === -1){
        //             exerciseData[i]["subtype"].push(subexty.value);
        //             console.log("ex: "+exerciseData)
        //             this.setState({"exerciseData":exerciseData});
        //             return;
        //         }else{return;}
        //     }
        // }

        // if(check_new_type == false){
        //     let obj = {
        //         "type": exty.value,
        //         "subtype": [subexty.value]
        //         }
            
        //     exerciseData.push(obj);
        //     this.setState({"exerciseData":exerciseData});
        //     return;
        // }

        console.log(subTypes);
        console.log("len: "+exerciseData.length);
        console.log(exerciseData);
        exerciseModalToggle(false);
    }

    const onValueChange = () => {
        alert("working")
    }

    const removeElementHandler = (typename, subtypename) => {
        // let existing_data = this.state.exerciseData;
        // console.log(JSON.stringify(existing_data));
        // let index ="";
        // // alert(typename+" "+subtypename)
        // for(let i=0; i < existing_data.length; i++)
        //     if(existing_data[i]["type"] === typename){
        //         index = existing_data[i]["subtype"].indexOf(subtypename);
        //         existing_data[i]["subtype"].splice(index,1);
        //         if(existing_data[i]["subtype"].length == 0)
        //             existing_data.splice(i, 1)

        //         this.setState({"exerciseData":existing_data});  
        //         return;
        //     }
        // alert(index);
        alert("working");

    }

    return <div className='admin'>
                {/* Modal 1 this modal is for Exercise Sub Types*/}
                <Modal show={isExerciseModalOpen}
                    onHide = {()=> exerciseModalToggle(false)}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <h2 className="text-center" style={{color:background_color}}><strong>Exercises</strong></h2>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="Container">
                            {
                                
                                exerciseSubTypes.map( (extemptype, index) => {
                                    return      <div className="form-control"> 
                                                    <input className="col-2" key = {index} name="exerciseSubType" value={extemptype} type = "checkbox" style={{backgroundColor:"white", color:"black"}}/>
                                                    <label className="col-auto" >{extemptype}</label>
                                                </div>
                                           
                                    })
                                     
                            } 
                            </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="col-4" style={{padding: "0px 10px"}}>
                            <button className="btn btn-primary text-center" onClick={exercciseHandler} style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)", width:"100%", padding: "0px 0px !important"}}>ADD</button>
                        </div>
                    </Modal.Footer>
                </Modal>
          
                <div className="container">
                    <div className='row'>
                        <div className="col-8 offset-0 col-md-4 offset-md-3 col-lg-3 offset-lg-3 col-xl-3  offset-xl-2 card">
                            <label style={{color:background_color}} >Patient Name: John</label>
                            <label style={{color:background_color}} >Diagnosis: </label>
                            <label style={{color:background_color}} >Date: Jan 2, 2020</label>
                            
                        </div>
                    </div>
                    <div className="row">            
                        <div className="col-12 offset-0 col-sm-6 offset-sm-0 col-md-4 offset-md-4 col-lg-3 offset-lg-6 col-xl-2 offset-xl-8 dropdown">
                            <select className="btn btn-primary dropdown-toggle" type="button" style={{width:"100%", backgroundColor:background_color}} onChange={loadTemplates}>
                                <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Template Type</option>   
                                    {
                                    exerciseTemplateType.map( (extemptype, index) => {
                                        return <option key = {index} value={extemptype} style={{backgroundColor:"white", color:"black"}}>{extemptype}</option>
                                        })
                                    } 
                            </select>
                        </div>
                        
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 dropdown">
                            <select className="col-12 btn btn-primary dropdown-toggle" type="button" style={{width:"100%", backgroundColor:background_color}} onChange={loadExerciseTypes}>
                                <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Templates</option>   
                                    {
                                    exerciseTemplates.map( (extemptype, index) => {
                                        return <option key = {index} value={extemptype} style={{backgroundColor:"white", color:"black"}}>{extemptype}</option>
                                        })
                                    } 
                            </select>
                        </div>
                    </div>

                    <div className="row top-buffer">        
                        <div className="col-12 offset-0 col-md-9 offset-md-3 col-lg-9 offset-lg-3 col-xl-10  offset-xl-2 card">
                            <div className="card-body float-left">                           
                                <div className="row">
                                    <div className="col-10 offset-2 col-sm-7 offset-sm-5 col-md-5 offset-md-7 col-lg-4 offset-lg-8 col-xl-3 offset-xl-9 dropdown">
                                        <select className="btn btn-primary dropdown-toggle" id="exerciseType" type="button" style={{width:"100%", backgroundColor:background_color}} onChange={selectExercisesHandler}>
                                            <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Exercise Types</option>   
                                            {
                                            exerciseTypes.map( (extemptype, index) => {
                                                return <option key = {index} value={extemptype} style={{backgroundColor:"white", color:"black"}}>{extemptype}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 card">  
                                        <div className="row">
                                            <div className="col-12">
                                            <center>
                                            <label style={{color:background_color, fontSize:"25px"}}>Exercises</label>                                 
                                            </center>
                                            </div>
                                        </div>   
                                        {/* No exercise added */}
                                        {exerciseData.map( ({type, subtype}, index) =>  (<div key={"outer"+index} className="card" style={{textAlign:"left"}}>
                                                            <div key={"type"+index} style={{backgroundColor:"white", color:background_color, fontSize:"20px", fontWeight:"bold"}}>{type}</div>
                                                            {subtype.map( (sub_type, i) => <div key={"inner"+i}>
                                                                    <div key={"subtype"+i} className="col-3 card" style={{backgroundColor:"white", color:"black", marginLeft:"10px", float:"left", height:"35px", padding:"5px", width:"200px"}}>{sub_type}</div>
                                                                    <div key={"input"+i} className="col-3 form-group" style={{float:"left", marginLeft:"5px" }}><input className="form-control" style={{height:"35px", width:"70px"}} type="text" name="value" placeholder="value" onChange = {onValueChange} /></div>
                                                                    <div key={"date"+i} className="col-3 card" style={{backgroundColor:"white", color:"black", marginLeft:"5px", float:"left", height:"35px", padding:"5px", width:"100px"}}>{todate}</div>
                                                                    <div key={"remove"+i} className="col-3 card" style={{backgroundColor:"white", color:"black", marginLeft:"5px", float:"left", height:"35px"}}><button style={{backgroundColor:"white", color:background_color,height:"35px"}} onClick={() => removeElementHandler(type, sub_type)}>Remove</button></div>
                                                                </div>
                                                            )}
                                                            </div>)   
                                                        )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

           </div>

}
export default Exercise;
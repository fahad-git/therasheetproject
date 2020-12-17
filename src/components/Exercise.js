import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {Modal} from 'react-bootstrap';


import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/Admin.css';


function Exercise(props){

    const history = useHistory();
    const background_color = "rgba(4, 13, 43, 0.8)";

    var today = new Date();
    var todate = String(today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear());

    let exerciseTemplateTypea = ["Upper body", "Lower body", "Back/Core"]
    let exerciseTemplatesa = ["Template 1", "Template 2", "Template 3"];
    let exerciseTypesa = ["Cardio Equipment", "Table Exercise", "Balance Exercise", "Stretching"];
    const forceUpdate = useForceUpdate();

    var [exerciseTemplateType, setExerciseTemplateType] = useState(exerciseTemplateTypea);
    var [exerciseTemplates, setExerciseTemplates] = useState(exerciseTemplatesa);
    var [exerciseTypes, setExerciseTypes] = useState(exerciseTypesa);
    var [exerciseSubTypes, setExerciseSubTypes] = useState([]);
    var [exerciseData, setExerciseData] = useState([]);

    var [isExerciseModalOpen, exerciseModalToggle] = useState(false);
 
    const loadTemplates = (event) => {
        document.getElementById('exerciseType').selectedIndex = 0;        
        let tmp = [];
        switch(event.target.value){
            case "Upper body":
                tmp = ["Cardio Equipment", "Table Exercise"];
                // setExerciseTemplates(tmp);
                setExerciseTypes(tmp);
            break;
            case "Lower body":
                tmp = ["Balance Exercise", "Stretching"];
                // setExerciseTemplates(tmp);
                setExerciseTypes(tmp);
            break;
            case "Back/Core":
                tmp = ["Cardio Equipment", "Table Exercise", "Balance Exercise", "Stretching"];
                // setExerciseTemplates(tmp);
                setExerciseTypes(tmp);
            break;
            default:
                tmp = [""];
                // setExerciseTemplates(tmp);
                setExerciseTypes(tmp);
            break;
        }

    }

    const loadExerciseTypes = (event) => {
       
        let tmp = [];
        let obj = {}

        switch(event.target.value){
            case "U Temp 1":

                obj = {
                    "supertype": "Upper Body",
                    "subtype":[{
                        "type": "Cardio Equipment",
                        "exercises": ["Upright Bike", "Rec Bike", "Treadmil"]
                        }]
                    }
                setExerciseData([obj]);

                // tmp = ["Cardio Equipment", "Table Exercise"];
                // setExerciseTypes(tmp);
            break;
            case "U Temp 2":
                obj = {
                    "supertype": "Upper Body",
                    "subtype":[
                        {
                        "type": "Table Exercise",
                        "exercises": ["SLR-Flex", "SLR-AB", "SLR-EXT", "SLR-ADD", "Quard", "HS Set"]
                        },
                        {
                            "type": "Cardio Equipment",
                            "exercises": ["Upright Bike", "Rec Bike", "Treadmil"]
                        }
                        ]
                    }
                setExerciseData([obj]);

                // tmp = ["Cardio Equipment", "Table Exercise", "Balance Exercise"];
                // setExerciseTypes(tmp);
            break;
            case "U Temp 3":

                obj = {
                    "supertype": "Upper Body",
                    "subtype":[
                        {
                        "type": "Stretching",
                        "exercises": ["Hamstring-Strap", "Hamstring-Fig 4", "Hamstring-Stand", "Quard-Strap", "Quard-Stand"]
                        },
                        {
                            "type": "Table Exercise",
                            "exercises": ["SLR-Flex", "SLR-AB", "SLR-EXT", "SLR-ADD", "Quard", "HS Set"]
                        },
                        {
                            "type": "Cardio Equipment",
                            "exercises": ["Upright Bike", "Rec Bike", "Treadmil"]
                        }
                        ]
                    }
                setExerciseData([obj]);

                // tmp = ["Cardio Equipment", "Table Exercise", "Balance Exercise", "Stretching"];
                // setExerciseTypes(tmp);
            break;
            case "U Temp 4":

                obj = {
                    "supertype": "Upper Body",
                    "subtype":[
                        {
                        "type": "Stretching",
                        "exercises": ["Hamstring-Strap", "Hamstring-Fig 4", "Hamstring-Stand", "Quard-Strap", "Quard-Stand"]
                        },
                        {
                            "type": "Table Exercise",
                            "exercises": ["SLR-Flex", "SLR-AB", "SLR-EXT", "SLR-ADD", "Quard", "HS Set"]
                        },
                        {
                            "type": "Balance Exercise",
                            "exercises": ["Rhomberg-1/2","Rhomberg-Full", "Rhomberg-ECO", "EC", "Foam"]
                        }
                        ]
                    }
                    setExerciseData([obj]);
                // tmp = [ "Table Exercise", "Stretching"];
                // setExerciseTypes(tmp);
            break;

            case "L Temp 1":

                obj = {
                    "supertype": "Lower Body",
                    "subtype":[
                        {
                        "type": "Stretching",
                        "exercises": [ "Hamstring-Fig 4", "Hamstring-Stand","Quard-Stand"]
                        },                        
                        {
                            "type": "Balance Exercise",
                            "exercises": ["Rhomberg-Full", "Rhomberg-ECO", "EC", "Foam"]
                        }
                        ]
                    }
                    setExerciseData([obj]);
                // tmp = [ "Table Exercise", "Stretching"];
                // setExerciseTypes(tmp);
            break;
            default:

                setExerciseData([]);
                // tmp = [""];
                // setExerciseTypes(tmp);
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
        
        let superType = document.getElementById('exercisetypes').value;
        let subType = document.getElementById('exerciseType').value
        let exercises = []
        var checkboxes = document.getElementsByName('exerciseSubType');
        for (var checkbox of checkboxes) {
          if (checkbox.checked)
            exercises.push(checkbox.value)
            // console.log(checkbox.value + ' ');
        }

        if(exerciseData.length == 0 ){
            console.log("Welcome")
            let obj = {
                        "supertype": superType,
                        "subtype": [
                            {
                            "type": subType,
                            "exercises": exercises
                            }
                        ]
                    }
                    // alert("working")
            setExerciseData([obj]);
            console.log(subType);
            console.log("len: "+exerciseData.length);
            console.log(exerciseData);
            exerciseModalToggle(false);
            return;
        }

        let isNewSuperType = true;
        let isNewSubType = true;

        for(let i=0; i < exerciseData.length; i++){
            if(exerciseData[i]["supertype"] === superType){
                isNewSuperType = false;
                for(let j=0; j < exerciseData[i]["subtype"].length; j++){
                    if(exerciseData[i]["subtype"][j]["type"] === subType){
                        isNewSubType = false;

                        var already = exerciseData[i]["subtype"][j]["exercises"]
                        exerciseData[i]["subtype"][j]["exercises"] = [...new Set([...already, ...exercises])];
                        setExerciseData(exerciseData);
                        // if(exerciseData[i]["subtype"][j]["exercises"].indexOf(subType) === -1){
                        //     exerciseData[i]["subtype"][j]["exercises"].push(subexty.value);
                        //     console.log("ex: "+exerciseData)
                        //     this.setState({"exerciseData":exerciseData});
                        //     return;
                        // }else{return;}                    
                    }
                }
            }
        }

        if(isNewSuperType === true){
            let obj ={
                    "supertype": superType,
                    "subtype": [
                        {
                        "type": subType,
                        "exercises": exercises
                        }
                    ]
                }
            
            exerciseData.push(obj);
            setExerciseData(exerciseData);
            exerciseModalToggle(false);
            return;
        }

        
        if(isNewSubType === true){
            for(let i=0; i < exerciseData.length; i++){
                if(exerciseData[i]["supertype"] === superType){
                    
                    let obj = {
                        "type": subType,
                        "exercises": exercises
                        }
                    exerciseData[i]["subtype"].push(obj);
                    setExerciseData(exerciseData);                                
                
                    exerciseModalToggle(false);
                    return;
                }
            }
        }


        console.log(subType);
        console.log("len: "+exerciseData.length);
        console.log(exerciseData);
        exerciseModalToggle(false);
    }

    const onValueChange = () => {
        alert("working")
    }

    const removeElementHandler = (supertype, typename, subtypename) => {
        // alert("working: " +supertype + "  "+ typename + "  " +subtypename);
        // console.log(JSON.stringify(existing_data));
        let index = -1;

        // alert(typename+" "+subtypename)
        for(let i=0; i < exerciseData.length; i++){
            if(exerciseData[i]["supertype"] === supertype){
                for(let j=0; j < exerciseData[i]["subtype"].length; j++){
                    if(exerciseData[i]["subtype"][j]["type"] === typename){
                        index = exerciseData[i]["subtype"][j]["exercises"].indexOf(subtypename); 
                        console.log(exerciseData[i]["subtype"][j]["exercises"].splice(index,1));
                        if(exerciseData[i]["subtype"][j]["exercises"].length == 0)
                            exerciseData[i]["subtype"].splice(j, 1)
                        console.log(JSON.stringify(exerciseData));
                    }
                }
            }
            if(exerciseData[i]["subtype"].length == 0)
            exerciseData.splice(i, 1);
        }
        setExerciseData(exerciseData);
        document.getElementById("exercisetypes").selectedIndex = 0;
        document.getElementById("exerciseType").selectedIndex = 0;
        forceUpdate();
    }

    const goBackHandler = () => {
        history.goBack();
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
                        <div className="row">
                            <button className="col-8 offset-0 col-md-4 offset-md-3 col-lg-3 offset-lg-3 col-xl-3  offset-xl-2 card btn btn-primary text-center" style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)"}}  onClick={goBackHandler}><i className="ion-android-arrow-back"> Back</i></button>
                        </div>
                    <div className='row'>
                        <div className="col-8 offset-0 col-md-4 offset-md-3 col-lg-3 offset-lg-3 col-xl-3  offset-xl-2 card">
                            <label style={{color:background_color}} >Patient Name: John</label>
                            <label style={{color:background_color}} >Diagnosis: </label>
                            <label style={{color:background_color}} >Date: Jan 2, 2020</label>
                            
                        </div>
                    </div>
                    <div className="row">            
                        <div className="col-12 offset-0 col-sm-6 offset-sm-0 col-md-4 offset-md-4 col-lg-3 offset-lg-6 col-xl-2 offset-xl-8 dropdown">
                            {/* <select className="btn btn-primary dropdown-toggle" type="button" style={{width:"100%", backgroundColor:background_color}} onChange={loadTemplates}>
                                <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Template Type</option>   
                                    {
                                    exerciseTemplateType.map( (extemptype, index) => {
                                        return <option key = {index} value={extemptype} style={{backgroundColor:"white", color:"black"}}>{extemptype}</option>
                                        })
                                    } 
                            </select> */}
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

                                    <div className="col-12 offset-0 col-sm-6 offset-sm-0 col-md-5 offset-md-2 col-lg-4 offset-lg-4 col-xl-3 offset-xl-6 dropdown">
                                        <select className="btn btn-primary dropdown-toggle" id="exercisetypes" type="button" style={{width:"100%", backgroundColor:background_color}} onChange={loadTemplates}>
                                            <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Exercise Types</option>   
                                                {
                                                exerciseTemplateType.map( (extemptype, index) => {
                                                    return <option key = {index} value={extemptype} style={{backgroundColor:"white", color:"black"}}>{extemptype}</option>
                                                    })
                                                } 
                                        </select>
                                    </div>


                                    {/* <div className="col-10 offset-2 col-sm-7 offset-sm-5 col-md-5 offset-md-7 col-lg-4 offset-lg-8 col-xl-3 offset-xl-9 dropdown"> */}
                                    <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 dropdown">
                                        <select className="btn btn-primary dropdown-toggle" id="exerciseType" type="button" style={{width:"100%", backgroundColor:background_color}} onChange={selectExercisesHandler}>
                                            <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Exercises</option>   
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
                                        {
                                        // exerciseData.map( ({type, subtype}, index) =>  (<div key={"outer"+index} className="card" style={{textAlign:"left"}}>
                                        //                     <div key={"type"+index} style={{backgroundColor:"white", color:background_color, fontSize:"20px", fontWeight:"bold"}}>{type}</div>
                                        //                     {/* this is adding subtypes */}
                                        //                     {subtype.map( (sub_type, i) => <div key={"inner"+i}>
                                        //                             <div key={"subtype"+i} className="col-3 card" style={{backgroundColor:"white", color:"black", marginLeft:"10px", float:"left", height:"35px", padding:"5px", width:"200px"}}>{sub_type}</div>
                                        //                             <div key={"input"+i} className="col-3 form-group" style={{float:"left", marginLeft:"5px" }}><input className="form-control" style={{height:"35px", width:"70px"}} type="text" name="value" placeholder="value" onChange = {onValueChange} /></div>
                                        //                             <div key={"date"+i} className="col-3 card" style={{backgroundColor:"white", color:"black", marginLeft:"5px", float:"left", height:"35px", padding:"5px", width:"100px"}}>{todate}</div>
                                        //                             <div key={"remove"+i} className="col-3 card" style={{backgroundColor:"white", color:"black", marginLeft:"5px", float:"left", height:"35px"}}><button style={{backgroundColor:"white", color:background_color,height:"35px"}} onClick={() => removeElementHandler(type, sub_type)}>Remove</button></div>
                                        //                         </div>
                                        //                     )}
                                        //                     </div>)   
                                        //                 )
                                        }

                                        {/* All exercises */}

                                        {exerciseData.map( ({supertype, subtype}, index) =>  (<div key={"outer"+index}  style={{textAlign:"left"}}>
                                            <div key={"supertype"+index} style={{backgroundColor:"white", color:background_color, fontSize:"24px", fontWeight:"bold", marginBottom:"10px", marginTop:"10px"}}>{supertype}</div>
                                            {/* this is adding subtypes */}
                                            
                                            {subtype.map( ({type, exercises}, index) =>  (<div key={"outer"+index}  style={{textAlign:"left", marginTop:"10px"}}>
                                                <div key={"type"+index} style={{backgroundColor:"white", color:background_color, fontSize:"18px", fontWeight:"bold"}}>{type}</div>
                                                {/* this is adding subtypes */}
                                                
                                                {exercises.map( (sub_type, i) => <div key={"inner"+i} className="row">
                                                        {/* <div key={"exercises"+i} className="col-3 card" style={{backgroundColor:"white", color:"black", marginLeft:"10px", float:"left", height:"35px", padding:"5px", width:"200px"}}>{sub_type}</div>
                                                        <div key={"input"+i} className="col-3 form-group" style={{float:"left", marginLeft:"5px" }}><input className="form-control" style={{height:"35px", width:"70px"}} type="text" name="value" placeholder="value" onChange = {onValueChange} /></div>
                                                        <div key={"date"+i} className="col-3 card" style={{backgroundColor:"white", color:"black", marginLeft:"5px", float:"left", height:"35px", padding:"5px", width:"100px"}}>{todate}</div>
                                                        <div key={"remove"+i} className="col-3 card" style={{backgroundColor:"white", color:"black", marginLeft:"5px", float:"left", height:"35px"}}><button style={{backgroundColor:"white", color:background_color,height:"35px"}} onClick={() => removeElementHandler(type, sub_type)}>Remove</button></div> */}
                                                            <hr style={{width:"100%", color:"black", backgroundColor:"black", padding:"0px !important", margin:"0px !important", height:"0px !important"}}/>
 
                                                            <div key={"exercises"+i} className="col-6 col-md-3 " style={{backgroundColor:"white", color:"black", height:"35px", lineHeight: "35px", textAlign:"center", fontSize:"2.5vmin"}}>{sub_type}</div>
                                                            <div key={"input"+i} className="col-6 col-md-3 form-group" ><input className="form-control" style={{height:"35px", lineHeight: "35px", fontSize:"2.5vmin"}} type="text" name="value" placeholder="value" onChange = {onValueChange} /></div>
                                                            <div key={"date"+i} className="col-6 col-md-3 " style={{backgroundColor:"white", color:"black", height:"35px", lineHeight: "35px", textAlign:"center", fontSize:"2.5vmin"}}>{todate}</div>
                                                            <div key={"remove"+i} className="col-6 col-md-3" style={{backgroundColor:"white", color:"black", height:"35px", lineHeight: "35px", textAlign:"center"}}><button style={{backgroundColor:"white", color:background_color, height:"35px", width:"100%"}} onClick={() => removeElementHandler(supertype, type, sub_type)}>Remove</button></div>  
                                                    </div>
                                                )}
                                            </div>)   
                                        )}
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

           </div>

}

//create your forceUpdate hook
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}
export default Exercise;
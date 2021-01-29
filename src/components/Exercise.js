import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {Modal} from 'react-bootstrap';

import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/Admin.css';

import getAllTemplates from "../services/clinician.service";
import getAllExercises from "../services/clinician.service";
import addPatientExercise from "../services/clinician.service";
import getPatientExerciseByDate from "../services/clinician.service";

function Exercise(){

    const exerciseParamData = JSON.parse(localStorage.getItem("exerciseDataForPatient"));
    // console.log("Data: ", exerciseParamData);
    const ID = exerciseParamData.id;
    const patientName = exerciseParamData.patientName;
    const diagnosis = exerciseParamData.diagnosis
    const date = exerciseParamData.date;

    // var [exerciseStatus, setExerciseStatus] = useState(String(props.location.state.exerciseStatus) );

    const history = useHistory();
    const background_color = "rgba(4, 13, 43, 0.8)";

    var today = new Date();
    var todate = String(today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear());

    // let exerciseSuperTypea = ["Upper body", "Lower body", "Back/Core"]
    // let exerciseTemplatesa = ["Template 1", "Template 2", "Template 3"];
    // let exerciseTypesa = ["Cardio Equipment", "Table Exercise", "Balance Exercise", "Stretching"];
    const forceUpdate = useForceUpdate();

    //this contains all exercises
    var [exerciseAllData, setExerciseAllData] = useState([]);
    //this contains all exercises
    var [exerciseTemplates, setExerciseTemplates] = useState([]);
    //this contains sub types
    var [exerciseTypes, setExerciseTypes] = useState([]);
    //this contains exercises
    var [exerciseSubTypes, setExerciseSubTypes] = useState([]); 
    //this contains exercise object for showing user
    var [userSelectedExercises, setUserSelectedExercises] = useState([]);

    var [isExerciseModalOpen, exerciseModalToggle] = useState(false);

    var [exerciseValues, setExerciseValues] = useState({});

    // useEffect(()=>{
    //     getAllTemplates.getAllTemplates()
    //     .then((response) => {
    //         console.log("templates");
    //         console.log(response.data);
    //         setExerciseTemplates(response.data)
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // },[]);


    useEffect(()=>{
        getAllExercises.getAllExercises()
        .then((response) => {
            console.log("Exercises:");
            console.log(response.data);
            setExerciseAllData(response.data);
           
        }).catch((err) => console.log(err));

        getAllTemplates.getAllTemplates()
        .then((response) => {
            console.log("templates");
            console.log(response.data);
            setExerciseTemplates(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const loadTemplatesHandler = (event) => {
        // return;
        let templateId = parseInt(event.target.value);
        console.log("ID: " + templateId);
        if("NaN" === String(templateId) ){
            setUserSelectedExercises([])
            return;
        }
        // Here API will be called for all exercises        
        let exerciseTemplateObject = null;
        // getting all exercise ids
        for(let obj of exerciseTemplates)
            if(obj["templateId"] === templateId){
                exerciseTemplateObject = JSON.parse(JSON.stringify(obj["exerciseTemplates"]));
                break;
            }

        let exercisesBelongsToTemplate = [];
        for(let superTypeObj of exerciseAllData){
            let subTypesForSuperType = []
            for(let subTypeObj of superTypeObj["exerciseSubTypes"]){
                let exerciseNames = [];
                for(let exerciseObj of subTypeObj["exercise"]){
                    let exerciseId = exerciseObj["exerciseId"];
                    for(let object of exerciseTemplateObject){
                        let exerciseID = object["exerciseId"];
                        if(exerciseId == exerciseID){
                            let temporaryExerciseObj = JSON.parse(JSON.stringify(exerciseObj))
                            exerciseNames.push(temporaryExerciseObj);
                            break;
                        }
                    }
                }
                if(exerciseNames.length > 0){
                    // let obj = {
                    //     "subTypeName":subTypeObj["subTypeName"],
                    //     "exercise":exerciseNames
                    // }
                    let tmporarySubTypeObj = JSON.parse(JSON.stringify(subTypeObj));
                    // subTypeObj["exercise"] = exerciseNames;
                    tmporarySubTypeObj["exercise"] = exerciseNames;
                    subTypesForSuperType.push(tmporarySubTypeObj)
                }
            }
            if(subTypesForSuperType.length > 0){
                // let obj = {
                //     "supertype":superTypeObj["supTypeName"],
                //     "subtype":subTypesForSuperType
                // }
                let temporarySuperTypeObj = JSON.parse(JSON.stringify(superTypeObj));
                temporarySuperTypeObj["exerciseSubTypes"] = subTypesForSuperType;
                // superTypeObj["exerciseSubTypes"] = subTypesForSuperType;
                exercisesBelongsToTemplate.push(temporarySuperTypeObj)
            }
        }
        console.log("Updates User Selected Object")
        console.log(exercisesBelongsToTemplate);
        // here is logic to manage intersection of objects
        setUserSelectedExercises(exercisesBelongsToTemplate);

        document.getElementById("exercisetypes").selectedIndex = 0;
    }

    const loadExerciseTypes = (event) => {
        let superTypId = parseInt(event.target.value);
        if("NaN" === String(superTypId) )
            return;
        for(let superObject of exerciseAllData)
            if(superObject["exSupId"] === superTypId){
                let newObject = JSON.parse(JSON.stringify(superObject["exerciseSubTypes"]))
                setExerciseTypes(newObject);
                break;
            }
        
        document.getElementById("exerciseType").selectedIndex = 0;
    }

    const selectExercisesHandler = (event) => {
        let subTypId = parseInt(event.target.value);
        if("NaN" === String(subTypId) )
            return;
        console.log("Ex Data")
        console.log(exerciseAllData);
        for(let subObject of exerciseTypes)
            if(subObject["exSubId"] === subTypId){
                let newObject = JSON.parse(JSON.stringify(subObject["exercise"]));
                setExerciseSubTypes(newObject);
                break;
            }
        exerciseModalToggle(true);
    }

    const exerciseHandler = () => {
        
        let superType = document.getElementById('exercisetypes').value;
        let subType = document.getElementById('exerciseType').value
        let exercises = []
        var checkboxes = document.getElementsByName('exerciseSubType');
        for (var checkbox of checkboxes) {
          if (checkbox.checked)
            exercises.push(parseInt(checkbox.value));
            // console.log(checkbox.value + ' ');
        }

        let exercisesBelongsToTemplate = [];
        for(let superTypeObj of exerciseAllData){
            let subTypesForSuperType = []
            for(let subTypeObj of superTypeObj["exerciseSubTypes"]){
                let exerciseNames = [];
                for(let exerciseObj of subTypeObj["exercise"]){
                    let exerciseId = exerciseObj["exerciseId"];
                    for(let exerciseID of exercises){
                        if(exerciseId == exerciseID){
                            let temporaryExerciseObj = JSON.parse(JSON.stringify(exerciseObj))
                            exerciseNames.push(temporaryExerciseObj);
                            break;
                        }
                    }
                }
                if(exerciseNames.length > 0){
                    let temporarySuperTypeObj = JSON.parse(JSON.stringify(subTypeObj));
                    temporarySuperTypeObj["exercise"] = exerciseNames;
                    // subTypeObj["exercise"] = exerciseNames;
                    subTypesForSuperType.push(temporarySuperTypeObj)
                }
            }
            if(subTypesForSuperType.length > 0){
                let temporarySuperTypeObj = JSON.parse(JSON.stringify(superTypeObj));
                temporarySuperTypeObj["exerciseSubTypes"] = subTypesForSuperType;
                // superTypeObj["exerciseSubTypes"] = subTypesForSuperType;
                exercisesBelongsToTemplate.push(temporarySuperTypeObj)
            }
        }

        // return;


        let superID = exercisesBelongsToTemplate[0]["exerciseSubTypes"][0]["exSupId"];
        let subID = exercisesBelongsToTemplate[0]["exerciseSubTypes"][0]["exSubId"];


        let isNewObject = true;
        let isNewSuperType = true;
        for(let i in userSelectedExercises)
        {
            isNewObject = false;
            for(let j in userSelectedExercises[i]["exerciseSubTypes"])
            {
                if(userSelectedExercises[i]["exerciseSubTypes"][j]["exSupId"] == superID
                    && userSelectedExercises[i]["exerciseSubTypes"][j]["exSubId"] == subID) 
                {
                    
                    isNewSuperType = false;
                    for(let obj of exercisesBelongsToTemplate[0]["exerciseSubTypes"][0]["exercise"])
                    {
                        let exID = obj["exerciseId"]
                        let isNewExercise = true;
                        for(let k in userSelectedExercises[i]["exerciseSubTypes"][j]["exercise"])
                        {
                            let exRealID = userSelectedExercises[i]["exerciseSubTypes"][j]["exercise"][k]["exerciseId"];
                            if(exRealID === exID)
                            {
                                isNewExercise = false;   
                                break;
                            }
                        }

                        if(isNewExercise)
                            userSelectedExercises[i]["exerciseSubTypes"][j]["exercise"].push(obj);                    
                    }
                }
                else if(userSelectedExercises[i]["exerciseSubTypes"][j]["exSupId"] == superID){
                    userSelectedExercises[i]["exerciseSubTypes"].push(exercisesBelongsToTemplate[0]["exerciseSubTypes"][0]);
                    isNewSuperType = false;
                }
            }
            // userSelectedExercises.push(exercisesBelongsToTemplate[0])
        }
        if(isNewSuperType){
            userSelectedExercises.push(exercisesBelongsToTemplate[0])
        }
        //this is only for adding new object
        if(isNewObject){
            setUserSelectedExercises(exercisesBelongsToTemplate)
            exerciseModalToggle(false);
            return;
        }
                        
        setUserSelectedExercises(userSelectedExercises);
        exerciseModalToggle(false);
        forceUpdate();
    }

    const onValueChange = (id,e) => {
        // alert("working")
        // console.log(id);
        // console.log(e.target.value);
        // console.log(exerciseValues);
        exerciseValues[id] = e.target.value;
        console.log(exerciseValues)
        setExerciseValues(exerciseValues);
    }

    const removeElementHandler = (superTypeID, subTypeID, exerciseID) => {
        console.log("All ex:")
        console.log(superTypeID + " : " + subTypeID + " : " + exerciseID);
        console.log(userSelectedExercises);
        console.log(exerciseAllData);
        
        for(let i in userSelectedExercises)
        {
            for(let j in userSelectedExercises[i]["exerciseSubTypes"]){
                if(userSelectedExercises[i]["exerciseSubTypes"][j]["exSupId"] == superTypeID
                    && userSelectedExercises[i]["exerciseSubTypes"][j]["exSubId"] == subTypeID) 
                {
                    for(let k in userSelectedExercises[i]["exerciseSubTypes"][j]["exercise"]){
                        if(userSelectedExercises[i]["exerciseSubTypes"][j]["exercise"][k]["exerciseId"] == exerciseID)
                            userSelectedExercises[i]["exerciseSubTypes"][j]["exercise"].splice(k, 1);
                    }
                }
                if(userSelectedExercises[i]["exerciseSubTypes"][j]["exercise"].length === 0){
                    userSelectedExercises[i]["exerciseSubTypes"].splice(j, 1);
                }
            }
            if(userSelectedExercises[i]["exerciseSubTypes"].length === 0){
                userSelectedExercises.splice(i, 1);
            }           
        }
        setUserSelectedExercises(userSelectedExercises);
        forceUpdate();
    }

    const goBackHandler = () => {
        history.goBack();
        // console.log(ID);

        // let today = new Date("2021-01-16")
        // let d = String(today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate());
        // console.log(d);
        // // return;

        // getPatientExerciseByDate.getPatientExerciseByDate(ID, d)
        // .then(response => {
        //     console.log(response.data);
        // }).catch(err => console.log(err));
    }

    const goCheckoutHandler = () => {



         //date value pId exId cId */
        const user = JSON.parse(localStorage.getItem("user"));
        let data = [{
            "date":"2020-01-12",
            "value":"10 * 3",
            "patientId":ID,
            "exerciseId":1,
            "clinicianId":user.id
        },{
            "date":"2020-01-12",
            "value":"5",
            "patientId":ID,
            "exerciseId":4,
            "clinicianId":user.id
        }
    ]

    let exerciseIds = [];
    for(let superObj of userSelectedExercises)
        for(let subObj of superObj["exerciseSubTypes"])
            for(let exercises of subObj["exercise"])
                exerciseIds.push(exercises["exerciseId"])


    console.log(exerciseIds);
    // console.log("Sending data");
    // addPatientExercise.addPatientExercise(data)
    // .then(response => {
    //     console.log(response.data);
    //     history.push("/clinician");
    // }).catch(err => {
    //     console.log(err);
    // });
   
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
                                exerciseSubTypes.map( ({exerciseId, name} , index) => {
                                    return      <div key = {"outer-" + index} className="form-control"> 
                                                    <input className="col-2" key = {"exercise-sub-" + index} name="exerciseSubType" value={exerciseId} type = "checkbox" style={{backgroundColor:"white", color:"black"}}/>
                                                    <label key = {"exercise-sub-label-" + index}  className="col-auto" >{name}</label>
                                                </div>
                                           
                                    })
                            } 
                            </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="col-4" style={{padding: "0px 10px"}}>
                            <button className="btn btn-primary text-center" onClick={exerciseHandler} style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)", width:"100%", padding: "0px 0px !important"}}>ADD</button>
                        </div>
                    </Modal.Footer>
                </Modal>
                            
                <div className="container">
                        <div className="row">
                                <button className="col-8 offset-0 col-md-4 offset-md-3 col-lg-3 offset-lg-3 col-xl-3 offset-xl-2 card btn btn-primary" style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)", display:"flex", flexDirection:"row"}}><i style={{flex:"1", textAlign:"left", padding:"0px 3px"}} className="ion-android-arrow-back" onClick={goBackHandler}> Back</i> <i style={{flex:"1", textAlign:"right", padding:"0px 3px"}} onClick={goCheckoutHandler}>Checkout</i> <i onClick={goCheckoutHandler} className="ion-android-arrow-forward"></i></button>
                                {/* <button className="col-4 offset-0 col-md-2 offset-md-3 col-lg-2 offset-lg-3 col-xl-1 offset-xl-2 card btn btn-primary text-center" style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)"}}  onClick={goBackHandler}><i className="ion-android-arrow-back"> Back</i></button>
                                <button className="col-4 col-md-2 col-lg-2 col-xl-2 card btn btn-primary" style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)", display:"flex", flexDirection:"row"}}  onClick={goBackHandler}> <i style={{flex:"1", textAlign:"right", padding:"0px 3px"}}>Checkout</i> <i className="ion-android-arrow-forward"></i></button> */}
                        </div>
                    <div className='row'>
                        <div className="col-8 offset-0 col-md-4 offset-md-3 col-lg-3 offset-lg-3 col-xl-3 offset-xl-2 card">
                            <label style={{color:background_color}} >Patient Name: {patientName}</label>
                            <label style={{color:background_color}} >Diagnosis: {diagnosis} </label>
                            <label style={{color:background_color}} >Date: {date}</label>
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
                            <select className="col-12 btn btn-primary dropdown-toggle" type="button" style={{width:"100%", backgroundColor:background_color}} onChange={loadTemplatesHandler}>
                                <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Templates</option>   
                                    {
                                    exerciseTemplates.map( ({templateId, templateName}, index) => {
                                        return <option key = {"template-" + index} value={templateId} style={{backgroundColor:"white", color:"black"}}>{templateName}</option>
                                        })
                                    } 
                            </select>
                        </div>
                    </div>

                    <div className="row top-buffer">        
                        <div className="col-12 offset-0 col-md-9 offset-md-3 col-lg-9 offset-lg-3 col-xl-10  offset-xl-2 card">
                            <div className="card-body float-left">

                                    {/* Exercise Super Type Dropdown */}
                                <div className="row">
                                    <div className="col-12 offset-0 col-sm-6 offset-sm-0 col-md-5 offset-md-2 col-lg-4 offset-lg-4 col-xl-3 offset-xl-6 dropdown">
                                        <select className="btn btn-primary dropdown-toggle" id="exercisetypes" type="button" style={{width:"100%", backgroundColor:background_color}} onChange={loadExerciseTypes}>
                                            <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Exercise Types</option>   
                                                {
                                                exerciseAllData.map( ({exSupId,supTypeName}, index) => {
                                                    return <option key = {supTypeName+"-"+exSupId} value={exSupId} style={{backgroundColor:"white", color:"black"}}>{supTypeName}</option>
                                                    })
                                                }
                                        </select>
                                    </div>

                                    {/* <div className="col-10 offset-2 col-sm-7 offset-sm-5 col-md-5 offset-md-7 col-lg-4 offset-lg-8 col-xl-3 offset-xl-9 dropdown"> */}
                                    <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 dropdown">
                                        <select className="btn btn-primary dropdown-toggle" id="exerciseType" type="button" style={{width:"100%", backgroundColor:background_color}} onChange={selectExercisesHandler}>
                                            <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Exercises</option>   
                                            {
                                            exerciseTypes.map( ({exSubId, subTypeName}, index) => {
                                                return <option key = {"exercise-types-" + index} value={exSubId} style={{backgroundColor:"white", color:"black"}}>{subTypeName}</option>
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
                                        // exerciseAllData.map( ({type, subtype}, index) =>  (<div key={"outer"+index} className="card" style={{textAlign:"left"}}>
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

                                        {userSelectedExercises.map( ({exSupId, supTypeName, exerciseSubTypes}, index) =>  (<div key={"outer"+index}  style={{textAlign:"left"}}>
                                            <div key={"supertype"+index} style={{backgroundColor:"white", color:background_color, fontSize:"24px", fontWeight:"bold", marginBottom:"10px", marginTop:"10px"}}>{supTypeName}</div>
                                            {/* this is adding subtypes */}
                                            
                                            {exerciseSubTypes.map( ({exSubId, subTypeName, exercise}, index) =>  (<div key={"outer"+index}  style={{textAlign:"left", marginTop:"10px"}}>
                                                <div key={"type"+index} style={{backgroundColor:"white", color:background_color, fontSize:"18px", fontWeight:"bold"}}>{subTypeName}</div>
                                                {/* this is adding subtypes */}
                                                {exercise.map( ({exerciseId, name}, i) => <div key={"inner"+i} className="row">
                                                        {/* <div key={"exercises"+i} className="col-3 card" style={{backgroundColor:"white", color:"black", marginLeft:"10px", float:"left", height:"35px", padding:"5px", width:"200px"}}>{sub_type}</div>
                                                        <div key={"input"+i} className="col-3 form-group" style={{float:"left", marginLeft:"5px" }}><input className="form-control" style={{height:"35px", width:"70px"}} type="text" name="value" placeholder="value" onChange = {onValueChange} /></div>
                                                        <div key={"date"+i} className="col-3 card" style={{backgroundColor:"white", color:"black", marginLeft:"5px", float:"left", height:"35px", padding:"5px", width:"100px"}}>{todate}</div>
                                                        <div key={"remove"+i} className="col-3 card" style={{backgroundColor:"white", color:"black", marginLeft:"5px", float:"left", height:"35px"}}><button style={{backgroundColor:"white", color:background_color,height:"35px"}} onClick={() => removeElementHandler(type, sub_type)}>Remove</button></div> */}
                                                            <hr style={{width:"100%", color:"black", backgroundColor:"black", padding:"0px !important", margin:"0px !important", height:"0px !important"}}/>
                                                            <div key={"exercises"+i} className="col-6 col-md-3 " style={{backgroundColor:"white", color:"black", height:"35px", lineHeight: "35px", textAlign:"center", fontSize:"2.5vmin"}}>{name}</div>
                                                            <div key={"input"+i} className="col-6 col-md-3 form-group" ><input className="form-control" style={{height:"35px", lineHeight: "35px", fontSize:"2.5vmin"}} type="text" name="value" placeholder="value" onChange = {e => onValueChange(exerciseId, e)} /></div>
                                                            <div key={"date"+i} className="col-6 col-md-3 " style={{backgroundColor:"white", color:"black", height:"35px", lineHeight: "35px", textAlign:"center", fontSize:"2.5vmin"}}>{todate}</div>
                                                            <div key={"remove"+i} className="col-6 col-md-3" style={{backgroundColor:"white", color:"black", height:"35px", lineHeight: "35px", textAlign:"center"}}><button style={{backgroundColor:"white", color:background_color, height:"35px", width:"100%"}} onClick={() => removeElementHandler(exSupId, exSubId, exerciseId)}>Remove</button></div>  
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
    const [tmpValue, setTempValue] = useState(0); // integer state
    return () => setTempValue(tmpValue => ++tmpValue); // update the state to force render
}
export default Exercise;



// this is from exercise to subtypes dropdown


// let tmp = [];
// let obj = {}

// switch(event.target.value){
//     case "U Temp 1":

//         obj = {
//             "supertype": "Upper Body",
//             "subtype":[{
//                 "type": "Cardio Equipment",
//                 "exercises": ["Upright Bike", "Rec Bike", "Treadmil"]
//                 }]
//             }
//         setExerciseAllData([obj]);

//         // tmp = ["Cardio Equipment", "Table Exercise"];
//         // setExerciseTypes(tmp);
//     break;
//     case "U Temp 2":
//         obj = {
//             "supertype": "Upper Body",
//             "subtype":[
//                 {
//                 "type": "Table Exercise",
//                 "exercises": ["SLR-Flex", "SLR-AB", "SLR-EXT", "SLR-ADD", "Quard", "HS Set"]
//                 },
//                 {
//                     "type": "Cardio Equipment",
//                     "exercises": ["Upright Bike", "Rec Bike", "Treadmil"]
//                 }
//                 ]
//             }
//         setExerciseAllData([obj]);

//         // tmp = ["Cardio Equipment", "Table Exercise", "Balance Exercise"];
//         // setExerciseTypes(tmp);
//     break;
//     case "U Temp 3":

//         obj = {
//             "supertype": "Upper Body",
//             "subtype":[
//                 {
//                 "type": "Stretching",
//                 "exercises": ["Hamstring-Strap", "Hamstring-Fig 4", "Hamstring-Stand", "Quard-Strap", "Quard-Stand"]
//                 },
//                 {
//                     "type": "Table Exercise",
//                     "exercises": ["SLR-Flex", "SLR-AB", "SLR-EXT", "SLR-ADD", "Quard", "HS Set"]
//                 },
//                 {
//                     "type": "Cardio Equipment",
//                     "exercises": ["Upright Bike", "Rec Bike", "Treadmil"]
//                 }
//                 ]
//             }
//         setExerciseAllData([obj]);

//         // tmp = ["Cardio Equipment", "Table Exercise", "Balance Exercise", "Stretching"];
//         // setExerciseTypes(tmp);
//     break;
//     case "U Temp 4":

//         obj = {
//             "supertype": "Upper Body",
//             "subtype":[
//                 {
//                 "type": "Stretching",
//                 "exercises": ["Hamstring-Strap", "Hamstring-Fig 4", "Hamstring-Stand", "Quard-Strap", "Quard-Stand"]
//                 },
//                 {
//                     "type": "Table Exercise",
//                     "exercises": ["SLR-Flex", "SLR-AB", "SLR-EXT", "SLR-ADD", "Quard", "HS Set"]
//                 },
//                 {
//                     "type": "Balance Exercise",
//                     "exercises": ["Rhomberg-1/2","Rhomberg-Full", "Rhomberg-ECO", "EC", "Foam"]
//                 }
//                 ]
//             }
//             setExerciseAllData([obj]);
//         // tmp = [ "Table Exercise", "Stretching"];
//         // setExerciseTypes(tmp);
//     break;

//     case "L Temp 1":

//         obj = {
//             "supertype": "Lower Body",
//             "subtype":[
//                 {
//                 "type": "Stretching",
//                 "exercises": [ "Hamstring-Fig 4", "Hamstring-Stand","Quard-Stand"]
//                 },                        
//                 {
//                     "type": "Balance Exercise",
//                     "exercises": ["Rhomberg-Full", "Rhomberg-ECO", "EC", "Foam"]
//                 }
//                 ]
//             }
//             setExerciseAllData([obj]);
//         // tmp = [ "Table Exercise", "Stretching"];
//         // setExerciseTypes(tmp);
//     break;
//     default:

//         setExerciseAllData([]);
//         // tmp = [""];
//         // setExerciseTypes(tmp);
//     break;
// }



// const selectExercisesHandler = (event) => {
        
//     let tmp = [];
//     switch(event.target.value){
//         case "Cardio Equipment":
//             tmp = ["Upright Bike", "Rec Bike", "Treadmil"];
//             setExerciseSubTypes(tmp);
//         break;
//         case "Table Exercise":
//             tmp = ["SLR-Flex", "SLR-AB", "SLR-EXT", "SLR-ADD", "Quard", "HS Set"];
//             setExerciseSubTypes(tmp);
//         break;
//         case "Balance Exercise":
//             tmp = ["Rhomberg-1/2","Rhomberg-Full", "Rhomberg-ECO", "EC", "Foam"];
//             setExerciseSubTypes(tmp);
//         break;
//         case "Stretching":
//             tmp = ["Hamstring-Strap", "Hamstring-Fig 4", "Hamstring-Stand", "Quard-Strap", "Quard-Stand"];
//             setExerciseSubTypes(tmp);
//         break;
//         default:
//             tmp = [""];
//             setExerciseSubTypes(tmp);
//             return;
//         // break;
//     }

//     exerciseModalToggle(true);
// }





        // if(exerciseAllData.length == 0 ){
        //     console.log("Welcome")
        //     let obj = {
        //                 "supertype": superType,
        //                 "subtype": [
        //                     {
        //                     "type": subType,
        //                     "exercises": exercises
        //                     }
        //                 ]
        //             }
                    // alert("working")
            // setExerciseAllData([obj]);
            // console.log(subType);
            // console.log("len: "+exerciseAllData.length);
            // console.log(exerciseAllData);
            // exerciseModalToggle(false);
            // return;
        // }

        // let isNewSuperType = true;
        // let isNewSubType = true;

        // for(let i=0; i < exerciseAllData.length; i++){
        //     if(exerciseAllData[i]["supertype"] === superType){
        //         isNewSuperType = false;
        //         for(let j=0; j < exerciseAllData[i]["subtype"].length; j++){
        //             if(exerciseAllData[i]["subtype"][j]["type"] === subType){
        //                 isNewSubType = false;

        //                 var already = exerciseAllData[i]["subtype"][j]["exercises"]
        //                 exerciseAllData[i]["subtype"][j]["exercises"] = [...new Set([...already, ...exercises])];
        //                 setExerciseAllData(exerciseAllData);
        //                 // if(exerciseAllData[i]["subtype"][j]["exercises"].indexOf(subType) === -1){
        //                 //     exerciseAllData[i]["subtype"][j]["exercises"].push(subexty.value);
        //                 //     console.log("ex: "+exerciseAllData)
        //                 //     this.setState({"exerciseAllData":exerciseAllData});
        //                 //     return;
        //                 // }else{return;}                    
        //             }
        //         }
        //     }
        // }

        // if(isNewSuperType === true){
        //     let obj ={
        //             "supertype": superType,
        //             "subtype": [
        //                 {
        //                 "type": subType,
        //                 "exercises": exercises
        //                 }
        //             ]
        //         }
            
        //     exerciseAllData.push(obj);
        //     setExerciseAllData(exerciseAllData);
        //     exerciseModalToggle(false);
        //     return;
        // }

        
        // if(isNewSubType === true){
        //     for(let i=0; i < exerciseAllData.length; i++){
        //         if(exerciseAllData[i]["supertype"] === superType){
                    
        //             let obj = {
        //                 "type": subType,
        //                 "exercises": exercises
        //                 }
        //             exerciseAllData[i]["subtype"].push(obj);
        //             setExerciseAllData(exerciseAllData);                                
                
        //             exerciseModalToggle(false);
        //             return;
        //         }
        //     }
        // }


        // console.log(subType);
        // console.log("len: "+exerciseAllData.length);
        // console.log(exerciseAllData);
        // exerciseModalToggle(false);



        // // alert("working: " +supertype + "  "+ typename + "  " +subtypename);
        // // console.log(JSON.stringify(existing_data));
        // let index = -1;

        // // alert(typename+" "+subtypename)
        // for(let i=0; i < exerciseAllData.length; i++){
        //     if(exerciseAllData[i]["supertype"] === supertype){
        //         for(let j=0; j < exerciseAllData[i]["subtype"].length; j++){
        //             if(exerciseAllData[i]["subtype"][j]["type"] === typename){
        //                 index = exerciseAllData[i]["subtype"][j]["exercises"].indexOf(subtypename); 
        //                 console.log(exerciseAllData[i]["subtype"][j]["exercises"].splice(index,1));
        //                 if(exerciseAllData[i]["subtype"][j]["exercises"].length == 0)
        //                     exerciseAllData[i]["subtype"].splice(j, 1)
        //                 console.log(JSON.stringify(exerciseAllData));
        //             }
        //         }
        //     }
        //     if(exerciseAllData[i]["subtype"].length == 0)
        //     exerciseAllData.splice(i, 1);
        // }
        // setExerciseAllData(exerciseAllData);
        // document.getElementById("exercisetypes").selectedIndex = 0;
        // document.getElementById("exerciseType").selectedIndex = 0;
        // forceUpdate();

import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';

import {Modal} from 'react-bootstrap';

import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/Admin.css';

import getAllTemplates from '../services/director.service';
import getAllExercises from '../services/director.service';
import addExerciseInTemplate from '../services/director.service';
import addNewTemplate from '../services/director.service';
import deleteExerciseTemplate from '../services/director.service';
import deleteTemplate from '../services/director.service';


function Templates() {

    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("user"));

    var [exerciseData, setExerciseData] = useState([]);

    var [templatesData, setTemplatesData] = useState([]);
    var [templateIndexId, setTemplateIndexId] = useState(10);

    var [templateExerciseData, setTemplateExerciseData] = useState([]);

    var [templateDisplay, setTemplateDisplay] = useState(["none",""])

    var [subTypes, setSubTypes] = useState([]);
    var [exercises, setExercises] = useState([]);

    const background_color = "rgba(4, 13, 43, 0.8)";
    const forceUpdate = useForceUpdate();

    var [exSuperType, setExSuperType] = useState("");
    var [exSubType, setExSubType] = useState("");
    var [exName, setExName] = useState("");

    var [isNewTemplate, isNewTemplateToggle] = useState(false);
    var [removeBtnDisabled, setRemoveBtnDisabled] = useState(false);

    var [isRemoveConfirmOpen, removeConfirmToggle] = useState(false);
    var [showAlertBox, alertBoxToggle] = useState(false);
    var [recallTemplate, recallTemplateToggle] = useState(false);

    useEffect(()=>{
        if(!user){
            history.push("/home");
            return;
        }
        else if(user.accountType !== "director"){
            history.push("/" + user.accountType);
            return;
        }

        getAllTemplates.getAllTemplates()
        .then((response) => {
            // console.log(response.data);
            setTemplatesData(response.data)
        }).catch((err) => {
            console.log('');
        })
    },[recallTemplate]);

    useEffect(()=>{

        if(!user){
            history.push("/home");
            return;
        }
        else if(user.accountType !== "director"){
            history.push("/" + user.accountType);
            return;
        }
        
        getAllExercises.getAllExercises()
        .then((response) => {
            // console.log("Data: ");
            // console.log(response.data);
            setExerciseData(response.data);
        }).catch((err) => {
            console.log('');
        })
    },[]);

    // this method is attached with Super Type dropdown
    const superTypeHandler = (event) => {

        let superTypeId = event.target.value;
        document.getElementById("subtypeid").selectedIndex = 0;
        document.getElementById("exercisetypes").selectedIndex = 0;
 
        for(let obj of exerciseData){
            if(obj["exSupId"] == superTypeId){
                // console.log(obj["exerciseSubTypes"])
                setSubTypes(obj["exerciseSubTypes"]);

                setExSuperType(superTypeId);
                setExSubType("");
                setExName("");
                return;
            }
        }
    }
     
    // this method is attached with Sub Type dropdown
    const subTypeHandler = (event) => {

        let subTypeId = event.target.value;
        document.getElementById("exercisetypes").selectedIndex = 0;

        for(let obj of exerciseData){
            if(obj["exSupId"] == exSuperType){
                for(let subObj of obj["exerciseSubTypes"]){
                    if(subObj["exSubId"] == subTypeId)
                        setExercises(subObj["exercise"]);
                }
            }
        }
        setExSubType(subTypeId);
        setExName("");
    }

    //this method is attached with Exercise dropdown
    const exercisesHandler = (event) => {
        // alert("exercise handler");
        let exerciseId = event.target.value;
        setExName(exerciseId);
    }
   
    //this is eventHandler which updates template name while user types
    const updateTemplateName = (event) => {
        let value = event.target.value;
        setTemplateDisplay(["block", value]);
    }

    //this method adds exercises to the (ADD button click event)
    const addExerciseHandler = () => {
        // superType
        // subtype
        // exerciseName
        if(templateDisplay[1] === ""){
            // alert("Select template before adding exercises");
            alertBoxToggle(true);
            return;
        }   

        if( exSuperType === "" || exSubType === "" || exName === "")
        {
            // alert("select all values before add");
            alertBoxToggle(true);
            return;
        }
        
        if(isNewTemplate){
            addNewTemplate.addNewTemplate(templateDisplay[1].trim())
            .then(response => {
                // console.log("New Template ID: ");
                // console.log(response.data);
                setTemplateDisplay(["none", response.data]);
                addExerciseSupportingFunction(response.data);
            }).catch(err =>{
                // console.log(err)
                return;
            })
        }else 
            addExerciseSupportingFunction(templateDisplay[1]);
    
    }

    //this is supporting method for addExerciseHandler.
    // this code contains API calling for addExerciseHandler.
    const addExerciseSupportingFunction = (templateID) => {

        let insertigObject = {
            "templateId":templateID,
            "exerciseId":parseInt(exName)
        }

        // console.log(insertigObject);
        
        addExerciseInTemplate.addExerciseInTemplate(insertigObject)
        .then(response => {
            // console.log("Add Ex:")
            // console.log(response.data);
            if(response.data !== []){
                getAllTemplates.getAllTemplates()
                .then((res) => {
                    // console.log("Get Temp:")
                    // console.log(res.data);
                    setTemplatesData(res.data);
                    
                    let obj = {
                        "target": {
                            "value":response.data["templateId"]
                        }
                    }
                    setTemplateDisplay(["none",""]);
                    templateHandler(obj);
                }).catch((err) => {
                    console.log('');
                })
            }
        }).catch(err => console.log(''));

    }

    const removeExerciseHandler = () => {
        if(templateDisplay[1] === "")
        {
            alertBoxToggle(true);
            return;
        }else if(exSuperType === "" || exSubType === "" || exName === ""){
            // alert("Select exercise before remove");
            removeConfirmToggle(true);
            return;
        }

        let exerciseTemplateID = null;
        for(let i in templatesData)
            for(let j in templatesData[i]["exerciseTemplates"])
                if(templatesData[i]["exerciseTemplates"][j]["templateId"] == templateDisplay[1] 
                    && templatesData[i]["exerciseTemplates"][j]["exerciseId"] == exName)
                        exerciseTemplateID = templatesData[i]["exerciseTemplates"][j]["exerciseTemplateId"]; 
        
        if(exerciseTemplateID === null)
            return;

        // Consume individual exercise from template.
        deleteExerciseTemplate.deleteExerciseTemplate(exerciseTemplateID)
        .then(response => {
            if(response.data === "True")
            {
                document.getElementById("supertypeid").selectedIndex = 0;
                document.getElementById("subtypeid").selectedIndex = 0;
                document.getElementById("exercisetypes").selectedIndex = 0;
                setExSuperType("");
                setExSubType("");
                setExName(""); 
                window.location.reload();
            }
        })
        .catch(err => console.log(''));
    }

    const removeTemplateHandler = () => {
        // console.log("templete deleting with ID: " + templateDisplay[1]);
        deleteTemplate.deleteTemplate(templateDisplay[1])
        .then(response => {
            // console.log(response.data);
            recallTemplateToggle(!recallTemplate);            
            setTemplateExerciseData([]);
            document.getElementById("templateid").selectedIndex = 0;
            document.getElementById("supertypeid").selectedIndex = 0;
            document.getElementById("subtypeid").selectedIndex = 0;
            document.getElementById("exercisetypes").selectedIndex = 0;
            
        }).catch(err => {
            console.log('');
        });
        removeConfirmToggle(false);
        // window.location.reload(false);        
    }

    const templateHandler = (event) => {
        if(event.target.value === ""){
            setTemplateDisplay(["none", ""]);
            return;
        }
        let templateId = parseInt(event.target.value);
        // Here API will be called for all exercises
        if("NaN" === String(templateId) ) {
            setTemplateDisplay(["block", ""]);
            setTemplateExerciseData([]);
            isNewTemplateToggle(true);
            setRemoveBtnDisabled(true);
            return;
        }
        isNewTemplateToggle(false);
        setRemoveBtnDisabled(false);

        setTemplateDisplay(["none", templateId]);
        
        let exerciseTemplateObject = null;
        // getting all exercise ids
        for(let obj of templatesData)
            if(obj["templateId"] === templateId){
                exerciseTemplateObject = obj["exerciseTemplates"];
                break;
            }
        
        let exercisesBelongsToTemplate = [];
        for(let superTypeObj of exerciseData){
            let subTypesForSuperType = []
            for(let subTypeObj of superTypeObj["exerciseSubTypes"]){
                let exerciseNames = [];
                for(let exerciseObj of subTypeObj["exercise"]){
                    let exerciseId = exerciseObj["exerciseId"];
                    for(let object of exerciseTemplateObject){
                        let exerciseID = object["exerciseId"];
                        if(exerciseId == exerciseID){
                            exerciseNames.push(exerciseObj["name"]);
                            break;
                        }
                    }
                }
                if(exerciseNames.length > 0){
                    let obj = {
                        "type":subTypeObj["subTypeName"],
                        "exercises":exerciseNames
                    }
                    subTypesForSuperType.push(obj)
                }
            }
            if(subTypesForSuperType.length > 0){
                let obj = {
                    "supertype":superTypeObj["supTypeName"],
                    "subtype":subTypesForSuperType
                }
                exercisesBelongsToTemplate.push(obj)
            }
        }
        // console.log(exercisesBelongsToTemplate);
        setTemplateExerciseData(exercisesBelongsToTemplate);
        forceUpdate();
    }
    
    const addTemplate = () => {
        // templatesData[templateIndex]["template"] = //templateExerciseData;
        // console.log(JSON.stringify(templatesData));
        // setTemplatesData(templatesData);
        // console.log("addTemplate Working");
    }

    const goBackHandler = () => {
        history.goBack();
    }

    return  <div className="admin" >
            <Modal show={isRemoveConfirmOpen}
                    onHide = { () => removeConfirmToggle(false)}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:background_color}}><i className="ion-android-delete"></i>  Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="form-group">Are you sure you want to delete this template?</p>
                </Modal.Body>

                <Modal.Footer>
                    <button variant="primaryy" onClick={() => removeConfirmToggle(false)} className="btn btn-primary text-center" style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)", outline:"none", border:"none"}}>No</button>
                    <button variant="secondar" onClick = {removeTemplateHandler} className="btn btn-primary text-center" style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)", outline:"none", border:"none"}}>Yes</button>
                </Modal.Footer>
            </Modal>
            <Modal show={showAlertBox}
                    onHide = { () => alertBoxToggle(false)}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    animation = {false}
                    centered>
                <Modal.Header >
                    <Modal.Title style={{color:background_color}}><i className="ion-android-warning"></i>  Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p >Select all values first!</p>
                </Modal.Body>

                <Modal.Footer>
                    <button variant="primary" onClick={ () => alertBoxToggle(false) } className="btn btn-primary text-center" style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)", outline:"none", border:"none"}}>OK</button>
                </Modal.Footer>
            </Modal>
                <div className="container">
                    <div className="row">        
                        <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-9 offset-lg-3 col-xl-10  offset-xl-2 card" style={{minHeight:"88vh"}}>
                            <div className="card-body">
                                        {/* back button */}
                                        <div className="row">
                                            <button className="col-2 offset-1 col-sm-3 offset-sm-0 col-md-1 offset-md-0 col-lg-1 offset-lg-0 col-xl-1 offset-xl-0 btn btn-primary text-center" style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)"}}  onClick={goBackHandler}><i className="ion-android-arrow-back"></i></button>
                                        </div>

                                <div className="row justify-content-center" >

                                    <div className="col-12 order-2 col-sm-6 order-sm-1">
                                        
                                    {templateExerciseData.map( ({supertype, subtype}, index) =>  (<div key={"outer"+index}  style={{textAlign:"left", marginTop:"40px"}}>
                                            <div key={"supertype"+index} style={{backgroundColor:"white", color:background_color, fontSize:"24px", fontWeight:"bold", marginBottom:"10px", marginTop:"10px"}}>{supertype}</div>
                                            {/* this is adding subtypes */}
                                            <hr style={{width:"100%", color:"black", backgroundColor:"black", padding:"0px 0px !important", margin:"0px 0px !important", height:"0px !important"}}/>

                                            {subtype.map( ({type, exercises}, index) =>  (<div key={"outer"+index}  style={{textAlign:"left", marginTop:"10px"}}>
                                                <div key={"type"+index} style={{backgroundColor:"white", color:background_color, fontSize:"18px", fontWeight:"bold", textDecorationLine:"underline"}}>{type}</div>
                                                {/* this is adding subtypes */}
                                                 
                                                {exercises.map( (sub_type, i) => <div key={"inner"+i}>
                                                            {/* <hr style={{width:"100%", color:"black", backgroundColor:"black", padding:"0px !important", margin:"0px !important", height:"0px !important"}}/> */}
                                                    <div key={"exercises"+i} className="col-12" style={{backgroundColor:"white", color:"black", height:"35px", lineHeight: "35px", textAlign:"center", fontSize:"2.5vmin"}}>{sub_type}</div>
                                                    </div>
                                                )}
                                            </div>)   
                                        )}
                                       
                                        </div>
                                        ))}
                                    </div>

                                    <div className="col-12 order-1 col-sm-6 order-sm-2">

                                        <div className="row justify-content-center">
                                        
                                        {/* Added for Templates */}

                                        <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 dropdown">
                                                <select className="btn btn-primary dropdown-toggle" id="templateid" type="button" style={{width:"100%", backgroundColor:background_color}} onChange={templateHandler}>
                                                    <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Templates</option>  
                                                        {
                                                        templatesData.map( ({templateId, templateName}, index) => {
                                                             return <option key={"temlate"+index} className="dropoptions" value={templateId} style={{backgroundColor:"white", color:"black"}}>{templateName}</option> 
                                                               
                                                            })
                                                        }
                                                    <option className="dropoptions" value="New" style={{backgroundColor:"white", color:"black"}}>New</option>  
                                                </select>
                                            </div>

                                            <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 dropdown">
                                                <input type="text" className="form-control" style={{background:"#f7f9fc", color: "inherit", display:templateDisplay[0] }} placeholder="Template Name" onChange={updateTemplateName} value={templateDisplay[1]} />
                                            </div>


                                        {/* end Templates */}
                                            <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 dropdown">
                                                <select className="btn btn-primary dropdown-toggle" id="supertypeid" type="button" style={{width:"100%", backgroundColor:background_color}} onChange={superTypeHandler}>
                                                    <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Super Type</option>  
                                                        {
                                                        exerciseData.map( ({exSupId, supTypeName}, index) => {
                                                             return <option key={"supertype"+index} className="dropoptions" value={exSupId} style={{backgroundColor:"white", color:"black"}}>{supTypeName}</option> 
                                                               
                                                            })
                                                        }
                                                </select>
                                            </div>


                                            <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 dropdown">
                                                <select className="btn btn-primary dropdown-toggle" id="subtypeid" type="button" style={{width:"100%", backgroundColor:background_color }} onChange={subTypeHandler}>
                                                    <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Sub Type</option> 
                                                        {
                                                        subTypes.map( ({exSubId, subTypeName}, index) => {
                                                             return <option key={"subtype"+index} className="dropoptions" value={exSubId} style={{backgroundColor:"white", color:"black"}}>{subTypeName}</option> 
                                                               
                                                            })
                                                        }                                                </select>
                                            </div>

                                            <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 dropdown">
                                                <select className="btn btn-primary dropdown-toggle" id="exercisetypes" type="button" style={{width:"100%", backgroundColor:background_color}} onChange={exercisesHandler}>
                                                    <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Exercises</option> 
                                                        {
                                                        exercises.map( ({name, exerciseId}, index) => {
                                                             return <option key={"exName"+index} className="dropoptions" value={exerciseId} style={{backgroundColor:"white", color:"black"}}>{name}</option> 
                                                            })
                                                        }
 
                                                </select>
                                            </div>

                                            {/* Add and Remove buttons go here! */}
                                            <div className="row justify-content-center top-buffer" style={{width:"100%"}}>
                                                <button className="col-6 offset-0 col-sm-5 offset-sm-1 col-md-5 offset-md-2 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4 btn btn-primary text-center" style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)",  border:"none"}} onClick={addExerciseHandler}>ADD</button>
                                                <button className="col-6 col-sm-5 col-md-5 col-lg-4 col-xl-4 btn btn-primary text-center" disabled={removeBtnDisabled} style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)", border:"none" }} onClick={removeExerciseHandler}>Remove</button>
                                            </div>
                                            <div className="row justify-content-center top-buffer" style={{width:"100%", display:"none"}}>
                                                <button className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 btn btn-primary text-center" style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)", outline:"none", border:"none"}} onClick={addTemplate}>Done</button>
                                            </div>

                                        </div> 
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

export default Templates;


        // for(let obj of templatesData){
        //     if(obj["templateId"] === templateId){
        //         console.log("working: " + templateId);

        //         // Here will go complex logic of template intersection.
        //         let exerciseTemplateInfo = obj["exerciseTemplates"];
        //         console.log(exerciseTemplateInfo);
        //         let exerciseTemplateObject = [];

        //         for(let superTypeObj of exerciseData){
        //             console.log(superTypeObj["supTypeName"])
        //             var temExObject = {
        //                 "supertype":superTypeObj["supTypeName"],
        //                 "subtype":[]
        //             }
        //             let counterSubType = 0;
        //             for(let supTypeObj of superTypeObj["exerciseSubTypes"]){
        //                 temExObject["subtype"].push(
        //                     {
        //                         "type":supTypeObj["subTypeName"],
        //                         "exercises":[]
        //                     }
        //                 )

        //                 for(let exerciseObj of supTypeObj["exercise"]){
        //                     let exID = exerciseObj["exerciseId"];

        //                     console.log(temExObject)

        //                     for(let object of exerciseTemplateInfo){
        //                         let exerciseID = object["exerciseId"];
        //                         if(exID == exerciseID){
        //                             // let tmp = {
        //                             //     "supertype":superTypeObj["supTypeName"],
        //                             //     "subtype":[{
        //                             //         "type":supTypeObj["subTypeName"],
        //                             //         "exercises":[exerciseObj["name"]]
        //                             //     }]
        //                             // }
        //                             temExObject["subtype"][counterSubType]["exercises"].push(exerciseObj["name"])
        //                             break;
        //                         }
        //                     }
        //                     console.log(temExObject["subtype"][counterSubType]["exercises"])
        //                     if(temExObject["subtype"][counterSubType]["exercises"].length === 0){
        //                         console.log("working")
        //                         temExObject["subtype"].splice(counterSubType, 1);
        //                         counterSubType--;
        //                     }
        //                 }
        //                 counterSubType++;
        //             }                            
        //             console.log(temExObject);
        //             if(temExObject["subtype"].length !== 0)
        //                 exerciseTemplateObject.push(temExObject);
        //         }
        //         setTemplateExerciseData(exerciseTemplateObject);
        //         break;
        //     }
        // }



        
    // const temp1 = [
    //     {
    //     "supertype": "Upper Body",
    //     "subtype":[
    //         {
    //         "type": "Table Exercise",
    //         "exercises": ["SLR-Flex", "SLR-AB", "SLR-EXT", "SLR-ADD", "Quard", "HS Set"]
    //         },
    //         {
    //             "type": "Cardio Equipment",
    //             "exercises": ["Upright Bike", "Rec Bike", "Treadmil"]
    //         }
    //         ]
    //     }]

    // const temp2 = [
    //         {
    //         "supertype": "Lower Body",
    //         "subtype":[
    //             {
    //             "type": "Table Exercise",
    //             "exercises": ["SLR-Flex", "SLR-AB", "SLR-EXT", "SLR-ADD", "Quard", "HS Set"]
    //             },
    //             {
    //                 "type": "Cardio Equipment",
    //                 "exercises": ["Upright Bike", "Rec Bike", "Treadmil"]
    //             }
    //             ]
    //         },
    //     ]

    // const temp3 = [{
    //     "supertype": "Upper Body",
    //     "subtype":[
    //         {
    //             "type": "Cardio Equipment",
    //             "exercises": ["Upright Bike", "Treadmil"]
    //         }
    //         ]
    //     },{
    //     "supertype": "Lower Body",
    //     "subtype":[
    //         {
    //         "type": "Table Exercise",
    //         "exercises": ["SLR-Flex","SLR-EXT", "SLR-ADD", "Quard"]
    //         }
    //         ]
    //         },
    //     ]



    // const exerciseData = [
    //     {
    //     "supertype": "Upper Body",
    //     "subtype":[
    //         {
    //         "type": "Table Exercise",
    //         "exercises": ["SLR-Flex", "SLR-AB", "SLR-EXT", "SLR-ADD", "Quard", "HS Set"]
    //         },
    //         {
    //             "type": "Cardio Equipment",
    //             "exercises": ["Upright Bike", "Rec Bike", "Treadmil"]
    //         }
    //         ]
    //     },
    //     {
    //         "supertype": "Lower Body",
    //         "subtype":[
    //             {
    //             "type": "Table Exercise",
    //             "exercises": ["SLR-Flex", "SLR-AB", "SLR-EXT", "SLR-ADD", "Quard", "HS Set"]
    //             },
    //             {
    //                 "type": "Cardio Equipment",
    //                 "exercises": ["Upright Bike", "Rec Bike", "Treadmil"]
    //             }
    //             ]
    //         },
    // ]

    // const templatesDataa = [{
    //     "name":"Template 1",
    //     "template":temp1
    //     },
    //     {
    //         "name":"Template 2",
    //         "template":temp2
    //     },
    //     {
    //         "name":"Template 3",
    //         "template":temp3
    //     }  
    // ]

    // Super Type COde


            // let isNewSuperType = true;
        // let isNewSubType = true;

        // for(let i=0; i < templateExerciseData.length; i++){
        //     if(templateExerciseData[i]["supertype"] === exSuperType){
        //         isNewSuperType = false;
        //         for(let j=0; j < templateExerciseData[i]["subtype"].length; j++){
        //             if(templateExerciseData[i]["subtype"][j]["type"] === exSubType){
        //                 isNewSubType = false;
        //                 var already = templateExerciseData[i]["subtype"][j]["exercises"]
        //                 templateExerciseData[i]["subtype"][j]["exercises"] = [...new Set([...already, ...[exName]])];
        //                 setTemplateExerciseData(templateExerciseData)         
        //             }
        //         }
        //     }
        // }

        // document.getElementById("supertypeid").selectedIndex = 0;
        // document.getElementById("subtypeid").selectedIndex = 0;
        // document.getElementById("exercisetypes").selectedIndex = 0;

        // if(isNewSuperType === true){
        //     let obj ={
        //             "supertype": exSuperType,
        //             "subtype": [
        //                 {
        //                 "type": exSubType,
        //                 "exercises": [exName]
        //                 }
        //             ]
        //         }
            
        //     templateExerciseData.push(obj);
        //     setTemplateExerciseData(templateExerciseData);
        //     setExSuperType("");
        //     setExSubType("");
        //     setExName("");
        //     forceUpdate();
        //     return;
        // }

            
        // if(isNewSubType === true){
        //     for(let i=0; i < templateExerciseData.length; i++){
        //         if(templateExerciseData[i]["supertype"] === exSuperType){
                    
        //             let obj = {
        //                 "type": exSubType,
        //                 "exercises": [exName]
        //                 }
        //             templateExerciseData[i]["subtype"].push(obj);
        //             setTemplateExerciseData(templateExerciseData);
        //             setExSuperType("");
        //             setExSubType("");
        //             setExName("");
        //             forceUpdate();                               
        //             return;
        //         }
        //     }
        // }

        // setExSuperType("");
        // setExSubType("");
        // setExName("");
        // forceUpdate();   

//Remove template

// let index = -1;

// if(exSuperType === "" || exSubType === "" || exName === ""){
//     alert("Select exercise before remove");
//     return;
// }



// for(let i=0; i < templateExerciseData.length; i++){
//     if(templateExerciseData[i]["supertype"] === exSuperType){
//         for(let j=0; j < templateExerciseData[i]["subtype"].length; j++){
//             if(templateExerciseData[i]["subtype"][j]["type"] === exSubType){
//                 index = templateExerciseData[i]["subtype"][j]["exercises"].indexOf(exName);
//                 if(index === -1){
//                     return;
//                 }
//                 console.log(templateExerciseData[i]["subtype"][j]["exercises"].splice(index,1));
//                 if(templateExerciseData[i]["subtype"][j]["exercises"].length == 0)
//                 templateExerciseData[i]["subtype"].splice(j, 1)
//                 // console.log(JSON.stringify(exerciseData));
//             }
//         }
//     }
//     if(templateExerciseData[i]["subtype"].length == 0)
//         templateExerciseData.splice(i, 1);
// }

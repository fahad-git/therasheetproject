import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/Admin.css';

import getAllTemplates from '../services/director.service';


function Templates() {


    const temp1 = [
        {
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
        }]

    const temp2 = [
            {
            "supertype": "Lower Body",
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
            },
        ]

    const temp3 = [{
        "supertype": "Upper Body",
        "subtype":[
            {
                "type": "Cardio Equipment",
                "exercises": ["Upright Bike", "Treadmil"]
            }
            ]
        },{
        "supertype": "Lower Body",
        "subtype":[
            {
            "type": "Table Exercise",
            "exercises": ["SLR-Flex","SLR-EXT", "SLR-ADD", "Quard"]
            }
            ]
            },
        ]



    const exerciseData = [
        {
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
        },
        {
            "supertype": "Lower Body",
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
            },
    ]

    const templatesDataa = [{
        "name":"Template 1",
        "template":temp1
        },
        {
            "name":"Template 2",
            "template":temp2
        },
        {
            "name":"Template 3",
            "template":temp3
        }  
    ]


    const history = useHistory();

    var [templatesData, setTemplatesData] = useState(templatesDataa);
    var [templateIndex, setTemplateIndex] = useState(10);

    var [templateExerciseData, setTemplateExerciseData] = useState([]);

    var [templateDisplay, setTemplateDisplay] = useState(["none","","block"])

    var [subTypes, setSubTypes] = useState([]);
    var [exercises, setExercises] = useState([]);

    const background_color = "rgba(4, 13, 43, 0.8)";
    const forceUpdate = useForceUpdate();


    var [exSuperType, setExSuperType] = useState("");
    var [exSubType, setExSubType] = useState("");
    var [exName, setExName] = useState("");


    useEffect(()=>{
        getAllTemplates.getAllTemplates()
        .then((response) => {
            console.log(response.data);
            setTemplatesData(response.data)
        }).catch((err) => {
            console.log(err);
        })
    },[]);



    const superTypeHandler = (event) => {

        let superTypeName = event.target.value;
        document.getElementById("subtypeid").selectedIndex = 0;
        document.getElementById("exercisetypes").selectedIndex = 0;

 
        for(let obj of exerciseData){
            if(obj["supertype"] === superTypeName){
                setSubTypes(obj["subtype"])
            }
        }
        
        setExSuperType(superTypeName);
        setExSubType("");
        setExName("");
    }

    const subTypeHandler = (event) => {
        

        let subTypeName = event.target.value;

        document.getElementById("exercisetypes").selectedIndex = 0;


        for(let obj of exerciseData){
            if(obj["supertype"] === exSuperType){
                for(let subObj of obj["subtype"]){
                    if(subObj["type"] === subTypeName)
                        setExercises(subObj["exercises"])
                }
            }
        }
        setExSubType(subTypeName);
        setExName("");
    }

    const exercisesHandler = (event) => {
        // alert("exercise handler");
        let exerciseName = event.target.value;
        setExName(exerciseName)
    }
   
    const updateTemplateName = (event) => {
        let value = event.target.value;
        setTemplateDisplay(["block", value, "block"]);
    }

    const addExerciseHandler = () => {
        // superType
        // subtype
        // exerciseName
        if(templateDisplay[1] === ""){
            alert("Select template before adding exercises");
            return;
        }

        if( exSuperType === "" || exSubType === "" || exName === "")
        {
            alert("select all values before add");
            return;
        }
        
        let isNewSuperType = true;
        let isNewSubType = true;

        for(let i=0; i < templateExerciseData.length; i++){
            if(templateExerciseData[i]["supertype"] === exSuperType){
                isNewSuperType = false;
                for(let j=0; j < templateExerciseData[i]["subtype"].length; j++){
                    if(templateExerciseData[i]["subtype"][j]["type"] === exSubType){
                        isNewSubType = false;
                        var already = templateExerciseData[i]["subtype"][j]["exercises"]
                        templateExerciseData[i]["subtype"][j]["exercises"] = [...new Set([...already, ...[exName]])];
                        setTemplateExerciseData(templateExerciseData)         
                    }
                }
            }
        }

        document.getElementById("supertypeid").selectedIndex = 0;
        document.getElementById("subtypeid").selectedIndex = 0;
        document.getElementById("exercisetypes").selectedIndex = 0;

        if(isNewSuperType === true){
            let obj ={
                    "supertype": exSuperType,
                    "subtype": [
                        {
                        "type": exSubType,
                        "exercises": [exName]
                        }
                    ]
                }
            
            templateExerciseData.push(obj);
            setTemplateExerciseData(templateExerciseData);
            setExSuperType("");
            setExSubType("");
            setExName("");
            forceUpdate();
            return;
        }

            
        if(isNewSubType === true){
            for(let i=0; i < templateExerciseData.length; i++){
                if(templateExerciseData[i]["supertype"] === exSuperType){
                    
                    let obj = {
                        "type": exSubType,
                        "exercises": [exName]
                        }
                    templateExerciseData[i]["subtype"].push(obj);
                    setTemplateExerciseData(templateExerciseData);
                    setExSuperType("");
                    setExSubType("");
                    setExName("");
                    forceUpdate();                               
                    return;
                }
            }
        }

        setExSuperType("");
        setExSubType("");
        setExName("");
        forceUpdate();
    }

    const removeExerciseHandler = () => {
        let index = -1;

        if(exSuperType === "" || exSubType === "" || exName === ""){
            alert("Select exercise before remove");
            return;
        }

        for(let i=0; i < templateExerciseData.length; i++){
            if(templateExerciseData[i]["supertype"] === exSuperType){
                for(let j=0; j < templateExerciseData[i]["subtype"].length; j++){
                    if(templateExerciseData[i]["subtype"][j]["type"] === exSubType){
                        index = templateExerciseData[i]["subtype"][j]["exercises"].indexOf(exName);
                        if(index === -1){
                            return;
                        }
                        console.log(templateExerciseData[i]["subtype"][j]["exercises"].splice(index,1));
                        if(templateExerciseData[i]["subtype"][j]["exercises"].length == 0)
                        templateExerciseData[i]["subtype"].splice(j, 1)
                        // console.log(JSON.stringify(exerciseData));
                    }
                }
            }
            if(templateExerciseData[i]["subtype"].length == 0)
                templateExerciseData.splice(i, 1);
        }
        setTemplateExerciseData(templateExerciseData);
        document.getElementById("supertypeid").selectedIndex = 0;
        document.getElementById("subtypeid").selectedIndex = 0;
        document.getElementById("exercisetypes").selectedIndex = 0;
        setExSuperType("");
        setExSubType("");
        setExName("");
        forceUpdate();
    }

    const templateHandler = (event) => {
        let templateName = event.target.value;

        // Here API will be called for all exercises
        if(templateName === "New") {
            setTemplateDisplay(["block", "", "block"]);
            setTemplateExerciseData([]);
            setTemplateIndex(-1);
            return;
        }
        setTemplateDisplay(["none", templateName, "block"]);

        for(let i = 0; i < templatesData.length; i++){
            let obj = templatesData[i];
            if(obj["name"] === templateName){
                setTemplateExerciseData(obj["template"]);
                setTemplateIndex(i);
            }
        }
        // for(let obj of templatesData){
        //     if(obj["name"] === templateName){
        //         setTemplateExerciseData(obj["template"]);
        //     }
        // }

    }
    
    const addTemplate = () => {
        templatesData[templateIndex]["template"] = templateExerciseData;
        // console.log(JSON.stringify(templatesData));
        setTemplatesData(templatesData);
    }

    const goBackHandler = () => {
        history.goBack();
    }

    return  <div className="admin" >
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
                                                        templatesData.map( ({name}, index) => {
                                                             return <option key={"temlate"+index} className="dropoptions" value={name} style={{backgroundColor:"white", color:"black"}}>{name}</option> 
                                                               
                                                            })
                                                        }
                                                    <option className="dropoptions" value="New" style={{backgroundColor:"white", color:"black"}}>New</option>  
                                                </select>
                                            </div>

                                            <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 dropdown">
                                                <input type="text" className="form-control" style={{background:"#f7f9fc", color: "inherit", display:templateDisplay[0] }} placeholder="Template Name" onChange={updateTemplateName} />
                                            </div>


                                        {/* end Templates */}
                                            <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 dropdown">
                                                <select className="btn btn-primary dropdown-toggle" id="supertypeid" type="button" style={{width:"100%", backgroundColor:background_color}} onChange={superTypeHandler}>
                                                    <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Super Type</option>  
                                                        {
                                                        exerciseData.map( ({supertype, subtype}, index) => {
                                                             return <option key={"supertype"+index} className="dropoptions" value={supertype} style={{backgroundColor:"white", color:"black"}}>{supertype}</option> 
                                                               
                                                            })
                                                        }
                                                </select>
                                            </div>


                                            <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 dropdown">
                                                <select className="btn btn-primary dropdown-toggle" id="subtypeid" type="button" style={{width:"100%", backgroundColor:background_color }} onChange={subTypeHandler}>
                                                    <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Sub Type</option> 
                                                        {
                                                        subTypes.map( ({type}, index) => {
                                                             return <option key={"subtype"+index} className="dropoptions" value={type} style={{backgroundColor:"white", color:"black"}}>{type}</option> 
                                                               
                                                            })
                                                        }                                                </select>
                                            </div>

                                            <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 dropdown">
                                                <select className="btn btn-primary dropdown-toggle" id="exercisetypes" type="button" style={{width:"100%", backgroundColor:background_color}} onChange={exercisesHandler}>
                                                    <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Exercises</option> 
                                                        {
                                                        exercises.map( (exName, index) => {
                                                             return <option key={"exName"+index} className="dropoptions" value={exName} style={{backgroundColor:"white", color:"black"}}>{exName}</option> 
                                                            })
                                                        }
 
                                                </select>
                                            </div>


                                            {/* Add and Remove buttons go here! */}
                                            <div className="row justify-content-center top-buffer" style={{width:"100%"}}>
                                                <button className="col-6 offset-0 col-sm-5 offset-sm-1 col-md-5 offset-md-2 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4 btn btn-primary text-center" style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)"}} onClick={addExerciseHandler}>ADD</button>
                                                <button className="col-6 col-sm-5 col-md-5 col-lg-4 col-xl-4 btn btn-primary text-center" style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)" }} onClick={removeExerciseHandler}>Remove</button>
                                            </div>
                                            <div className="row justify-content-center top-buffer" style={{width:"100%"}}>
                                                <button className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 btn btn-primary text-center" style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)"}} onClick={addTemplate}>Done</button>
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
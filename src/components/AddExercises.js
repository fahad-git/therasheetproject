import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/fonts/ionicons.min.css';
import '../assets/css/Admin.css';

import getAllExercises from '../services/director.service';

function AddExercises() {


    // const exerciseDataa = [
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
    //         }
    // ]

    const history = useHistory();

    var [exerciseData, setExerciseData] = useState([])
    var [superType, setSuperType] = useState(["none",""]);
    var [subType, setSubType] = useState(["none","","block"]);
    var [exerciseName, setExerciseName] = useState(["none","","block"]);

    var [subTypes, setSubTypes] = useState([]);
    var [exercises, setExercises] = useState([]);

    var [isRemoveDisabled, toggleRemoveDisabled] = useState(true);
    var [isAddDisabled, toggleAddDisabled] = useState(true);

    const background_color = "rgba(4, 13, 43, 0.8)";
    const forceUpdate = useForceUpdate();


    useEffect(()=>{
        getAllExercises.getAllExercises()
        .then((response) => {
            console.log(response.data);
            // setExerciseData(response.data)
        }).catch((err) => {
            console.log(err);
        })
    },[]);

    const superTypeHandler = (event) => {
       
        let superTypeName = event.target.value;
        document.getElementById("subtypeid").selectedIndex = 0;
        document.getElementById("exercisetypes").selectedIndex = 0;
        toggleRemoveDisabled(true);
        toggleAddDisabled(true);
       
        if(superTypeName === "Others"){
            setSuperType(["block", ""]);
            setSubType(["block", "", "none"]);
            setExerciseName(["block", "", "none"]);
            toggleRemoveDisabled(true);
            toggleAddDisabled(false);
            return;
        }else if(superTypeName === ""){
            setSuperType(["none", ""]);
            toggleRemoveDisabled(true);
            toggleAddDisabled(true);
            return;
        }

        setSuperType(["none", superTypeName]);
        setSubType(["none", "", "block"]);
        setExerciseName(["none", "", "block"]);

        for(let obj of exerciseData){
            if(obj["supertype"] === superTypeName){
                setSubTypes(obj["subtype"])
            }
        }
        

    }

    const subTypeHandler = (event) => {
        
        // let superTypeName = document.getElementById('supertypeid').value;
        let superTypeName = superType[1];
        let subTypeName = event.target.value;
       
        document.getElementById("exercisetypes").selectedIndex = 0;
        toggleRemoveDisabled(true);
        toggleAddDisabled(true);
    

        if(subTypeName === "Others"){
            setSubType(["block", "", "block"]);
            setExerciseName(["block", "", "none"]);
            toggleRemoveDisabled(true);
            toggleAddDisabled(false);
            return;
        }else if(subTypeName === ""){
            setSubType(["none", ""]);
            toggleRemoveDisabled(true);
            toggleAddDisabled(true);
            return;
        }

        for(let obj of exerciseData){
            if(obj["supertype"] === superTypeName){
                for(let subObj of obj["subtype"]){
                    if(subObj["type"] === subTypeName)
                        setExercises(subObj["exercises"])
                }
            }
        }

        setSubType(["none", subTypeName]);
        setExerciseName(["none", "", "block"]);
        
    }

    const exercisesHandler = (event) => {
        // alert("exercise handler");
        let exerciseNameLocal = "";
        try{
            exerciseNameLocal = event.target.value.trim();
        }catch(e){
            exerciseNameLocal = "";
        }
        
        toggleRemoveDisabled(false);
        toggleAddDisabled(false);

        let superTypeName = superType[1].trim() ;
        let subTypeName = subType[1].trim();

        if(superType[1]=== "" || subType[1] === "" || exerciseNameLocal === ""){
            toggleRemoveDisabled(true);
            toggleAddDisabled(true);
            return;
        }

        if(exerciseNameLocal === "Others"){
            setExerciseName(["block", "", "block"]);
            toggleRemoveDisabled(true);
            toggleAddDisabled(false);
            return;
        }

        setExerciseName(["none", exerciseNameLocal, "block"]);
    }

    const updateSuperType = (event) => {
        let value = event.target.value;
        setSuperType([superType[0], value]);
       
    }
    
    const updateSubType = (event) => {
        let value = event.target.value;
        setSubType([subType[0], value, subType[2]]);
    }
    
    const updateExerciseName = (event) => {
        let value = event.target.value;
        setExerciseName([exerciseName[0], value, exerciseName[2]]);
    }

    const addExerciseHandler = () => {
        // superType
        // subtype
        // exerciseName
        if( superType[1].trim() === "" || subType[1].trim() === "" || exerciseName[1].trim() === "")
        {
            alert("select all values before add");
            return;
        }
        console.log("Super: " + superType[1] + " Sub: " + subType[1] + " exercise: " + exerciseName[1])

        let isNewSuperType = true;
        let isNewSubType = true;

        for(let i=0; i < exerciseData.length; i++){
            if(exerciseData[i]["supertype"] === superType[1]){
                isNewSuperType = false;
                for(let j=0; j < exerciseData[i]["subtype"].length; j++){
                    if(exerciseData[i]["subtype"][j]["type"] === subType[1]){
                        isNewSubType = false;
                        var already = exerciseData[i]["subtype"][j]["exercises"]
                        exerciseData[i]["subtype"][j]["exercises"] = [...new Set([...already, ...[exerciseName[1]]])];
                        setExerciseData(exerciseData);                
                    }
                }
            }
        }

        document.getElementById("supertypeid").selectedIndex = 0;
        document.getElementById("subtypeid").selectedIndex = 0;
        document.getElementById("exercisetypes").selectedIndex = 0;

        document.getElementById("supertextid").value="";
        document.getElementById("subtextid").value="";
        document.getElementById("exercisetextid").value="";

        if(isNewSuperType === true){
            let obj ={
                    "supertype": superType[1],
                    "subtype": [
                        {
                        "type": subType[1],
                        "exercises": [exerciseName[1]]
                        }
                    ]
                }
            
            exerciseData.push(obj);
            setExerciseData(exerciseData);
            toggleAddDisabled(true);
            forceUpdate();
            return;
        }

            
        if(isNewSubType === true){
            for(let i=0; i < exerciseData.length; i++){
                if(exerciseData[i]["supertype"] === superType[1]){

                    let obj = {
                        "type": subType[1],
                        "exercises": [exerciseName[1]]
                        }
                    exerciseData[i]["subtype"].push(obj);
                    setExerciseData(exerciseData); 
                    forceUpdate();                               
                    return;
                }
            }
        }


        forceUpdate();
    }

    const removeExerciseHandler = () => {
        let index = -1;

        // console.log("Super: " + superType[1] + " Sub: " + subType[1] + " Ex: " + exerciseName[1]);
        if( superType[1].trim() === "" || superType[1].trim() === "" || exerciseName[1].trim() === "")
        {
            alert("select all values before remove");
            return;
        }

        
        for(let i=0; i < exerciseData.length; i++){
            if(exerciseData[i]["supertype"] === superType[1]){
                for(let j=0; j < exerciseData[i]["subtype"].length; j++){
                    if(exerciseData[i]["subtype"][j]["type"] === subType[1]){
                        index = exerciseData[i]["subtype"][j]["exercises"].indexOf(exerciseName[1]);
                        console.log(exerciseData[i]["subtype"][j]["exercises"].splice(index,1));
                        if(exerciseData[i]["subtype"][j]["exercises"].length == 0)
                            exerciseData[i]["subtype"].splice(j, 1)
                        // console.log(JSON.stringify(exerciseData));
                    }
                }
            }
            if(exerciseData[i]["subtype"].length == 0)
            exerciseData.splice(i, 1);
        }
        setExerciseData(exerciseData);
        document.getElementById("supertypeid").selectedIndex = 0;
        document.getElementById("subtypeid").selectedIndex = 0;
        document.getElementById("exercisetypes").selectedIndex = 0;
        toggleRemoveDisabled(true);
        forceUpdate();
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
                                        
                                    {exerciseData.map( ({supertype, subtype}, index) =>  (<div key={"outer"+index}  style={{textAlign:"left", marginTop:"40px"}}>
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
                                        
                                            <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 dropdown">
                                                <select className="btn btn-primary dropdown-toggle" id="supertypeid" type="button" style={{width:"100%", backgroundColor:background_color}} onChange={superTypeHandler}>
                                                    <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Super Type</option>  
                                                    {/*<option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Exercise Types2</option>  
                                                    <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Exercise Types</option>    */}
                                                        {
                                                        exerciseData.map( ({supertype, subtype}, index) => {
                                                             return <option key={"supertype"+index} className="dropoptions" value={supertype} style={{backgroundColor:"white", color:"black"}}>{supertype}</option> 
                                                               
                                                            })
                                                        }
                                                    <option className="dropoptions" value="Others" style={{backgroundColor:"white", color:"black"}}>Others</option>  
                                                </select>
                                            </div>

                                            <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 dropdown">
                                                <input type="text" id="supertextid" className="form-control" style={{background:"#f7f9fc", color: "inherit", display:superType[0] }} placeholder="Super Type" onChange={updateSuperType} />
                                            </div>

                                            <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 dropdown">
                                                <select className="btn btn-primary dropdown-toggle" id="subtypeid" type="button" style={{width:"100%", backgroundColor:background_color, display:subType[2] }} onChange={subTypeHandler}>
                                                    <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Sub Type</option> 
                                                        {
                                                        subTypes.map( ({type}, index) => {
                                                             return <option key={"subtype"+index} className="dropoptions" value={type} style={{backgroundColor:"white", color:"black"}}>{type}</option> 
                                                               
                                                            })
                                                        }
                                                    <option className="dropoptions" value="Others" style={{backgroundColor:"white", color:"black"}}>Others</option>  
                                                </select>
                                            </div>

                                            <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 dropdown">
                                                <input type="text" id="subtextid" className="form-control" style={{background:"#f7f9fc", color: "inherit", display:subType[0] }} placeholder="Sub Type" onChange={updateSubType} />
                                            </div>

                                            <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 dropdown">
                                                <select className="btn btn-primary dropdown-toggle" id="exercisetypes" type="button" style={{width:"100%", backgroundColor:background_color, display:exerciseName[2] }} onChange={exercisesHandler}>
                                                    <option className="dropoptions" value="" style={{backgroundColor:"white", color:"black"}} defaultValue>Exercises</option> 
                                                        {
                                                        exercises.map( (exName, index) => {
                                                             return <option key={"exName"+index} className="dropoptions" value={exName} style={{backgroundColor:"white", color:"black"}}>{exName}</option> 
                                                            })
                                                        }
                                                    <option className="dropoptions" value="Others" style={{backgroundColor:"white", color:"black"}}>Others</option>  
                                                </select>
                                            </div>

                                            <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-4 col-xl-8 offset-xl-4 dropdown">
                                                <input type="text" id="exercisetextid" className="form-control" style={{background:"#f7f9fc", color: "inherit", display:exerciseName[0] }} placeholder="Exercise" onChange={updateExerciseName} />
                                            </div>

                                            {/* Add and Remove buttons go here! */}
                                            <div className="row justify-content-center" style={{width:"100%"}}>
                                                <button className="col-6 offset-0 col-sm-5 offset-sm-1 col-md-5 offset-md-2 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4 btn btn-primary text-center" style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)"}} disabled={isAddDisabled} onClick={addExerciseHandler}>ADD</button>
                                                <button className="col-6 col-sm-5 col-md-5 col-lg-4 col-xl-4 btn btn-primary text-center" style={{backgroundColor:background_color, fontSize:"calc(2px + 2vmin)"}} disabled={isRemoveDisabled} onClick={removeExerciseHandler}>Remove</button>
                                            </div>


                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <script src="../assets/js/jquery.min.js"></script>
                <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            </div>

}

//create your forceUpdate hook
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

export default AddExercises;
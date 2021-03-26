import axios from "axios";
import authHeader from "./auth-header";
import APIContext from "../context";

const API_URL = APIContext._currentValue;
// const API_URL = "http://499bd1bfc395.ngrok.io/";
// const API_URL = "http://localhost:8000/";

const getClinicianInfo = (id) => {
  return axios.get(API_URL + "getClinicianById", { headers: authHeader(), params:{"id":parseInt(id) }  });
};

const getDirectorBoard = () => {
  return axios.get(API_URL + "getClinicianData", { headers: authHeader() });
};

const getPatientsForView = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.get(API_URL + "getAllPatients", { headers: authHeader(), params:{"id":parseInt(user.id) } });
}

const getPatientsByID = (id) => {
  return axios.get(API_URL + "getPatientById", { headers: authHeader(),  params:{"id":parseInt(id) }  });
}

const getAllExercises = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.get(API_URL + "getAllSuperTypesByClinicId", { headers: authHeader(), params:{"clinicId":parseInt(user.id) } });
}

const getAllTemplates = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.get(API_URL + "getAllTemplateNameAndId", { headers: authHeader(), params:{"id":parseInt(user.id) } });
}

const activeClinician = (id) => {
  return axios.get(API_URL + "director/activeClinicianById", { headers: authHeader(), params:{"id":id} } );
}
const blockClinician = (id) => {
  // console.log("ID: "+id);
  return axios.get(API_URL + "director/blockClinicianById", { headers: authHeader(), params:{"id":id} } );
}

const removeExercise = (id) => {
  return axios.delete(API_URL + "deleteExercise", { headers: authHeader(), params:{"exerciseid":id} } );
}

const uploadProfilePicture = (data) => {
  return axios.post(API_URL + "clinicUpload", data, { headers: authHeader()});
}

const addExerciseSuperType = (obj) => {
  const user = JSON.parse(localStorage.getItem("user"));
  obj["clinicId"] = user.id;
  // console.log("Object:");
  // console.log(JSON.stringify(obj))

  return axios.post(API_URL + "addSuperType", obj, { headers: authHeader() } );
}

const addDefaultExerciseSuperType = (obj, id) => {
  obj["clinicId"] = id;
  return axios.post(API_URL + "addDefaultSuperType", obj );
}

const addExerciseSubType = (obj) => {
  // console.log(JSON.stringify(obj))
  return axios.post(API_URL + "addSubType", obj,  { headers: authHeader() } );
}

const addIndividualExercise = (obj) => {
  // console.log(JSON.stringify(obj))
  return axios.post(API_URL + "addExercise", obj,  { headers: authHeader() } );
}

const checkUsernameAvailability = (username) => {
  // console.log(username);
  return axios.get(API_URL + "checkUsernameAvailability", { headers: authHeader(), params:{"username" : username} } );
}

const registerClinician = (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  data["clinicId"] = user.id;
  return axios.post(API_URL + "director/registerClinician", data, { headers: authHeader()} );
}

const getDirectorInfo = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.get(API_URL + "getClinicById", { headers: authHeader(), params:{"id":parseInt(user.id) } });
}

const addExerciseInTemplate = (exercise) => {
  return axios.post(API_URL + "addExerciseTemplate", exercise, { headers: authHeader()} );
}

const addNewTemplate = (templateName) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const InsertingObject = {
      "templateName": templateName,
      "clinicId": user.id,
      "exerciseTemplates": []
    }
  return axios.post(API_URL + "addNewTemplate", InsertingObject, { headers: authHeader()} );
}

const deleteExerciseTemplate = (exTempId) => {
  return axios.delete(API_URL + "deleteExerciseTemplate", { headers: authHeader(), params:{"id":parseInt(exTempId) } } );
}

const deleteTemplate = (tmpId) => {
  return axios.delete(API_URL + "deleteTemplate", { headers: authHeader(), params:{"id":parseInt(tmpId) } } );
}

export default {
    getClinicianInfo,
    getDirectorBoard,
    getPatientsForView,
    getAllExercises,
    getPatientsByID,
    getAllTemplates,
    activeClinician,
    blockClinician,
    removeExercise,
    addExerciseSuperType,
    addExerciseSubType,
    addIndividualExercise,
    checkUsernameAvailability,
    registerClinician,
    getDirectorInfo,
    uploadProfilePicture,
    addExerciseInTemplate,
    addNewTemplate,
    deleteExerciseTemplate,
    deleteTemplate,
    addDefaultExerciseSuperType
  };
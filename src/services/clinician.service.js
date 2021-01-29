import axios from "axios";
import authHeader from "./auth-header";
import APIContext from "../context";

const API_URL = APIContext._currentValue;
// const API_URL = "http://499bd1bfc395.ngrok.io/";
// const API_URL = "http://localhost:8000/";



const getPatientInfo = (id) => {
  return axios.get(API_URL + "getPatientById", { headers: authHeader(), params:{"id":parseInt(id) }  });
};

const getClinicianBoard = () => {
  return axios.get(API_URL + "getPatientsData", { headers: authHeader() });
};

const getPatientsDataByDate = (date) =>{
    return axios.get(API_URL + "getPatientsDataByDate", { headers: authHeader(), params:{"date":date} });
}

const getAllExercises = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.get(API_URL + "getAllSuperTypesByClinicId", { headers: authHeader(), params:{"clinicId":parseInt(user.clinicId) } });
}

const getClinicianInfo = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.get(API_URL + "getClinicianById", { headers: authHeader(), params:{"id":parseInt(user.id)} } );
}

const uploadProfilePicture = (data) => {
  return axios.post(API_URL + "clinicianUpload", data, { headers: authHeader()});
}

const addNewPatient = (data) => {
  return axios.post(API_URL + "addPatient", data, { headers: authHeader() });
}

const getAllTemplates = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.get(API_URL + "getAllTemplateNameAndId", { headers: authHeader(), params:{"id":parseInt(user.clinicId) } });
}

const addPatientExercise = (data) => {
  return axios.post(API_URL + "addPatientExercise", data, { headers: authHeader() });
}

const getPatientExerciseByDate = (id, date) => {
  return axios.get(API_URL + "getPatientExerciseByDate", { headers: authHeader(), params:{"id":id, "date":date } });
}


export default {
    getPatientInfo,
    getClinicianBoard,
    getPatientsDataByDate,
    getAllExercises,
    getClinicianInfo,
    uploadProfilePicture,
    addNewPatient,
    getAllTemplates,
    addPatientExercise,
    getPatientExerciseByDate
}
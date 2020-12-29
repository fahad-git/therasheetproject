import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://192.168.1.105:8090/";
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
  return axios.get(API_URL + "getAllExercises", { headers: authHeader(), params:{"id":parseInt(user.id) } });
}

const getAllTemplates = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.get(API_URL + "getAllTemplates", { headers: authHeader(), params:{"id":parseInt(user.id) } });
}



export default {
    getClinicianInfo,
    getDirectorBoard,
    getPatientsForView,
    getAllExercises,
    getPatientsByID,
    getAllTemplates
  };
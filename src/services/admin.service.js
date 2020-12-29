import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://192.168.1.105:8090/";
// const API_URL = "http://localhost:8000/";


const getClinicInfo = (id) => {
  return axios.get(API_URL + "getClinicById", { headers: authHeader(), params:{"id":parseInt(id) }  });
};

const getAdminInfo = () => {
  return axios.get(API_URL + "getAdminDetails", { headers: authHeader() });
};

const uploadProfilePicture = (data) => {
  // { headers: authHeader(), data:object }
  return axios.post(API_URL + "uploadProfilePicture", data, { headers: authHeader()});
}
// this API will update admin name and profile url
const updateAdminInfo = (data) => {
  return axios.post(API_URL + "updateAdminDetails", { headers: authHeader(), data:data} );
};
// this API will verify admin password and returns true/false
const validatePassword = (pass) => {
  return axios.get(API_URL + "validatePassword", { headers: authHeader(), params:pass } );
}

const resetPassword = (obj) => {
  const user = JSON.parse(localStorage.getItem("user"));
  obj["id"] = user.id;
  return axios.get(API_URL + "resetPassword", { headers: authHeader(), params:obj } );
}

export default {
    getClinicInfo,
    getAdminInfo,
    updateAdminInfo,
    uploadProfilePicture,
    validatePassword,
    resetPassword
  };
import axios from "axios";
import authHeader from "./auth-header";
import APIContext from "../context";

const API_URL = APIContext._currentValue;
// const API_URL = "http://499bd1bfc395.ngrok.io/";
// const API_URL = "http://localhost:8000/";

const getClinicInfo = (id) => {
  return axios.get(API_URL + "getClinicById", { headers: authHeader(), params:{"id":parseInt(id) }  });
};

const getAdminInfo = () => {
  // console.log(APIContext._currentValue);
  return axios.get(API_URL + "getAdminDetails", { headers: authHeader() });
};

const uploadProfilePicture = (data) => {
  // { headers: authHeader(), data:object }
  // uploadProfilePicture
  return axios.post(API_URL + "adminUpload", data, { headers: authHeader()});
}
// this API will update admin name and profile url
// const updateAdminInfo = (data) => {
//   return axios.post(API_URL + "updateAdminDetails", { headers: authHeader(), data:data} );
// };
// this API will verify admin password and returns true/false
// const validatePassword = (pass) => {
//   return axios.get(API_URL + "validatePassword", { headers: authHeader(), params:pass } );
// }

const resetPassword = (obj) => {
  const user = JSON.parse(localStorage.getItem("user"));
  obj["id"] = user.id;
  return axios.get(API_URL + "resetPassword", { headers: authHeader(), params:obj } );
}

const activeClinics = (id) => {
  return axios.get(API_URL + "admin/activeClinicById", { headers: authHeader(), params:{"id":id} } );
}
const blockClinics = (id) => {
  // console.log("ID: "+id);
  return axios.get(API_URL + "admin/blockClinicById", { headers: authHeader(), params:{"id":id} } );
}

const tmpGetFile = () => {
  return axios.get(API_URL + "downloadFile", { headers: authHeader(), params:{"id":3}  } );
}

export default {
    getClinicInfo,
    getAdminInfo,
    // updateAdminInfo,
    uploadProfilePicture,
    // validatePassword,
    resetPassword,
    activeClinics,
    blockClinics,
    tmpGetFile
  };
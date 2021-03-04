import axios from "axios";
import APIContext from "../context";

const API_URL = APIContext._currentValue;
// const API_URL = "http://499bd1bfc395.ngrok.io/";
// const API_URL = "http://localhost:8000/";


const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password, loginCallback) => {
  axios.post(API_URL  + "authenticate", {
  "username":username,
  "password":password
  }, { headers: {"Content-Type": "application/json"}}
  )
  .then((response) => {
    // API       
    axios.get(API_URL + "UserDetails", { headers: { Authorization: "Bearer " + response.data["jwt"] } } )
      .then((user) => {
        // API
        user.data["accessToken"] = response.data["jwt"]
         loginCallback(user.data);
        // return user.data;
      }).catch((err)=>{
        // console.log("Can not find user!")
        // console.log(err);
        loginCallback(null);
      });
    
     console.log(response.data);
    
    }).catch((err)=>{
    // console.log("Can not find user!");
    // console.log(err);
    loginCallback(null);
  });

};

const hello = () => {

  // axios.post(API_URL  + "authenticate", {
  //   "username":"zainab",
  //   "password":"zainab123"
  //   }
  //   )
  //   .then((response) => {
  //     // API   
  //     console.log("working!")
  //     console.log(response.data);
  
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  

  // axios.get(API_URL  + "hello", { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6YWluYWIiLCJleHAiOjE2MDg2MjQzOTEsImlhdCI6MTYwODYyMDc5MX0.-KuFoJqR4HaPzJlBtXz1d4QyO8z7LDndtTwLJnU4kZs" } } )
  // .then((res) => {
  //   console.log(res.data)
  // }).catch((err) => {
  //   console.log(err);
  // });  
}


const registerClinic = (data) => {
  return axios.post(API_URL + "registerClinic", data);
}

const usernameAvailability = (username) => {
  console.log(username);
  return axios.get(API_URL + "UsernameAvailability", { params:{"username" : username} } );
}

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  registerClinic,
  usernameAvailability,
  hello,
};
/*
  axios
  .post(API_URL + "authenticate", {"body":{
    "username":username,
    "password":password,
  }},
  {
    headers: {
      'Content-Type': 'application/json'
      }
  }
  )
  .then((response) => {
    console.log("***********************************************************************************");
    console.log(response);
    return response.data;
  }).catch((err)=>{
    console.log("Can not find user!")
    return null;
  });

*/
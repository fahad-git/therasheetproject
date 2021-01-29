import axios from "axios";
import authHeader from "./auth-header";
import APIContext from "../context";

const API_URL = APIContext._currentValue;
// const API_URL = "http://499bd1bfc395.ngrok.io/";
// const API_URL = "http://localhost:8000/";


const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "getClinicsData", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
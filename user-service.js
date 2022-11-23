import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

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
    return axios.get("http://localhost:8080/api/test/admin", { headers: authHeader() });
  };

const getUsers = ()=>{
  return axios.get("http://localhost:8080/api/test/showUsers")
}

const getTrains = ()=>{
  return axios.get("http://localhost:8080/api/train/all")
}
 
  const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    getUsers,
    getTrains,
  };
  
  export default UserService;
import axios from 'axios';

export const BASE_URL = "http://localhost:3000/api/";

const getToken = () => {
  return localStorage.getItem("access_token");
}

const createAxios = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

export default createAxios;

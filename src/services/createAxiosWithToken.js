import axios from 'axios';
import config from '../config';
console.log(config);

export const BASE_URL = config.baseURL;

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

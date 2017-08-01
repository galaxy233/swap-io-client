import axios from 'axios';

const getToken = () => {
  return localStorage.getItem("access_token");
}

const createAxios = () => {
  return axios.create({
    baseURL: "http://localhost:3000/api/",
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

export default createAxios;

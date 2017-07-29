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

export const createUser = (username) => {
  let data = {"username" : username};
  return createAxios().post("user", data)
    .then(res => res.data);
}

export const getUser = () => {
  return createAxios().get("user")
    .then(res => res.data);
}

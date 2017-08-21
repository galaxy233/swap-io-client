import createAxios from './createAxiosWithToken';
import {BASE_URL} from './createAxiosWithToken';
import axios from 'axios';

export const createUser = (username, zipcode) => {
  let data = {username, zipcode};
  return createAxios().post("user", data)
    .then(res => res.data);
}

export const getUser = () => {
  return createAxios().get("user")
    .then(res => res.data);
}

export const checkUsername = (username) => {
  return axios.get(BASE_URL + `user/${username}`)
    .then(res => res.data)
}

export const getZipcode = new Promise((resolve, reject) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      let lat = pos.coords.latitude;
      let long = pos.coords.longitude;
      axios.get(BASE_URL + "getzipcode", {
        params: {
          lat,
          long,
        }
      }).then(res => resolve(res.data.zipcode))
    })
  } else {
    reject(new Error("Browser does not support geolocation."))
  }
})

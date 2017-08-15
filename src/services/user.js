import createAxios from './createAxiosWithToken';
import {BASE_URL} from './createAxiosWithToken';
import axios from 'axios';
import geocoder from 'geocoder';


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
      geocoder.reverseGeocode(lat, long, (err, data) => {
        if (err) {
          reject(err)
        } else {
          let zipcode = data.results[0].formatted_address.match(/,\s\w{2}\s(\d{5})/)[1]
          resolve(zipcode)
        }
      })
    })
  } else {
    reject(new Error("Browser does not support geolocation."))
  }
})

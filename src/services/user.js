import createAxios from './createAxiosWithToken';
import geocoder from 'geocoder';

export const createUser = (username) => {
  let data = {"username" : username};
  return createAxios().post("user", data)
    .then(res => res.data);
}

export const getUser = () => {
  return createAxios().get("user")
    .then(res => res.data);
}

export const getZipcode = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      let lat = pos.coords.latitude;
      let long = pos.coords.longitude;
      geocoder.reverseGeocode(lat, long, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let zipcode = data.results[0].formatted_address.match(/,\s\w{2}\s(\d{5})/)[1]
        }
      })
    })
  }
}

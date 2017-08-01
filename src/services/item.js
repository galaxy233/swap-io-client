import axios from 'axios';
import createAxios from './createAxiosWithToken';

export const newItem = (item) => {
  return createAxios().post("item", item)
  .then(res => res.data)
}

export const uploadImage = (file) => {
  return createAxios().post("aws/getsignedurl", {
    filename: file.name,
    filetype: file.type
  })
  .then(res => {

    let options = {
      headers: {
        'Content-Type': file.type
      }
    }

    return axios.put(res.data.url, file, options)
    .then(res => res.config.url.match(/.*\?/)[0].slice(0,-1))
  })
}
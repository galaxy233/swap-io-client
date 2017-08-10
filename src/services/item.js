import axios from 'axios';
import createAxios from './createAxiosWithToken';
import { BASE_URL } from './createAxiosWithToken';

export const newItem = (item) => {
  console.log(item);
  return createAxios().post("item", item)
  .then(res => res.data)
}

export const updateItem = (item, id) => {
  return createAxios().put(`item/${id}`, item)
  .then(res => res.data)
}

export const deleteItem = (id) => {
  return createAxios().delete(`item/${id}`)
  .then(res => res.data)
}

export const fetchItem = (id) => {
  return axios.get(`${BASE_URL}item/${id}`)
  .then(res => res.data)
}

export const fetchItems = (id) => {
  return createAxios().get("items")
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

import axios from 'axios';
import createAxios from './createAxiosWithToken';
import { getZipcode } from './user';
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
    console.log(res);

    let options = {
      headers: {
        'Content-Type': file.type
      }
    }

    return axios.put(res.data.url, file, options)
    .then(res => {
      let filename = res.config.url.match(/com\/(.*)\?/)[1]
      return filename
    })
  })
}

export const fetchFeaturedItems = (zipcode) => {
  return axios.get(BASE_URL + "items/featured/" + zipcode)
  .then(res => res.data);
}

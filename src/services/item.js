import axios from 'axios';

export const newItem = (item) => {
  let token = localStorage.getItem("id_token");
  return axios.post("http://localhost:3000/api/item/new", item, {
    headers : {
      'Authorization' : "Bearer " + token
    }
  })
}

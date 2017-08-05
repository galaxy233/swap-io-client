import axios from 'axios';
import { BASE_URL } from './createAxiosWithToken';

export const searchItems = (keywords, zipcode, radius) => {
  return axios.get(BASE_URL + "search", {
    params: {
      keywords,
      zipcode,
      radius
    }
  }).then(res => res.data);
}

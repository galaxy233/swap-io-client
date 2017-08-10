import axios from 'axios';
import { BASE_URL } from './createAxiosWithToken';

export const searchItems = (keywords, zipcode, radius, sortby) => {
  return axios.get(BASE_URL + "search", {
    params: {
      keywords,
      zipcode,
      radius,
      sortby
    }
  }).then(res => res.data);
}

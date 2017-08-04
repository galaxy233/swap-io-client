import axios from 'axios';

export const searchItems = (keywords, zipcode, radius) => {
  return axios.get("/api/search", {
    params: {
      keywords,
      zipcode,
      radius
    }
  }).then(res => res.data);
}

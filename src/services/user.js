import createAxios from './createAxiosWithToken';

export const createUser = (username) => {
  let data = {"username" : username};
  return createAxios().post("user", data)
    .then(res => res.data);
}

export const getUser = () => {
  return createAxios().get("user")
    .then(res => res.data);
}

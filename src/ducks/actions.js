import createAxios from '../services/createAxiosWithToken';

const REQUEST_ITEMS = 'REQUEST_ITEMS';
const RECEIVE_ITEMS = 'RECEIVE_ITEMS';

const requestItems = () => {
  return {
    type: REQUEST_ITEMS
  }
}

const receiveItems = (items) => {
  return {
    type: RECEIVE_ITEMS,
    payload: items
  }
}

export const fetchItems = () => {
  return dispatch => {
    dispatch(requestItems())
    return createAxios().get("items")
    .then(items => dispatch(receiveItems(items)))
  }
}

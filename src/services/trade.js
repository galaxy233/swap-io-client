import createAxios from './createAxiosWithToken';

export const initiateTrade = (user1_item_id, user2_item_id) => {
  return createAxios().post("trade", {
    user1_item_id,
    user2_item_id
  }).then(res => res.data)
}

export const fetchTrades = () => {
  return createAxios().get("trades")
  .then(res => res.data)
}

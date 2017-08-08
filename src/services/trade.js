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

export const fetchTrade = (id) => {
  return createAxios().get(`trade/${id}`)
  .then(res => res.data)
}

export const acceptTrade = (id) => {
  return createAxios().put(`trade/accept/${id}`)
  .then(res => res.data)
}

export const cancelTrade = (id) => {
  return createAxios().put(`trade/cancel/${id}`)
  .then(res => res.data)
}

export const completeTrade = (id) => {
  return createAxios().put(`trade/complete/${id}`)
  .then(res => res.data)
}

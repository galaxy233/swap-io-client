const initialState = {
  isFetching: true,
  isPosting: false,
  items: []
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'REQUEST_ITEMS':
      return Object.assign({}, state, {isFetching: true})
    case 'RECEIVE_ITEMS':
      return {
        items: action.payload.data,
        isFetching: false
      }
    case 'CREATE_ITEM':
      return Object.assign({}, state, {isPosting: true})
    case 'CREATE_ITEM_SUCCESS':
      return {
        items: [...state.items, action.payload],
        isPosting: false
      }
    default:
      return state
  }
}

export default reducer;

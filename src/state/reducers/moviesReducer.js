const reducer = (state = [], action) => {
  switch (action.type) {
    case "load":
      return action.payload
    case "loadMore":
      return [...state, ...action.payload]
    default:
      return []
  }
}

export default reducer

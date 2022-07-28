export const loadMovies = (amount) => {
  return (dispatch) => {
    dispatch({
      type: "load",
      payload: amount
    })
  }
}

export const loadMoreMovies = (amount) => {
  return (dispatch) => {
    dispatch({
      type: "loadMore",
      payload: amount
    })
  }
}

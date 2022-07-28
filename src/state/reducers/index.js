import { combineReducers } from "redux"
import moviesReducer from "./moviesReducer"

const reducers = combineReducers({
  movies: moviesReducer
})

export default reducers

import { combineReducers } from "redux";
import cellReducer from "./cellReducer";

const reducers = combineReducers({
  cells: cellReducer,
});

export default reducers;

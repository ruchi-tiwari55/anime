import { combineReducers } from "redux";
import animeReducer from "./anime";

const combinedReducers = combineReducers({
  anime: animeReducer,
});

export default combinedReducers;

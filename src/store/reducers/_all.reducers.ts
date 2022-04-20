/**
 * @description all Redux reducers combined
 */


import { combineReducers } from "redux";
import AuthReducer from "./auth.reducer";


// All Redux Reducers
const AllReducers = combineReducers({
    auth: AuthReducer
})


// <> Export
export default AllReducers;
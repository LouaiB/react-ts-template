/**
 * @description Redux Auth reducer
 * 
 * Sections:
 * _Interface for the structure of the auth state
 * _Default (initial) value for the auth state
 * _Reducer function, takes generic action parameter 
 *  since different actions have different payload structures
 */

import { IUser } from "../../models/User";
import IAction from "../Action";
import { IAuthState } from "../State";


// <> Auth Default State
const defaultAuthState: IAuthState = {
    isLoggedIn: false
}

// <> Auth Reducer
const AuthReducer = (state: IAuthState = defaultAuthState, action: IAction): IAuthState => {
    switch(action.type) {
        case 'SET_USER':
            return {
                isLoggedIn: !!action.payload,
                ...action.payload
            }
        case 'CLEAR_USER':
            return {
                isLoggedIn: false
            }
        default:
            return state;
    }
}

// <> Export
export default AuthReducer;
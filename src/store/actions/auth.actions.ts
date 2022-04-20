/**
 * @description Redux auth actions
 * 
 * Gets new state as parameter, and returns it in an object with 
 * the "type" property as well to tell the reducer how to update
 * the state
 */


import { IUser } from "../../models/User";
import IAction from "../Action";


/**
 * set the user's state
 * @param user user data to set
 * @returns action info to be passed to dispatch
 */
export const setUser = (user: IUser | null): IAction => ({ 
    type: 'SET_USER',
    payload: user
});


/**
 * clear the user's state
 * @returns action info to be passed to dispatch
 */
export const clearUser = (): IAction => ({
    type: 'CLEAR_USER'
})
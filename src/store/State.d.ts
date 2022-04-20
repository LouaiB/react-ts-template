/**
 * @description Redux store state interfaces
 */


import { IUser } from "../models/User";


// <> State Pieces Interfaces
// Auth State
export interface IAuthState extends Partial<IUser> {
    isLoggedIn: boolean;
}


// <> App State Interface
export default interface IAppState {
    auth: IAuthState
}
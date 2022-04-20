export interface IUser {
    id?: string,
    email?: string,
    phone?: string
}

export default class User implements IUser {

    // <> Properties
    id?: string | undefined;
    email?: string;
    phone?: string | undefined;

    /**
     * create new user instance
     * @param _user user data
     */
    constructor(_user: IUser) {
        if(_user.id) this.id = _user.id;
        if(_user.email) this.email = _user.email;
        if(_user.phone) this.phone = _user.phone;
    }

}
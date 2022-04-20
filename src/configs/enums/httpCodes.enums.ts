/**
 * @description HTTP Code enum
 */


// <> Interfaces
export interface IHttpCodes {
    [x: string]: number
}


// <> Enums
const HttpCodesEnum: IHttpCodes = {
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    Invalid: 420,
    InvalidRefreshToken: 477,
    InternalServerError: 500
}


/**
 * Exports
 */
export default HttpCodesEnum;
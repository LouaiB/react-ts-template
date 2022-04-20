import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import HttpErrors from '../errors/HttpErrors';
import AuthService from '../integrations/auth.service';
import BrowserStorage from "../utils/browser.storage";
import BrowserStorageEnums from "./enums/browserStorage.enums";
import HttpCodesEnum from "./enums/httpCodes.enums";


/**
 * axios request handler, used to morph the request object before sending it
 * @param request request that is being sent
 * @returns morphed request
 * @note used mainly to add JWT token
 */
const requestHandler = (request: AxiosRequestConfig): AxiosRequestConfig => {

    // ! If request is undefined, return it
    if(!request) return request;

    // -> Add Content Type
    if(request.headers) request.headers["Content-Type"] = "application/json";

    // -> Add Access Token if Set
    const token: string | null = BrowserStorage.get(BrowserStorageEnums.AccessToken.Key);
    if (token && request.headers) request.headers["access-token"] = token;

    // End
    return request;
};


/**
 * used to handle response received
 * @param response response received
 * @returns response (altered)
 * @note no alterations in the boilerplate
 */
const responseHandler = (response: AxiosResponse): AxiosResponse => {
    return response;
};

/**
 * Error
 *     !sent
 *         return promise rejection error
 *     sent + !responded ?
 *         return promise rejection error
 *     sent + responded ?
 *         !401 ? return promise rejection error
 *         401 & no refresh token ? login
 *         401 & refresh token ? REFRESH
 *             !sent
 *                 return promise rejection error
 *             sent + !responded ?
 *                 return promise rejection error
 *             sent + responded ?
 *                 200 ? update token and retry original request
 *                 477 ? invalid refresh token, relogin
 *                 * ? unknown case, relogin
 *         401 on retry ? relogin
 *
 */

const UnauthorizedHandler = async (error: any) => {

    // -> Set error as being retried
    error.config._retry = true;

    // -> Get refresh token
    const refreshToken = BrowserStorage.get(BrowserStorageEnums.RefreshToken.Key);

    // Sanity checks, throw error in the following cases:
    // ? If no refresh token in browser storage, then user must log in again
    if (!refreshToken) throw new HttpErrors.UnauthenticatedHttpError('must login', error);

    console.log('getting refresh token');
    // -> Call the Refresh Token endpoint
    const refreshResult = await AuthService.refresh(refreshToken);

    // -> Extract the access token from the response
    const newAccessToken = refreshResult.data.data.accessToken;

    // -> Store new access token into browser storage
    BrowserStorage.set(BrowserStorageEnums.AccessToken.Key, newAccessToken);

    // -> Set the new access token into the error config's authorization header
    error.config.headers['access-token'] = newAccessToken;

    // -> Return an axios promise with the new config
    return axios(error.config);

};


/**
 * response error handler
 * @param error 
 */
const errorHandler = async (error: any): Promise<AxiosResponse> => {

    console.log('IN ERROR HANDLER AXIOS GLOBAL [RESPONSE]:' + error?.response?.status)
    console.log(error.stack)

    if (!error.response) throw new HttpErrors.ResponseNotReceivedHttpError(error.message, error);
    else if (error.response.status === HttpCodesEnum.Unauthorized && !error.config._retry) return UnauthorizedHandler(error);
    else if (error.response.status === HttpCodesEnum.Unauthorized && error.config._retry) throw new HttpErrors.UnauthenticatedHttpError('must login', error);
    else if (error.response.status === HttpCodesEnum.InvalidRefreshToken) throw new HttpErrors.UnauthenticatedHttpError('must login', error);
    else if (error.response.status === HttpCodesEnum.InternalServerError) throw new HttpErrors.InternalServerHttpError(error.response.data.message, error);
    else throw new HttpErrors.HttpResponseError(error.response.data.message, error, error.response.status);

};

/**
 * request error handler
 * @param error 
 */
 const requestErrorHandler = async (error: any): Promise<void> => {
    throw new HttpErrors.RequestNotSentHttpError(error.message, error);
};


// <> Axios Interceptor Setup
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => requestHandler(config),
    (error: any) => requestErrorHandler(error)
);
axios.interceptors.response.use(
    (response: AxiosResponse) => responseHandler(response),
    (error) => errorHandler(error)
);


// <> Module Export
export {};
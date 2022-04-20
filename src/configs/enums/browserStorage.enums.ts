/**
 * @description browser storage key enums, with possible values if applicable
 */


// <> Interfaces
export interface IBrowserStorageEnum {
    Key: string,
    Values?: {
        [x: string]: string
    }
}
export interface IBrowserStorageEnums {
    [x: string]: IBrowserStorageEnum
} 


// <> Enums
const BrowserStorageEnums: IBrowserStorageEnums = {
    AccessToken: {
        Key: 'template-access-token'
    },
    RefreshToken: {
        Key: 'template-refresh-token'
    }
}


/**
 * Exports
 */
export default BrowserStorageEnums;
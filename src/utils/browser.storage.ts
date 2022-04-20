/**
 * @description module for interacting with the browser's storage
 * @note uses local storage
 * @note used to save JWT tokens
 */


/**
 * store a key-value pair into the browser storage
 * @param key 
 * @param value 
 */
 function set(key: string, value: string): void {
    localStorage.setItem(key, value);
}


/**
 * get a stored value from the browser storage using its key
 * @params key 
 * @returns stored value
 */
function get(key: string): string | null {
    return localStorage.getItem(key);
}


/**
 * clear a value from the browser storage using its key
 * @param key 
 */
function clear(key: string): void {
    localStorage.removeItem(key);
}


/**
 * Exports
 */
const BrowserStorage = {
    set,
    get,
    clear
}
export default BrowserStorage;
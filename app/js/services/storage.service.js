/**
 * @class LocalStorage
 * @description A wrapper for localstorage
 */
export default class LocalStorage {
    /**
     * @param  {string} storageName
     * @param  {LocalStorage} localStorage *Injecting localStorage for testability purpose
     */
    constructor(storageName, localStorage) {
        this.STORAGE_NAME = storageName;
        this.localStorage = localStorage || window.localStorage;
    }
    
    get() {
        return JSON.parse(this.localStorage.getItem(this.STORAGE_NAME) || '[]');
    }

    save(items) {
        this.localStorage.setItem(this.STORAGE_NAME, JSON.stringify(items));
    }
}
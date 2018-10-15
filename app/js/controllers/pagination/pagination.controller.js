/**
 * @class PaginationController
 * @description Responsible to handle the pagination view
 */
export default class PaginationController {
    
    /**
     * @param  {StoreService} store
     * @description Get the pagination data from the store to serve onto the view
     */
    constructor(store) {
        this.pagination = store.pagination;
    }

    static getTemplateUrl() {
        return 'app/js/controllers/pagination/pagination.html';
    }
}
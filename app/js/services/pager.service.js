/**
 * @class PaginationService
 * @description It handle pagination logic
 */
export default class PaginationService {
    constructor() {
        this.currentPage = 1;
        this.DEFAULT_PAGE_SIZE = 10;
    }
    
    /**
     * @param  {Arrau} items
     * @param  {number} pageSize
     * @default Object
     */
    init({items, pageSize} = {}) {
        this.totalItems = items || [];
        this.pageSize = pageSize || this.DEFAULT_PAGE_SIZE;
    }
    /**
     * @description Calculate total pages = totalItems / page size
     *      - As computed property would stay in sync with totalItems changes
     */
    get totalPages() {
        return Math.ceil(this.totalItems.length / this.pageSize) || 0;
    }
    
     /**
     * @description Create an Array of incremental integer with size = totalPages
     *      - As computed property would stay in sync with totalPages changes
     */
    get totalPagesArray() {
        return [
            ...new Array(this.totalPages).keys() // use the keys as value = [0, n-1]
        ].map(x => x + 1); // increment each by 1 = [1, n]
    }
    /**
     * @description Return the currentPage
     *      In case the totalPages has been decreased (due to a bookmark deletion for example)
     *      re-sync the current page to the last one
     */
    getCurrentPage() {
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
        }

        return this.currentPage;
    }

    /**
     * @description If we are not on the first page, go to the previous page;
     */
    previous() {
        if (false === this.isFirstPage()) {
            this.currentPage--;
        }
    }

    /**
     * @description If we are not on the last page, go to the next page;
     */
    next() {
        if (false === this.isLastPage()) {
            this.currentPage++;
        }
    }
    /**
    * @description Set the current page to a specific number (If in range)
    */
    goTo(number) {
        if (number > 0 && number <= this.totalPages) {
            this.currentPage = number;
        }
    }

    isFirstPage() {
        return this.currentPage === 1;
    }

    isLastPage() {
        return this.currentPage === this.totalPages;
    }

    /**
     * @description Calculate a subset of the items relative to the page
     * @param {Array} items 
     * 
     * @returns Array
     */
    itemsPerPage(items) {
        let lastElement = this.pageSize * this.currentPage;
        let firstElement = lastElement - this.pageSize;

        return items.slice(firstElement, lastElement);
    }
}
/**
 * @class StoreService
 * @description This Store is a simple state management pattern.
 */
export default class StoreService {
    /**
     * @param  {StorageService} $storage
     * @param  {PaginationService} pagination
     */
    constructor($storage, pagination) {
        this.$storage = $storage;
        this.bookmarks = this.$storage.get();
        
        this.pagination = pagination;
        this.pagination.init({
            items: this.bookmarks,
            pageSize: 20
        });
    }

    /**
     * Return the bookmarks to be shown on a page
     */
    getBookmarksPerPage() {
        return this.pagination.itemsPerPage(this.bookmarks);
    }

    /**
     * Trigger a storage update
     */
    $save() {
        this.$storage.save(this.bookmarks);
    }

    /**
     * @param {string} url New bookmark url to add
     * @return Promise
     * 
     * @description 
     *      - Using timestamp as unique identifier 
     *      - Pushing the new bookmark on top of the array
     */
    addNewBookmark(url) {
        return new Promise((resolve, reject) => {
            let bookmark = this.bookmarks.find(b => b.url === url);
            if (!!bookmark === false) {
                let timestamp = +new Date(); // .valueOf();
                let index = this.bookmarks.length + 1;
                resolve (
                    this.bookmarks.unshift({url, timestamp, index})
                );
            }
            else reject(bookmark);
        });
    }
 
    removeBookmark(bookmark) {
        let index = this.bookmarks.findIndex(b => b.timestamp === bookmark.timestamp);
        if (index > -1) {
            this.bookmarks.splice(index, 1);
        }
    }

    updateBookmark(bookmarkTarget, newUrl) {
        let bookmark = this.bookmarks.find(b => b.timestamp === bookmarkTarget.timestamp);
        if (bookmark){
            bookmark.url = newUrl;
        }
    }

    getLatestEntry() {
        return this.bookmarks.slice(-1);
    }
}
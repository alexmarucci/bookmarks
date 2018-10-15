/**
 * @class BookmarkDetailsController
 * @description Responsible to handle a single bookmark
 */
export default class BookmarkDetailsController {
    
    /**
     * @param  {ChildScope} $scope
     * @param  {Timeout} $timeout
     * @param  {StoreService} store
     */
    constructor($scope, $timeout, store) {
        this.store = store;
        this.$timeout = $timeout;
    }
    /**
     * @description When the component has been initialise then initialise also own properties
     */
    $onInit() {
        this.editedBookmark = this.bookmark.url;
    }

    /**
     * @description Trigger the edit mode one
     */
    edit() {
        this.editing = true;
    }

    /**
     * @description It would reset the editedBookmark var and trigger the editing flag off
     */
    revertEdit() {
        this.editedBookmark = this.bookmark.url;
        this.editing = false;
    }

    /**
     * @description Trigger removeBookmark action in the Store
     */
    delete() {
        this.store.removeBookmark(this.bookmark);
    }
    
    /**
     * @description
     *      Trigger updateBookmark action in the store with 200ms of delay.
     *      The delay helps to serve all the other methods first this way if revertEdit has been triggered
     *      the input would be reset avoiding the unexpected behaviour of saving the edits;
     */
    save() {
        this.$timeout(() => {
            this.editing = false;
            if (this.editedBookmark !== this.bookmark.url) {
                this.store.updateBookmark(this.bookmark, this.editedBookmark);
            }
        }, 200);
    }

    static getTemplateUrl() {
        return 'app/js/controllers/bookmark-details/bookmark-details.html';
    }
}

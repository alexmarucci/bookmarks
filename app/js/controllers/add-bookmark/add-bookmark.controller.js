/**
 * @class AddBookmarkController
 * @description Responsible to handle the addBookmark form
 */
export default class AddBookmarkController {
    /**
     * @param  {ChildScope} $scope
     * @param  {StoreService} store
     * @param  {NotificationService} notification
     * @description Inject Services and initialise own properties
     */
    constructor($scope, store, notification) {
        this.$scope = $scope;
        this.notification = notification;
        this.store = store;
        this.url = "";
    }

    
    /**
     * @description If the form has been validated then trigger addNewBookmark action from the store
     *      Once it's done, it would trigger a new notification;
     */
    add() {
        let formIsValid = this.$scope.addBookmarkForm.$valid;
        if (formIsValid) {
            this.store.addNewBookmark(this.url)
                .then((r) => {this.notification.show({msg: 'New Bookmark added'})})
                .catch((err) => { this.notification.show({msg: 'duplicate', type: this.notification.MSG_ERROR}) });
            this.reset();
        }
    }

    reset() {
        this.url = "";
    }

    static getTemplateUrl() {
        return 'app/js/controllers/add-bookmark/add-bookmark.html';
    }
}
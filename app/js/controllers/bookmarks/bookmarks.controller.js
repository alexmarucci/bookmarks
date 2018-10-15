import Controller from "../base.controller";

/**
 * @class BookmarkDetailsController
 * @description Responsible to handle the bookmarks list
 */
export default class BookmarksController extends Controller {
    
    /**
     * @param  {ChildScope} $scope
     * @param  {RouteParams} $routeParams
     * @param  {StoreService} store
     * @param  {NotificationService} notification
     * 
     * @description Here we are deep watching the bookmarks of the store for any changing;
     *      If so we are triggering his $save() method which would save the data into the storage;
     */
    constructor($scope, $routeParams, store, notification) {
        super();
        
        this.store = store;
        
        /** If bookmarks changed, then save it into the storage  */
        let deep;
        $scope.$watch(() => this.bookmarks, () => store.$save(), deep=true);
    }
    
    /**
     * @description Used as computed property, this would make sure the view reflect the bookmarks always.
     */
    get bookmarks() {
        return this.store.getBookmarksPerPage();
    }

    static getTemplateUrl() {
        return 'app/js/controllers/bookmarks/bookmarks.html';
    }
}
import angular from "angular";
import angularRoute from 'angular-route';
import Router from './router';
import BookmarksController from "./controllers/bookmarks/bookmarks.controller";
import BookmarkDetailsController from "./controllers/bookmark-details/bookmark-details.controller";
import AddBookmarkController from "./controllers/add-bookmark/add-bookmark.controller";
import GlobalNotificationsController from "./controllers/global-notifications/global-notifications.controller";
import PaginationController from "./controllers/pagination/pagination.controller";
import AutoFocusDirective from "./directives/auto-focus.directive";
import UrlInputDirective from "./directives/url-input.directive";
import UrlExistsDirective from "./directives/url-exists.directive";
import StoreService from './services/store.service';
import LocalStorage from './services/storage.service';
import NotificationService from './services/notification.service';
import PaginationService from "./services/pager.service";

/** @constant LocalStorage singleton */
const localStorage = new LocalStorage('bookmarks-list');

/**
* The main Bookmarks app module
*
* @type {angular.Module}
*/
angular.module('bookmarks', ['ngRoute'])
    .config(Router)
    .service('$storage', () => localStorage)
    .service('store', StoreService)
    .service('notification', NotificationService)
    .service('pagination', PaginationService)
    .directive('autoFocus', ($timeout) => new AutoFocusDirective($timeout))
    .directive('urlInput', () => new UrlInputDirective())
    .directive('urlExists', ($q, $timeout) => new UrlExistsDirective($q, $timeout))
    .controller('AddBookmarkController', AddBookmarkController)
    .controller('BookmarksController', BookmarksController)
    .controller('BookmarkDetailsController', BookmarkDetailsController)
    .controller('GlobalNotificationsController', GlobalNotificationsController)
    .controller('PaginationController', PaginationController)
    .component('bookmarkDetails', {
        bindings: {bookmark: '<'}, // One-Way binding
        controller: 'BookmarkDetailsController',
        templateUrl: BookmarkDetailsController.getTemplateUrl()
    })
    .component('addBookmark', {
        controller: 'AddBookmarkController',
        templateUrl: AddBookmarkController.getTemplateUrl()
    })
    .component('globalNotification', {
        controller: 'GlobalNotificationsController',
        templateUrl: GlobalNotificationsController.getTemplateUrl()
    })
    .component('pagination', {
        controller: 'PaginationController',
        templateUrl: PaginationController.getTemplateUrl()
    });

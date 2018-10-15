import BookmarksController from './controllers/bookmarks/bookmarks.controller';
/** main route config */
export default function routerConfig($provide, $routeProvider, $locationProvider) {
  $provide.factory('$routeProvider', () => $routeProvider);
  /** Remove ugly /#! */
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      name: 'overview',
      templateUrl: BookmarksController.getTemplateUrl(),
      controllerAs: 'controller',
      controller: 'BookmarksController',
    })
    .otherwise({redirectTo: '/'});
}

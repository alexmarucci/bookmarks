/**
 * @class UrlExistsDirective
 * @description It will fetch the url and the response would decide if it exists of not. 
 */
export default class UrlExistsDirective {
    constructor($q, $timeout) {
        let linkFn = (scope, elm, attrs, ngModel) => {
            // Add an async validator
            ngModel.$asyncValidators.urlExists = (url) => {
                var def = $q.defer();
                let urlIsValid = ngModel.$validators.urlInput(url);
                $timeout(function() {
                    if (urlIsValid) {
                        fetch(url, {mode: 'no-cors', headers: {'Access-Control-Allow-Origin': '*'}})
                            .then(res => {
                                if (res.ok || res.type === 'opaque') {
                                    def.resolve();
                                } else {
                                    def.reject();
                                }
                            })
                    } else {
                        def.reject();
                    }
        
                }, 0);
        
                return def.promise;
            };
        };
        
        let directive = {
            require: 'ngModel', // inject ngModel onto the link function
            restrict: 'A', // Use this directive as an attribute
            link: linkFn
        };
      
        return directive;
    }
}
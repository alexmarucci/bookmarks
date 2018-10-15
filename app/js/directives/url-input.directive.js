/**
 * @class UrlInputDirective
 * @description It will match the input against a custom url regex;
 */
export default class UrlInputDirective {
    constructor() {
        const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        let urlInputValidation = (value) => URL_REGEX.test(value);

        let linkFn = (scope, elm, attrs, ctrl) => ctrl.$validators.urlInput = urlInputValidation;
        
        let directive = {
            restrict: 'A', // Use this directive as an attribute
            require: 'ngModel', // inject ngModel onto the link function
            link: linkFn
          };
      
          return directive;
    }
}
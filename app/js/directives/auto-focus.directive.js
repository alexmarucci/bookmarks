/**
 * @class AutoFocusDirective
 * @description Will automatically give focus to an element whenever the property passed to it is true
 */
export default class AutoFocusDirective {
    constructor($timeout) {
        let fn = (scope, elem, attrs) => {
			scope.$watch(attrs.autoFocus, function (newVal) {
				if (newVal) {
                    $timeout(() => elem[0].focus(), 0, false);
				}
			});
        };
        
        let directive = {
            restrict: 'A', // Use this directive as an attribute
            link: fn
          };
      
          return directive;
    }
}
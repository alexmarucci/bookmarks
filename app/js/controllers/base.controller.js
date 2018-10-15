/**
 * @class Controller
 * @description BaseController useful to store custom funcionality to be used across the controller
 */
export default class Controller {
	constructor() {}

	static getTemplateUrl() {
		throw `No template url set for class ${this.name}, please add a getTemplateUrl() function in the ${this.name} class to return a valid template url.`;
	}
	
	static getControllerTemplateName() {
		return 'controller';
	}
}
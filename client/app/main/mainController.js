import angular from 'angular';

class MainController {
	constructor() {
		this.user = {name: "World"};
	}
}

export default angular.module('mainControllerModule', [])
	.controller('MainController', MainController);

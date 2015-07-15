import angular from 'angular';

class MainController {
	constructor() {
		this.user = {name: "Abhi"};
	}
}

export default angular.module('mainControllerModule', [])
	.controller('MainController', MainController);

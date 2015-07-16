import 'angular-mocks';
import mainControllerModule from './mainController';

describe("mainController", function() {
	'use strict';
	var mainController;
	beforeEach(angular.mock.module(mainControllerModule.name));
	it("should be defined", angular.mock.inject(function($controller) {
		mainController = $controller('MainController');
		expect(mainController).toBeDefined();
	}));

	it("should have a user defined", angular.mock.inject(function($controller) {
		mainController = $controller('MainController');
		expect(mainController.user).toBeDefined();
		expect(mainController.user.name).toEqual('World');
	}));
});

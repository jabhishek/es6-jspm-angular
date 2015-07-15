import angular from 'angular';
import mainTemplate from './main.html!text';
import 'angular-ui-router';
import mainControllerModule from './mainController';

export default angular.module('mainModule',
	['ui.router', mainControllerModule.name])
	.config([
		'$stateProvider', function ($stateProvider) {
			'use strict';
			$stateProvider
				.state('home', {
					url: '/',
					controller: 'MainController',
					controllerAs: 'vm',
					template: mainTemplate
				});
		}
	]);

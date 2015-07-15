import angular from 'angular';
import mainModule from './main/mainModule';

export default angular.module('AngularApp', [mainModule.name])
.config([
		'$compileProvider', '$urlRouterProvider', '$locationProvider', function ($compileProvider, $urlRouterProvider, $locationProvider) {
			'use strict';
			$compileProvider.debugInfoEnabled(false);

			$urlRouterProvider.otherwise('/');

			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});
		}
	]);

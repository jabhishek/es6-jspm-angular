import angular from 'angular';
import appModule from './app';

angular.element(document).ready(function() {
	'use strict';
	angular.bootstrap(document.querySelector('[data-app]'), [
		appModule.name
	], {
		strictDi: true
	});
});
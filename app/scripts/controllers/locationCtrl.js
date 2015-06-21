'use strict';
var appControllers = angular.module('jerk.fewo.location', ['uiGmapgoogle-maps']);


appControllers.controller('LocationCtrl', function($scope){
$scope.map = { center: { latitude: 53.456761, longitude: 5.798592}, zoom: 14 };
$scope.marker = { id: 0, coords: { latitude: 53.456761, longitude: 5.798592}, options: {labelContent: 'Jerk Ferienhaus'}};
});
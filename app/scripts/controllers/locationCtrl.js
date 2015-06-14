'use strict';
var appControllers = angular.module('jerk.fewo.location', ['uiGmapgoogle-maps']);


appControllers.controller('LocationCtrl', function($scope){
$scope.map = { center: { latitude: 53.456603, longitude: 5.798587}, zoom: 14 };
});
var appControllers = angular.module('locationModule', ['uiGmapgoogle-maps']);


appControllers.controller('LocationCtrl', function($scope){
$scope.map = { center: { latitude: 53.456603, longitude: 5.798587}, zoom: 14 };
});
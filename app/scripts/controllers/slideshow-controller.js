'use strict';
var appControllers = angular.module('jerk.fewo.slideshow', []);

appControllers.controller('SlideshowCtrl', ['$scope', function($scope) {
    $scope.imageData = [
    {
      path: 'images/img1.jpg',
      name: 'Pic 1'
    }, {
      path: 'images/img2.jpg',
      name: 'Pic 2'
    }, {
      path: 'images/img3.jpg',
      name: 'Pic 3'
    }, {
      path: 'images/img4.jpg',
      name: 'Pic 4'
    }];
  }
  ]);

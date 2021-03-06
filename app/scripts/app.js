'use strict';

/**
 * @ngdoc overview
 * @name jerkFewoApp
 * @description
 * # jerkFewoApp
 *
 * Main module of the application.
 */
angular.module('jerkFewoApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngTouch', 
    'jerk.fewo.slideshow',
    'slick', 
    'jerk.fewo.location',
    'uiGmapgoogle-maps',
    'jerk.fewo.house',
    'jerk.fewo.contact',
    'jerk.fewo.impress'
  ]).config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/haus', {
        templateUrl: 'views/haus.html',
        controller: 'HouseCtrl'
      })
      .when('/bilder', {
        templateUrl: 'views/bilder.html',
        controller: 'SlideshowCtrl'
      })
      .when('/lage', {
        templateUrl: 'views/lage.html',
        controller: 'LocationCtrl'
      })
      .when('/kontakt', {
        templateUrl: 'views/kontakt.html',
        controller: 'ContactCtrl'
      })
      .when('/impressum', {
        templateUrl: 'views/impressum.html',
        controller: 'ImpressCtrl'
      })
      .when('/kalender', {
        templateUrl: 'views/kalender.html'
      })
      .when('/404', {
        templateUrl: '404.html'
      })
      .otherwise({
        redirectTo: '/404'});
  })
  ;
 

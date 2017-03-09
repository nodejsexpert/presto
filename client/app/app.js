/**
 * 
 * AngularJS Boilerplate
 * @description           Description
 * @author                Jozef Butko // www.jozefbutko.com/resume
 * @url                   www.jozefbutko.com
 * @version               1.1.7
 * @date                  March 2015
 * @license               MIT
 * 
 */
;(function() {


  /**
   * Definition of the main app module and its dependencies
   */
  angular
    .module('boilerplate', [
      'ngRoute','angularModalService','ngMask','ngPatternRestrict','ui.router'
    ])
    .config(config);
    

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider','$stateProvider','$urlRouterProvider'];
  

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   * 
   */
  function config($routeProvider, $locationProvider, $httpProvider, $compileProvider,$stateProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(false);

    // routes
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'SignupController',
        controllerAs: 'main'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/setup', {
        templateUrl: 'views/setup.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'SignupController',
        controllerAs: 'main'
      })
      .when('/help', {
        templateUrl: 'views/help.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/verify', {
        templateUrl: 'views/verify.html',
        controller: 'SignupController',
       
      })
       .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'RouteController',
      
      })
       .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'RouteController',
       
      })
       .when('/loans', {
        templateUrl: 'views/loans.html',
        controller: 'RouteController',
     
      })
       .when('/:id/unavailable', {
        templateUrl: 'views/404.html',
        controller: 'RouteController',
$routeProvider
      })
      .when('/logout',{
      templateUrl:'views/login.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .when('/watchshow',{
      templateUrl:'providers/watchshow.html',
    })
    .when('/buy',{
      templateUrl:'providers/buy.html',
      controller:'LoanController'
    })
      .when('/loanprov',{
      templateUrl:'views/loanprovide.html',
      controller: 'LoanController',
    })
      .otherwise({
        redirectTo: '/'
      });
   

    $httpProvider.interceptors.push('authInterceptor');

    		$stateProvider
			.state('verify', {
				name: 'verify',
				url: '/verify',
			  })
      .state('dashboard',{
        name: 'dashboard',
        url: '/dashboard',
      })
       

  }


  /**
   * You can intercept any request or response inside authInterceptor
   * or handle what should happend on 40x, 50x errors
   * 
   */
  angular
    .module('boilerplate')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

  function authInterceptor($rootScope, $q, LocalStorage, $location) {

    return {

      // intercept every request
      request: function(config) {
        config.headers = config.headers || {};
        return config;
      },

      // Catch 404 errors
      responseError: function(response) {
        if (response.status === 404) {
          $location.path('/');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }


  /** angular.module('boilerplate', ['ngCookies'])
  .run(function ($http, $cookies) {
    $http.defaults.headers.post['x-csrf-token'] = $cookies._csrf;
  });
  
   * Run block
   */
  angular
    .module('boilerplate')
    .run(run);

  run.$inject = ['$rootScope', '$location','$http'];

  function run($rootScope, $location,$http) {


    // put here everything that you need to run on page load

  }


})();

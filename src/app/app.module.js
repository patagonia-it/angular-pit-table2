angular
  .module('angular-pit-table', ['ui.router', 'restangular'])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/demo');

    $stateProvider
      .state('demo', {
        url: '/demo',
        component: 'demo'
      });
  })
  .config(function (pitTableProvider, ANGULAR_PIT_TABLE) {
    pitTableProvider.setOptions(ANGULAR_PIT_TABLE);
  })
  .config(function (RestangularProvider, ENV) {
    RestangularProvider.setBaseUrl(ENV.backendUrl);
  });

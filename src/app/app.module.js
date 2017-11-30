angular
  .module('angular-pit-table', ['ui.router', 'darthwade.dwLoading', 'ngMaterial'])
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
  .run(function ($loading, pitTable) {
    $loading.setDefaultOptions({
      text: pitTable.loadingTableText,
      spinnerOptions: {
        lines: 8,
        length: 0,
        width: 10,
        radius: 15
      }
    });
  });

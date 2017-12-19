angular
  .module('angular-pit-table', ['ngMaterial', 'angular-loading-bar'])
  .config(function (pitTableProvider, ANGULAR_PIT_TABLE) {
    pitTableProvider.setOptions(ANGULAR_PIT_TABLE);
  })
  .config(function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = false;
    cfpLoadingBarProvider.parentSelector = '#loading-container';
  });
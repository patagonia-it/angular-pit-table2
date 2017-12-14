angular
  .module('angular-pit-table', ['darthwade.dwLoading', 'ngMaterial', 'ngCsv'])
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

angular.module('angular-pit-table')
.constant('ANGULAR_PIT_TABLE', {
  pageRadious: 2,
  pageSize: 30,
  emptyTableText: 'Ningún dato disponible en esta tabla.',
  loadingTableText: 'Cargando datos...',
  uiFramework: 'bootstrap',
  pageSizes: [
    10,
    25,
    50,
    100
  ]
})
.constant('ENV', {
  backendUrl: 'http://localhost:3000'
});

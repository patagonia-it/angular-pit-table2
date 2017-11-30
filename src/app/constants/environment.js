angular.module('angular-pit-table')
.constant('ANGULAR_PIT_TABLE', {
  pageRadious: 2,
  pageSize: 20,
  emptyTableText: 'Ningún dato disponible en esta tabla.',
  loadingTableText: 'Cargando datos...',
  uiFramework: 'bootstrap'
})
.constant('ENV', {
  backendUrl: 'http://localhost:3000'
});

angular.module('angular-pit-table')
.constant('ANGULAR_PIT_TABLE', {
  pageRadious: 2,
  pageSize: 10,
  emptyTableText: 'Ningún dato disponible en esta tabla.',
  loadingTableText: 'Cargando datos...',
  uiFramework: 'material',
  pageSizes: [
    10,
    25,
    50,
    100
  ],
  searchTrigger: 2
})
.constant('ENV', {
  backendUrl: 'http://localhost:3000'
});

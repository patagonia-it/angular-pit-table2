angular
  .module('angular-pit-table')
  .component('pthd', {
    templateUrl: 'app/components/pit_table/pit-table-header.html',
    bindings: {
      column: '<'
    },
    controller: function () {

    }
  });

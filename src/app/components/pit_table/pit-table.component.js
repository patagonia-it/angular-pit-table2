angular
  .module('angular-pit-table')
  .component('ptable', {
    templateUrl: 'app/components/pit_table/pit-table.html',
    bindings: {
      ptColumns: '<',
      ptParameters: '<',
      ptData: '<'
    },
    controller: function (pitTable) {
      var ctrl = this;
      ctrl.uiFramework = pitTable.uiFramework;
    }
  });

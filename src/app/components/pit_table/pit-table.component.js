angular
  .module('angular-pit-table')
  .component('pitTable', {
    templateUrl: 'app/components/pit_table/pit-table.html',
    controller: function (pitTable) {
      this.uiFramework = pitTable.uiFramework;
    }
  });

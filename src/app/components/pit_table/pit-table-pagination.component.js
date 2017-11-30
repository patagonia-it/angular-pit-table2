angular
  .module('angular-pit-table')
  .component('ptpage', {
    templateUrl: 'app/components/pit_table/pit-table-pagination.html',
    require: {
      ptableCtrl: '^ptable'
    },
    controller: function () {
    }
  });

angular
  .module('angular-pit-table')
  .component('ptable', {
    templateUrl: 'app/components/pit_table/pit-table.html',
    bindings: {
      ptColumns: '<',
      ptParameters: '<',
      ptData: '='
    },
    controller: function (pitTable, $log, $http, ENV) {
      var ctrl = this;
      ctrl.uiFramework = pitTable.uiFramework;

      ctrl.loadData = function() {
        $http.get(ENV.backendUrl + ctrl.ptParameters.url).then(function (response) {
          ctrl.ptData = response.data;
        }, function () {
          $log.error('Ha ocurrido un error al intentar obtener la información.');
        });
      };

      ctrl.$onInit = function () {
        ctrl.loadData();
      };

      ctrl.$onChanges = function (changes) {
        $log.info(changes);
      };
    }
  });

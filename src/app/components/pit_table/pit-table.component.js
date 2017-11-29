angular
  .module('angular-pit-table')
  .component('ptable', {
    templateUrl: 'app/components/pit_table/pit-table.html',
    bindings: {
      ptColumns: '<',
      ptParameters: '<',
      ptData: '<'
    },
    controller: function (pitTable, $log, $http, ENV) {
      var ctrl = this;
      ctrl.uiFramework = pitTable.uiFramework;
      ctrl.utils = {
        sort: [],
        pagination: {
          page: 0,
          size: pitTable.pageSize
          // totalRows: 0,
          // totalPages: 0
        }
      };

      ctrl.$onInit = function () {
        ctrl.ptParameters.loadData = function () {
          getData();
        };

        ctrl.ptParameters.loadData();
      };

      var getSort = function () {
        ctrl.utils.sort = [];
        angular.forEach(ctrl.ptColumns, function (ptColumn) {
          if (ptColumn.sort === 'asc' || ptColumn.sort === 'desc') {
            ctrl.utils.sort.push(ptColumn.id + ',' + ptColumn.sort);
          }
        });
      };

      var getData = function () {
        getSort();
        var object = {
          url: ENV.backendUrl + ctrl.ptParameters.url,
          method: ctrl.ptParameters.method
        };

        if (!ctrl.ptParameters.inBody || ctrl.ptParameters.projection) {
          object.params = angular.extend({}, ctrl.ptParameters.params, {sort: ctrl.utils.sort});
        } else {
          object.data = ctrl.ptParameters.params;
        }

        $http(object).then(function (response) {
          ctrl.ptData = response.data.content;
          ctrl.utils.pagination.page = response.data.number;
          ctrl.utils.pagination.totalRows = response.data.totalElements;
          ctrl.utils.pagination.totalPages = response.data.totalPages;
        }, function () {
          $log.error('Ha ocurrido un error al intentar obtener la información.');
        });
      };
    }
  });

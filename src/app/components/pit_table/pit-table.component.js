angular
  .module('angular-pit-table')
  .component('ptable', {
    templateUrl: 'app/components/pit_table/pit-table.html',
    bindings: {
      ptColumns: '<',
      ptParameters: '<',
      ptData: '<'
    },
    controller: function (pitTable, $log, $http, ENV, $loading) {
      var ctrl = this;
      ctrl.uiFramework = pitTable.uiFramework;
      ctrl.isLoading = false;
      ctrl.utils = {
        sort: [],
        pagination: {
          page: 0,
          size: pitTable.pageSize,
          totalRows: 0,
          totalPages: 0
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

        $loading.start('data');
        ctrl.isLoading = true;
        $http(object).then(function (response) {
          ctrl.ptData = response.data.content;
          ctrl.utils.pagination.page = ctrl.ptParameters.projection ? response.data.page.number: response.data.number;
          ctrl.utils.pagination.totalRows = ctrl.ptParameters.projection ? response.data.page.totalElements : response.data.totalElements;
          ctrl.utils.pagination.totalPages = ctrl.ptParameters.projection ? response.data.page.totalPages : response.data.totalPages;
        }, function () {
          $log.error('Ha ocurrido un error al intentar obtener la información.');
        }).finally(function () {
          $loading.finish('data');
          ctrl.isLoading = false;
        });
      };
    }
  });

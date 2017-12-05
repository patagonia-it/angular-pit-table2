angular
  .module('angular-pit-table')
  .component('ptable', {
    templateUrl: 'app/components/pit_table/pit-table.html',
    bindings: {
      ptColumns: '<',
      ptParameters: '<',
      ptData: '<',
      selectedC: '<',
      unSelectedC: '<'
    },
    controller: function (pitTable, $log, $http, ENV, $loading) {
      var ctrl = this;
      ctrl.emptyTableText = pitTable.emptyTableText;
      ctrl.uiFramework = pitTable.uiFramework;
      ctrl.isLoading = false;
      ctrl.utils = {
        sort: [],
        pagination: {
          page: 0,
          size: pitTable.pageSize,
          totalRows: 0,
          totalPages: 0
        },
        search: '',
        pageSizes: pitTable.pageSizes,
        allSelected: false
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

        object.params = {
          sort: ctrl.utils.sort,
          page: ctrl.utils.pagination.page,
          size: ctrl.utils.pagination.size
        };

        if (ctrl.utils.search) {
          object.params.search = ctrl.utils.search;
        }

        if (ctrl.ptParameters.projection) {
          angular.extend(object.params, {projection: ctrl.ptParameters.projection});
        }

        if (!ctrl.ptParameters.inBody || ctrl.ptParameters.projection) {
          angular.extend(object.params, ctrl.ptParameters.params);
        } else {
          object.data = ctrl.ptParameters.params;
        }

        $loading.start('data');
        ctrl.isLoading = true;
        $http(object).then(function (response) {
          ctrl.ptData = response.data.content;
          if (ctrl.ptParameters.hasSelect) {
            ctrl.ptDataTemp = angular.copy(response.data.content);
            initSelected(response.data.content);
          }
          ctrl.utils.pagination.page = ctrl.ptParameters.projection ? response.data.page.number : response.data.number;
          ctrl.utils.pagination.totalRows = ctrl.ptParameters.projection ? response.data.page.totalElements : response.data.totalElements;
          ctrl.utils.pagination.totalPages = ctrl.ptParameters.projection ? response.data.page.totalPages : response.data.totalPages;
          
        }, function () {
          $log.error('Ha ocurrido un error al intentar obtener la información.');
        }).finally(function () {
          $loading.finish('data');
          ctrl.isLoading = false;
        });
      };

      ctrl.columnOrder = function (column) {
        if (angular.isUndefined(column.sort) || !ctrl.ptData.length) {
          return;
        }
        angular.forEach(ctrl.ptColumns, function (ptColumn) {
          if (column.id === ptColumn.id) {
            if (ptColumn.sort === 'natural') {
              ptColumn.sort = 'asc';
            } else if (ptColumn.sort === 'asc') {
              ptColumn.sort = 'desc';
            } else {
              ptColumn.sort = 'natural';
            }
            return;
          }
        });

        ctrl.ptParameters.loadData();
      };

      ctrl.thIconClass = function (sort) {
        if (angular.isDefined(sort)) {
          return ctrl.uiFramework === 'bootstrap' ? {
            'pull-right fa fa-sort': sort === 'natural',
            'pull-right fa fa-sort-desc': sort === 'desc',
            'pull-right fa fa-sort-asc': sort === 'asc'
          } : {
            'md-sort md-sort-icon': sort === 'natural',
            'md-sort md-sort-icon md-desc': sort === 'desc',
            'md-sort md-sort-icon md-asc': sort === 'asc'
          };
        }
      };

      var initSelected = function (data) {
        var cont = 0;
        angular.forEach(data, function (item) {
          if (item.isCheck) {
            cont++;
          }

          angular.forEach(ctrl.selectedC, function (value) {
            if (item.id === value) {
              item.isCheck = true;
              cont++;
            }
          });

          angular.forEach(ctrl.unSelectedC, function (value) {
            if (item.id === value) {
              item.isCheck = false;
              cont--;
            }
          });
        });

        ctrl.utils.allSelected = (cont === data.length);
      };
    }
  });

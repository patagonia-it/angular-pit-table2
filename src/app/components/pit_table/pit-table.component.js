angular
  .module('angular-pit-table')
  .component('ptable', {
    templateUrl: 'app/components/pit_table/pit-table.html',
    bindings: {
      ptColumns: '<',
      ptParameters: '<',
      ptData: '=',
      selectedC: '<',
      unSelectedC: '<'
    },
    controller: function (pitTable, $log, $http, $rootScope, cfpLoadingBar) {
      var ctrl = this;
      ctrl.emptyTableText = pitTable.emptyTableText;
      ctrl.loadingTableText = pitTable.loadingTableText;
      ctrl.uiFramework = pitTable.uiFramework;
      ctrl.formatDateExport = pitTable.formatDateExport;
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
        allSelected: false,
        searchTrigger: pitTable.searchTrigger
      };

      $rootScope.$on('cfpLoadingBar:started', function() {
        ctrl.isLoading = true;
      });

      $rootScope.$on('cfpLoadingBar:completed', function() {
        ctrl.isLoading = false;   
      });

      ctrl.$onInit = function () {
        ctrl.ptParameters.loadData = function () {
          getData();
        };

        ctrl.ptParameters.loadData();
      };

      var getSort = function () {
        ctrl.utils.sort = [];
        for(var i = 0; i < ctrl.ptColumns.length; i++) {
          if(ctrl.ptColumns[i].sortable && angular.isDefined(ctrl.ptColumns[i].sort)) {
            if(!ctrl.ptParameters.multipleOrder){
              if(ctrl.ptColumns[i].sort !== 'natural') {
                ctrl.utils.sort.push(ctrl.ptColumns[i].id + ',' + ctrl.ptColumns[i].sort);
                break;
              }
            }else{
              ctrl.utils.sort.push(ctrl.ptColumns[i].id + ',' + ((ctrl.ptColumns[i].sort === 'natural') ? 'asc' : ctrl.ptColumns[i].sort));
            }
          }
        }  
      };

      var getData = function () {
        getSort();
        var object = {
          url: ctrl.ptParameters.url,
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

        cfpLoadingBar.start();
        $http(object).then(function (response) {
          var data = ctrl.ptParameters.projection ? response.data._embedded[ctrl.ptParameters.projection] : response.data.content;
          ctrl.ptData = data;
          if (ctrl.ptParameters.selectId) {
            ctrl.ptDataTemp = angular.copy(data);
            initSelected(data);
          }
          ctrl.utils.pagination.page = ctrl.ptParameters.projection ? response.data.page.number : response.data.number;
          ctrl.utils.pagination.totalRows = ctrl.ptParameters.projection ? response.data.page.totalElements : response.data.totalElements;
          ctrl.utils.pagination.totalPages = ctrl.ptParameters.projection ? response.data.page.totalPages : response.data.totalPages;
        }, function () {
          $log.error('Ha ocurrido un error al intentar obtener la información.');
        }).finally(function () {
          cfpLoadingBar.complete();
        });
      };

      ctrl.columnOrder = function (column) {
        if (angular.isUndefined(column.sort) || !ctrl.ptData.length) {
          return;
        }

        for(var i = 0; i < ctrl.ptColumns.length; i++) {
          if (column.id === ctrl.ptColumns[i].id) {
            if (ctrl.ptColumns[i].sort === 'natural') {
              ctrl.ptColumns[i].sort = 'asc';
            } else if (ctrl.ptColumns[i].sort === 'asc') {
              ctrl.ptColumns[i].sort = 'desc';
            } else {
              ctrl.ptColumns[i].sort = 'natural';
            }

            if(ctrl.ptParameters.multipleOrder) {
              break;
            }
          } else {
            if(!ctrl.ptParameters.multipleOrder) {
              ctrl.ptColumns[i].sort = 'natural';
            }
          }
        }
        ctrl.ptParameters.loadData();
      };

      ctrl.thIconClass = function (sort) {
        if (angular.isDefined(sort)) {
          return ctrl.uiFramework === 'bootstrap' ? {
            'fa-sort': sort === 'natural',
            'fa-sort-desc': sort === 'desc',
            'fa-sort-asc': sort === 'asc'
          } : {
            'md-asc': sort === 'natural' || sort === 'asc',
            'md-desc': sort === 'desc'
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
            if (item[ctrl.ptParameters.selectId] === value) {
              item.isCheck = true;
              cont++;
            }
          });

          angular.forEach(ctrl.unSelectedC, function (value) {
            if (item[ctrl.ptParameters.selectId] === value) {
              item.isCheck = false;
              cont--;
            }
          });
        });

        ctrl.utils.allSelected = (cont === data.length && data.length > 0);
      };
    }
  });

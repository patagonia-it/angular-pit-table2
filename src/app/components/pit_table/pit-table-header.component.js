angular
  .module('angular-pit-table')
  .component('pthd', {
    templateUrl: 'app/components/pit_table/pit-table-header.html',
    require: {
      ptableCtrl: '^ptable'
    },
    bindings: {
      column: '<'
    },
    controller: function () {
      var ctrl = this;

      ctrl.columnOrder = function (column) {
        if (angular.isUndefined(column.sort)) {
          return;
        }
        angular.forEach(ctrl.ptableCtrl.ptColumns, function (ptColumn) {
          if (column.id === ptColumn.id) {
            if (ptColumn.sort === 'natural') {
              ptColumn.sort = 'asc';
            } else if (ptColumn.sort === 'asc') {
              ptColumn.sort = 'desc';
            } else {
              ptColumn.sort = 'natural';
            }
          }
        });
        ctrl.ptableCtrl.loadData();
      };

      ctrl.thIconClass = function (sort) {
        if (angular.isDefined(sort)) {
          return {
            'fa-sort': sort === 'natural',
            'fa-sort-desc': sort === 'desc',
            'fa-sort-asc': sort === 'asc'
          };
        }
      };
    }
  });

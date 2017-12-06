angular
  .module('angular-pit-table')
  .component('ptpsize', {
    templateUrl: 'app/components/pit_table/pit-table-pagination-size.html',
    require: {
      ptableCtrl: '^ptable'
    },
    controller: function () {
    	var ctrl = this;

      	ctrl.$onInit = function () {
        	ctrl.pageSizes = ctrl.ptableCtrl.utils.pageSizes;
        	ctrl.size = ctrl.ptableCtrl.utils.pagination.size;
      	};

      	ctrl.selectSize = function (size) {
      		ctrl.ptableCtrl.utils.pagination.page = 0;
        	ctrl.ptableCtrl.utils.pagination.size = size;
        	ctrl.ptableCtrl.ptParameters.loadData();
      	};
    }
  });

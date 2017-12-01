angular
  .module('angular-pit-table')
  .component('pttoolbar', {
    templateUrl: 'app/components/pit_table/pit-table-toolbar.html',
    require: {
      ptableCtrl: '^ptable'
    },
    controller: function () {
    	var ctrl = this;

    	ctrl.$onInit = function () {
    		ctrl.pageSizes = ctrl.ptableCtrl.utils.pageSizes;
    		ctrl.size = ctrl.ptableCtrl.utils.pagination.size;
    	};

    	ctrl.search = function (text) {
    		ctrl.ptableCtrl.utils.search = text;
    		ctrl.ptableCtrl.ptParameters.loadData();
    	};

    	ctrl.selectSize = function(size) {
    		ctrl.ptableCtrl.utils.pagination.size = size;
    		ctrl.ptableCtrl.ptParameters.loadData();
    	};
    }
});

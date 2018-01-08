angular
  .module('angular-pit-table')
  .component('ptpage', {
    templateUrl: 'app/components/pagination/pit-table-pagination.html',
    require: {
      ptableCtrl: '^ptable'
    },
    controller: function () {
    	var ctrl = this;

    	ctrl.showInfo = function () {
    		return 'Mostrando registros del '+ ((ctrl.ptableCtrl.utils.pagination.page * ctrl.ptableCtrl.utils.pagination.size) + 1) +' al '+ 
    		(ctrl.ptableCtrl.utils.pagination.totalRows%ctrl.ptableCtrl.utils.pagination.size === 0 ? (ctrl.ptableCtrl.utils.pagination.page + 1) * ctrl.ptableCtrl.utils.pagination.size : ctrl.ptableCtrl.utils.pagination.totalRows) +' de '+ (ctrl.ptableCtrl.utils.pagination.totalRows);
    	};

    	ctrl.showInfoMaterial = function () {
    		var from = (ctrl.ptableCtrl.utils.pagination.page * ctrl.ptableCtrl.utils.pagination.size) + 1;
    		var to = (ctrl.ptableCtrl.utils.pagination.page * ctrl.ptableCtrl.utils.pagination.size) + ctrl.ptableCtrl.utils.pagination.size;
    		return from +' - '+ (to > ctrl.ptableCtrl.utils.pagination.totalRows ? ctrl.ptableCtrl.utils.pagination.totalRows : to) +' de '+ ctrl.ptableCtrl.utils.pagination.totalRows;
    	};

    	ctrl.previous = function () {
    		ctrl.ptableCtrl.utils.pagination.page--;
    		ctrl.ptableCtrl.ptParameters.loadData();
    	};

    	ctrl.next = function () {
    		ctrl.ptableCtrl.utils.pagination.page++;
    		ctrl.ptableCtrl.ptParameters.loadData();
    	};

    	ctrl.getSelectPages = function () {
			var pages = [];
	    	for(var i = 0; i < ctrl.ptableCtrl.utils.pagination.totalPages; i++) {
	    		pages.push(i);
	    	}
	    	return pages;
		};

		ctrl.goToPage = function (page) {
    		ctrl.ptableCtrl.ptParameters.loadData();
		};    	
    }
  });

angular
  .module('angular-pit-table')
  .component('ptpage', {
    templateUrl: 'app/components/pit_table/pit-table-pagination.html',
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
    		return ((ctrl.ptableCtrl.utils.pagination.page * ctrl.ptableCtrl.utils.pagination.size) + 1) +' - '+ 
    		(ctrl.ptableCtrl.utils.pagination.totalRows%ctrl.ptableCtrl.utils.pagination.size === 0 ? (ctrl.ptableCtrl.utils.pagination.page + 1) * ctrl.ptableCtrl.utils.pagination.size : ctrl.ptableCtrl.utils.pagination.totalRows) +' de '+ (ctrl.ptableCtrl.utils.pagination.totalRows); 
    	};

    	ctrl.previous = function () {
    		ctrl.ptableCtrl.utils.pagination.page--;
    		ctrl.currentPage = ctrl.ptableCtrl.utils.pagination.page;
    		ctrl.ptableCtrl.ptParameters.loadData();
    	};

    	ctrl.next = function () {
    		ctrl.ptableCtrl.utils.pagination.page++;
    		ctrl.currentPage = ctrl.ptableCtrl.utils.pagination.page;
    		ctrl.ptableCtrl.ptParameters.loadData();
    	};

    	ctrl.getSelectPages = function () {
			var pages = [];
	    	for(var i = 0; i < ctrl.ptableCtrl.utils.pagination.totalPages; i++) {
	    		pages.push(i);
	    	}
	    	ctrl.currentPage = ctrl.currentPage ? ctrl.currentPage : pages[0];
	    	return pages;
		};

		ctrl.goToPage = function (page) {
			ctrl.ptableCtrl.utils.pagination.page = page;
    		ctrl.ptableCtrl.ptParameters.loadData();
		};    	
    }
  });

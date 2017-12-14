angular
  .module('angular-pit-table')
  .component('pttoolbar', {
    templateUrl: 'app/components/pit_table/pit-table-toolbar.html',
    require: {
      ptableCtrl: '^ptable'
    },
    controller: function ($http, $log) {
      var ctrl = this;

      ctrl.search = function (text) {
      	if(text !== '' && text.length > ctrl.ptableCtrl.utils.searchTrigger) {
      		ctrl.ptableCtrl.utils.pagination.page = 0;
        	ctrl.ptableCtrl.utils.search = text;
        	ctrl.ptableCtrl.ptParameters.loadData();
      	}else if(text === '') {
      		delete ctrl.filterModel;
        	ctrl.ptableCtrl.utils.search = text;
        	ctrl.ptableCtrl.ptParameters.loadData();
      	}
  		      	      
      };

      ctrl.removeSearch = function () {
        if (!ctrl.filterModel) {
          return;
        }
        delete ctrl.filterModel;
        ctrl.ptableCtrl.utils.search = '';
        ctrl.ptableCtrl.ptParameters.loadData();
      };

      ctrl.downloadCSV = function () {
        var object = {
          url: ctrl.ptableCtrl.ptParameters.url,
          method: ctrl.ptableCtrl.ptParameters.method
        };

        object.params = {
          sort: ctrl.ptableCtrl.utils.sort
        };

        if (ctrl.ptableCtrl.utils.search) {
          object.params.search = ctrl.ptableCtrl.utils.search;
        }

        if (ctrl.ptableCtrl.ptParameters.projection) {
          object.params = {projection: ctrl.ptableCtrl.ptParameters.projection};
        }

        if (!ctrl.ptableCtrl.ptParameters.inBody || ctrl.ptableCtrl.ptParameters.projection) {
          angular.extend(object.params, ctrl.ptableCtrl.ptParameters.params);
        } else {
          object.data = ctrl.ptableCtrl.ptParameters.params;
        }

        return $http(object).then(function (response) {
          return ctrl.ptableCtrl.ptParameters.projection ? response.data._embedded[ctrl.ptableCtrl.ptParameters.projection] : response.data.content;
        }, function () {
          $log.error('Ha ocurrido un error al intentar obtener la información.');
        });
      };

      ctrl.getCSVFilename = function() {
        return ctrl.ptableCtrl.ptParameters.tableName ? ctrl.ptableCtrl.ptParameters.tableName : 'export.csv';
      };
    }
  });

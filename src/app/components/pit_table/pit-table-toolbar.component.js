angular
  .module('angular-pit-table')
  .component('pttoolbar', {
    templateUrl: 'app/components/pit_table/pit-table-toolbar.html',
    require: {
      ptableCtrl: '^ptable'
    },
    controller: function ($http, ENV, $log) {
      var ctrl = this;

      ctrl.search = function (text) {
  		ctrl.ptableCtrl.utils.pagination.page = 0;
        ctrl.ptableCtrl.utils.search = text;
        ctrl.ptableCtrl.ptParameters.loadData();      	      
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
          url: ENV.backendUrl + ctrl.ptableCtrl.ptParameters.url,
          method: 'GET'
        };

        object.params = {
          sort: ctrl.ptableCtrl.utils.sort,
          page: ctrl.ptableCtrl.utils.pagination.page,
          size: ctrl.ptableCtrl.utils.pagination.size
        };

        if (ctrl.ptableCtrl.utils.search) {
          object.params.search = ctrl.ptableCtrl.utils.search;
        }

        if (ctrl.ptableCtrl.ptParameters.projection) {
          object.params = {projection: ctrl.ptableCtrl.ptParameters.projection};
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

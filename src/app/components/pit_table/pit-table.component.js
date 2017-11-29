angular
  .module('angular-pit-table')
  .component('ptable', {
    templateUrl: 'app/components/pit_table/pit-table.html',
    bindings: {
      ptColumns: '<',
      ptParameters: '<',
      ptData: '<'
    },
    controller: function (pitTable, $log, $http, ENV) {
      var ctrl = this;
      ctrl.uiFramework = pitTable.uiFramework;

      ctrl.startRequest = function() {
      	var sort = ctrl.getSort();

      	var object = {
      		url: ENV.backendUrl + ctrl.ptParameters.url,
      		method: ctrl.ptParameters.method
      	};

      	if(ctrl.ptParameters.inBody) {
      		object.data = ctrl.ptParameters.params;

      	}else{
      		object.params = angular.extend({}, ctrl.ptParameters.params, sort);
      	}

      	$http(object).then(function (response) {
          ctrl.ptData = response.data;
        }, function () {
          $log.error('Ha ocurrido un error al intentar obtener la información.');
        });
      };

      ctrl.$onInit = function () {

      	ctrl.startRequest();


        ctrl.ptParameters.loadData = function () {
		  	ctrl.startRequest();
	  	}

      };


      ctrl.$onChanges = function (changes) {

      };

      ctrl.getSort = function () {
        var sort = {};
        sort.sort = [];	
        
        angular.forEach(ctrl.ptColumns, function (ptColumn) {          
          if(ptColumn.sort == 'asc' || ptColumn.sort == 'desc') {           	
          	sort.sort.push(ptColumn.id +','+ ptColumn.sort);
          }
        });

        return sort;
      };     
    }
  });

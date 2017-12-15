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
          setColumnsNameCSV(ctrl.ptableCtrl.ptParameters.projection ? response.data._embedded[ctrl.ptableCtrl.ptParameters.projection] : response.data.content);
          return ctrl.ptableCtrl.ptParameters.projection ? response.data._embedded[ctrl.ptableCtrl.ptParameters.projection] : response.data.content;
        }, function () {
          $log.error('Ha ocurrido un error al intentar obtener la información.');
        });
      };

      ctrl.getCSVFilename = function() {
        return ctrl.ptableCtrl.ptParameters.tableName ? ctrl.ptableCtrl.ptParameters.tableName : 'export.csv';
      };

      var setColumnsNameCSV = function(data) {
        var fieldNames = [];
        var fieldIds = [];

        for(var j = 0; j < ctrl.ptableCtrl.ptColumns.length; j++){
          if(!containsObject(ctrl.ptableCtrl.ptColumns[j], fieldNames, 'name', 'id')) {
            if(ctrl.ptableCtrl.ptColumns[j].name) {
              fieldNames.push({key: ctrl.ptableCtrl.ptColumns[j].id, value: ctrl.ptableCtrl.ptColumns[j].name});
              if(fieldIds.indexOf(ctrl.ptableCtrl.ptColumns[j].id) === -1) fieldIds.push(ctrl.ptableCtrl.ptColumns[j].name);
            }else{
              fieldNames.push({key: ctrl.ptableCtrl.ptColumns[j].id, value: ctrl.ptableCtrl.ptColumns[j].id});
              if(fieldIds.indexOf(ctrl.ptableCtrl.ptColumns[j].id) === -1) fieldIds.push(ctrl.ptableCtrl.ptColumns[j].id);
            }
          }
        }

        for(var i = 0; i < data.length; i++) {
          var dataKeys = Object.keys(data[i]);
          // crea campo con nombre de la columna y el campo con el id eliminado
          for(var j = 0; j < fieldNames.length; j++) {
            if(dataKeys.indexOf(fieldNames[j].key) >= 0){
              data[i][fieldNames[j].value] = data[i][fieldNames[j].key];
              if(fieldNames[j].key.toLowerCase() !== 'id'){
                delete data[i][fieldNames[j].key];
              }              
            }else{
              data[i][fieldNames[j].value] = '-';
            }
          } 

          // elimina las columnas que no aparecen en la tabla
          for(var k = 0; k < dataKeys.length; k++) {
            if(fieldIds.indexOf(dataKeys[k]) === -1){
              delete data[i][dataKeys[k]];
            }
          }        
        }       

      };

      var containsObject = function(obj, data, property1, property2) {
        if(obj && data.length && property1 && property2) {
           for (var i = 0; i < data.length; i++) {
            if(data[i][property1] === obj[property1] && data[i][property2] === obj[property2]) {
              return true;
            }
          }
        }      
        
        return false;
      };

    }
  });

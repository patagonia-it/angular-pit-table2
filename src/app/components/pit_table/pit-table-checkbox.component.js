angular
  .module('angular-pit-table')
  .component('ptcheckbox', {
    templateUrl: 'app/components/pit_table/pit-table-checkbox.html',
    require: {
      ptableCtrl: '^ptable'
    },
    bindings: {
      inHeader: '=',
      item: '<'
    },
    controller: function () {
      var ctrl = this;
      ctrl.$onInit = function () {
        ctrl.selectItem = function (item) {
          var cont = 0;
          updateArray(item);

          angular.forEach(ctrl.ptableCtrl.ptData, function (value) {
            if (value.isCheck) {
              cont++;
            }
          });

          ctrl.ptableCtrl.utils.allSelected = (cont === ctrl.ptableCtrl.ptData.length);
        };

        ctrl.selectAll = function (selected) {
          angular.forEach(ctrl.ptableCtrl.ptDataTemp, function (value, key) {
            ctrl.ptableCtrl.ptData[key].isCheck = selected;
            var indexAdd = -1;
            var indexRemove = -1;
            if (selected) {
              indexAdd = ctrl.ptableCtrl.selectedC.indexOf(value[ctrl.ptableCtrl.ptParameters.selectId]);
              if (!value.isCheck && indexAdd < 0) {
                ctrl.ptableCtrl.selectedC.push(value[ctrl.ptableCtrl.ptParameters.selectId.selectId]);
              }

              indexRemove = ctrl.ptableCtrl.unSelectedC.indexOf(value[ctrl.ptableCtrl.ptParameters.selectId]);
              if (indexRemove > -1) {
                ctrl.ptableCtrl.unSelectedC.splice(indexRemove, 1);
              }
            } else {
              indexRemove = ctrl.ptableCtrl.selectedC.indexOf(value[ctrl.ptableCtrl.ptParameters.selectId]);
              if (value.isCheck && indexRemove < 0) {
                ctrl.ptableCtrl.unSelectedC.push(value[ctrl.ptableCtrl.ptParameters.selectId]);
              }

              indexAdd = ctrl.ptableCtrl.selectedC.indexOf(value[ctrl.ptableCtrl.ptParameters.selectId]);
              if (indexAdd > -1) {
                ctrl.ptableCtrl.selectedC.splice(indexAdd, 1);
              }
            }
          });
        };
      };

      function updateArray(item) {
        var exists = false;
        var arraySplice = item.isCheck ? ctrl.ptableCtrl.unSelectedC : ctrl.ptableCtrl.selectedC;
        var arrayPush = item.isCheck ? ctrl.ptableCtrl.selectedC : ctrl.ptableCtrl.unSelectedC;
        var indexSplice = arraySplice.indexOf(item[ctrl.ptableCtrl.ptParameters.selectId]);

        angular.forEach(ctrl.ptableCtrl.ptDataTemp, function (value) {
          var isCheck = item.isCheck ? !value.isCheck : value.isCheck;
          if (item[ctrl.ptableCtrl.ptParameters.selectId] === value[ctrl.ptableCtrl.ptParameters.selectId] && isCheck) {
            exists = true;
          }
        });

        if (arraySplice.length > 0 && indexSplice > -1) {
          arraySplice.splice(indexSplice, 1);
        }

        if (exists) {
          arrayPush.push(item[ctrl.ptableCtrl.ptParameters.selectId]);
        }
      }
    }
  });

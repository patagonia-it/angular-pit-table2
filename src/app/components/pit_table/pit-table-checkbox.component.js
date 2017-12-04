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
                var index = -1;

                updateArray(item);

                angular.forEach(ctrl.ptableCtrl.ptData, function(value, key){
                    if(value.isCheck){
                        cont++;
                    }
                });

                ctrl.ptableCtrl.utils.allSelected = cont === ctrl.ptableCtrl.ptData.length ? true : false;             
            };

            ctrl.selectAll = function (selected) {
                angular.forEach(ctrl.ptableCtrl.ptDataTemp, function(value, key){   
                    ctrl.ptableCtrl.ptData[key].isCheck = selected;           
                    var indexAdd = -1;
                    var indexRemove = -1; 
                    if(selected) {
                        indexAdd = ctrl.ptableCtrl.selectedC.indexOf(value.id);
                        if(!value.isCheck && indexAdd < 0) {
                            ctrl.ptableCtrl.selectedC.push(value.id);
                        }

                        indexRemove = ctrl.ptableCtrl.unSelectedC.indexOf(value.id);
                        if(indexRemove > -1) {
                            ctrl.ptableCtrl.unSelectedC.splice(indexRemove, 1);
                        }

                    }else {
                        indexRemove = ctrl.ptableCtrl.selectedC.indexOf(value.id);
                        if(value.isCheck && indexRemove < 0) {
                            ctrl.ptableCtrl.unSelectedC.push(value.id);
                        }

                        indexAdd = ctrl.ptableCtrl.selectedC.indexOf(value.id);
                        if(indexAdd > -1) {
                            ctrl.ptableCtrl.selectedC.splice(indexAdd, 1);
                        }
                    }
                    
                });
            };
        };
      
        function updateArray(item) {
            var exists = false;
            var array_splice = item.isCheck ? ctrl.ptableCtrl.unSelectedC : ctrl.ptableCtrl.selectedC;
            var array_push = item.isCheck ? ctrl.ptableCtrl.selectedC : ctrl.ptableCtrl.unSelectedC;
            var index_splice = array_splice.indexOf(item.id)

            angular.forEach(ctrl.ptableCtrl.ptDataTemp, function(value, key){
                var isCheck = item.isCheck ? !value.isCheck : value.isCheck;
                if(item.id == value.id && isCheck) {
                    exists = true;
                }
            });

            if(array_splice.length > 0 && index_splice > -1) {
                array_splice.splice(index_splice, 1);
            }

            if(exists) {
                array_push.push(item.id);
            }
        };

        	
    }
});

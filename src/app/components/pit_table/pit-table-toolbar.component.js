angular
  .module('angular-pit-table')
  .component('pttoolbar', {
    templateUrl: 'app/components/pit_table/pit-table-toolbar.html',
    require: {
      ptableCtrl: '^ptable'
    },
    controller: function () {
      var ctrl = this;

      ctrl.search = function (text) {
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
    }
  });

angular
  .module('angular-pit-table')
  .component('demo', {
    templateUrl: 'app/components/demo.html',
    controller: function ($http, ENV, $log, PTColumnBuilder, PTParamsBuilder) {
      var ctrl = this;

      ctrl.ptColumns = [
        PTColumnBuilder.newColumn('id'),
        PTColumnBuilder.newColumn('title').withName('Título').withOrder('asc').withClass('text-center'),
        PTColumnBuilder.newColumn('body').withName('Contenido').withOrder(),
        PTColumnBuilder.newColumn('userId').withName('Usuario')
      ];

      ctrl.ptParams = PTParamsBuilder.newParams().withUrl('/posts').withParam('userId', 1).withHateoas('users').withMethod('GET', false);

      ctrl.test = function () {
        //ctrl.ptParams = angular.extend({}, ctrl.ptParams.withParam('hlala', 'aljksdkjash'));
        ctrl.ptParams.loadData();
        console.log(ctrl.ptColumns);
      };
    }
  });

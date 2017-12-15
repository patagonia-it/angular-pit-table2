angular
  .module('angular-pit-table')
  .component('demo', {
    templateUrl: 'app/components/demo.html',
    controller: function (PTColumnBuilder, PTParamsBuilder) {
      var ctrl = this;

      ctrl.ptColumns = [
        PTColumnBuilder.newColumn('id'),
        PTColumnBuilder.newColumn('title').withName('Título').withOrder('asc').withClass('text-center').notExportable(),
        PTColumnBuilder.newColumn('body').withName('Contenido').withOrder('asc'),
        PTColumnBuilder.newColumn('lala').withName('LOLO').withOrder('asc'),
        PTColumnBuilder.newColumn('userId').withName('Usuario')

      ];

      console.log(ctrl.ptColumns);

      ctrl.ptParams = PTParamsBuilder.newParams().withUrl('http://localhost:3000/content').withMethod('GET', false);

      ctrl.selectedC = [];
      ctrl.unSelectedC = [];
    }
  });

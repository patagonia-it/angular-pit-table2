angular
  .module('angular-pit-table')
  .component('demo', {
    templateUrl: 'app/components/demo.html',
    controller: function (PTColumnBuilder, PTParamsBuilder) {
      var ctrl = this;

      ctrl.ptColumns = [
        PTColumnBuilder.newColumn('title').withName('Contenido1').withOrder('asc').withPriority(3),
        PTColumnBuilder.newColumn('title').withName('Contenido2').notSortable(),
        PTColumnBuilder.newColumn('title').withName('Contenido3').withOrder('asc'),
        PTColumnBuilder.newColumn('title').withName('Contenido4').withOrder('asc'),
        PTColumnBuilder.newColumn('title').withName('Contenido5').withOrder('asc'),
        PTColumnBuilder.newColumn('title').withName('Contenido6').withOrder('asc').withPriority(1),
        PTColumnBuilder.newColumn('title').withName('Contenido7').withOrder('asc'),
        PTColumnBuilder.newColumn('title').withName('Contenido8').withOrder('asc'),
        PTColumnBuilder.newColumn('title').withName('Contenido9').withOrder('asc').withPriority(5),
        PTColumnBuilder.newColumn('title').withName('Contenido10').withOrder('asc').withPriority(4),
        PTColumnBuilder.newColumn('title').withName('Contenido11').withOrder('asc'),
        PTColumnBuilder.newColumn('title').withName('Contenido12').withOrder('asc').withPriority(2)

      ];

      ctrl.ptParams = PTParamsBuilder.newParams().withUrl('http://10.15.100.4:3000/content').withMethod('GET', false).withResponsive().withSelect('id');

      ctrl.selectedC = [];
      ctrl.unSelectedC = [];
    }
  });

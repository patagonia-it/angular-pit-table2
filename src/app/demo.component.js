angular
  .module('angular-pit-table')
  .component('demo', {
    templateUrl: 'app/demo.html',
    controller: function (PTColumnBuilder, PTParamsBuilder) {
      var ctrl = this;

      ctrl.ptColumns = [
        PTColumnBuilder.newColumn('title').withName('Solicitud').withThClass('text-center').withClass('no-wrap text-center').withOrder('desc').withPriority(1),
        PTColumnBuilder.newColumn('title').withName('RUT').withThClass('text-center').withClass('no-wrap text-center').notSortable().withPriority(2),
        PTColumnBuilder.newColumn('title').withName('Nombre').withThClass('text-center').withClass('text-center').notSortable().withPriority(3),
        PTColumnBuilder.newColumn('title').withName('Programa').withThClass('text-center').withClass('text-center').withPriority(10),
        PTColumnBuilder.newColumn('title').withName('Tipo certificado').withThClass('text-center').withClass('text-center').withPriority(4),
        PTColumnBuilder.newColumn('title').withName('Convocatoria').withThClass('text-center').withClass('text-center').withPriority(5),
        PTColumnBuilder.newColumn('title').withName('Fecha solicitud').withThClass('text-center').withClass('text-center').withPriority(6),
        PTColumnBuilder.newColumn('title').withName('Revisor (Fecha de revisión)').withThClass('text-center').withClass('text-center').notSortable().withPriority(11),
        PTColumnBuilder.newColumn('title').withName('Folio').withThClass('text-center').withClass('text-center').notSortable().withPriority(7),
        PTColumnBuilder.newColumn('title').withName('Fecha Firma').withThClass('text-center').withClass('text-center').notSortable().withPriority(8),
        PTColumnBuilder.newColumn('title').withName('Estado').withThClass('text-center').withClass('text-center').withPriority(12),
        PTColumnBuilder.newColumn('title').withName('Descarga PDF').withThClass('text-center').withClass('text-center').notSortable().notExportable().withPriority(9)

      ];

      ctrl.ptParams = PTParamsBuilder.newParams().withUrl('http://10.15.100.6:3000/content').withMethod('GET', false).noMultipleOrder().withResponsive();

      ctrl.selectedC = [];
      ctrl.unSelectedC = [];
    }
  });

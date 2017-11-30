angular
  .module('angular-pit-table')
  .component('demo', {
    templateUrl: 'app/components/demo.html',
    controller: function (PTColumnBuilder, PTParamsBuilder) {
      var ctrl = this;

      ctrl.ptColumns = [
        PTColumnBuilder.newColumn('id'),
        PTColumnBuilder.newColumn('title').withName('Título').withOrder('asc').withClass('text-center'),
        PTColumnBuilder.newColumn('body').withName('Contenido').withOrder(),
        PTColumnBuilder.newColumn('userId').withName('Usuario'),
        PTColumnBuilder.newColumn('title').withName('test4'),
        PTColumnBuilder.newColumn('title').withName('test7'),
        PTColumnBuilder.newColumn('title').withName('test1'),
        PTColumnBuilder.newColumn('title').withName('test6')
      ];

      ctrl.ptParams = PTParamsBuilder.newParams().withUrl('/posts').withParam('userId', 1).withHateoas('users').withMethod('GET', false);
    }
  });

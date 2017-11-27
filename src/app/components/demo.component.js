angular
  .module('angular-pit-table')
  .component('demo', {
    templateUrl: 'app/components/demo.html',
    controller: function ($http, ENV, $log, PTColumnBuilder) {
      var ctrl = this;

      ctrl.ptColumns = [
        PTColumnBuilder.newColumn('id'),
        PTColumnBuilder.newColumn('title').withName('Título'),
        PTColumnBuilder.newColumn('body').withName('Contenido'),
        PTColumnBuilder.newColumn('userId').withName('Usuario')
      ];

      $http.get(ENV.backendUrl + '/posts').then(function (response) {
        ctrl.data = response.data;
      }, function () {
        $log.error('Ha ocurrido un error al intentar obtener la información.');
      });
    }
  });

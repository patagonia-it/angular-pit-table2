angular
  .module('angular-pit-table')
  .provider('pitTable', function () {
    var defaultOptions = {
      pageRadious: 2,
      pageSize: 20,
      emptyTableText: 'Ningún dato disponible en esta tabla.',
      loadingTableText: 'Cargando datos...',
      method: 'GET'
    };
    var newOptions = {};

    this.setOptions = function (options) {
      angular.extend(newOptions, options);
    };

    function PitTableOptions(option) {
      this.pageRadious = angular.isNumber(option.pageRadious) ? option.pageRadious : defaultOptions.pageRadious;
      this.pageSize = angular.isNumber(option.pageSize) ? option.pageSize : defaultOptions.pageSize;
      this.emptyTableText = option.emptyTableText;
      this.loadingTableText = option.loadingTableText;
      if (option.uiFramework && (option.uiFramework === 'bootstrap' || option.uiFramework === 'material')) {
        this.uiFramework = option.uiFramework;
      }
      this.method = defaultOptions.method;
    }

    this.$get = function () {
      return new PitTableOptions(angular.extend({}, defaultOptions, newOptions));
    };
  });

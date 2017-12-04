angular
  .module('angular-pit-table')
  .provider('pitTable', function () {
    var defaultOptions = {
      pageRadious: 2,
      pageSize: 20,
      emptyTableText: 'Ningún dato disponible en esta tabla.',
      loadingTableText: 'Cargando datos...',
      method: 'GET',
      pageSizes: [10, 25, 50, 100]
    };
    var newOptions = {};

    this.setOptions = function (options) {
      angular.extend(newOptions, options);
    };

    function PitTableOptions(option) {
      this.pageRadious = angular.isNumber(option.pageRadious) ? option.pageRadious : defaultOptions.pageRadious;
      if(angular.isNumber(option.pageSize)) {
        if(option.pageSizes.indexOf(option.pageSize) > 0) {
          this.pageSize = option.pageSize;
        }else {
          this.pageSize = Math.min.apply(null, option.pageSizes);
        }
      }else{
        this.pageSize = defaultOptions.pageSize;
      }
      this.emptyTableText = option.emptyTableText;
      this.loadingTableText = option.loadingTableText;
      if (option.uiFramework && (option.uiFramework === 'bootstrap' || option.uiFramework === 'material')) {
        this.uiFramework = option.uiFramework;
      }
      this.method = defaultOptions.method;
      this.pageSizes = angular.isArray(option.pageSizes) && option.pageSizes.every(function(size){
        return angular.isNumber(size) && size > 0;
      }) ? option.pageSizes : defaultOptions.pageSizes
    }

    this.$get = function () {
      return new PitTableOptions(angular.extend({}, defaultOptions, newOptions));
    };
  });

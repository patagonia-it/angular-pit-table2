angular
  .module('angular-pit-table')
  .factory('PTColumnBuilder', ptColumnBuilder);

function ptColumnBuilder() {
  var PTColumn = {
    notSortable: function () {
      this.sortable = false;
      return this;
    },
    renderWith: function() {

    },
    withClass: function (clazz) {
      if (!angular.isString(clazz) || name === '') {
        throw new Error('filter expected string but received ' + typeof clazz);
      }
      this.clazz = clazz;
      return this;
    },
    withName: function (name) {
      if (!angular.isString(name) || name === '') {
        throw new Error('filter expected string but received ' + typeof name);
      }
      this.name = name;
      return this;
    },
    withOrder: function (sort) {
      if (!angular.isArray(sort)) {
        throw new Error('filter expected array but received ' + typeof sort);
      }
      this.sort = sort;
      return this;
    },
    withSelect: function () {
      this.isSelect = true;
      return this;
    }
  };

  return {
    newColumn: function (id) {
      var column = Object.create(PTColumn);
      if (!angular.isString(id) || id === '') {
        throw new Error('filter expected string but received ' + typeof id);
      }

      column.id = id;
      if (angular.isUndefined(this.name)) {
        column.name = id;
      }

      column.sortable = true;
      column.isSelect = false;

      return column;
    },
    PTColumn: PTColumn
  };
}

angular
  .module('angular-pit-table')
  .factory('PTColumnBuilder', ptColumnBuilder)
  .factory('PTParamsBuilder', ptParamsBuilder);

function ptColumnBuilder() {
  var PTColumn = {
    renderWith: function (render) {
      if (!angular.isString(render) || render === '') {
        throw new Error('render expected string but received ' + typeof render);
      }
      this.render = render;
      return this;
    },
    withClass: function (clazz) {
      if (!angular.isString(clazz) || clazz === '') {
        throw new Error('clazz expected string but received ' + typeof clazz);
      }
      this.clazz = clazz;
      return this;
    },
    withName: function (name) {
      if (!angular.isString(name) || name === '') {
        throw new Error('name expected string but received ' + typeof name);
      }
      this.name = name;
      return this;
    },
    withOrder: function (sort) {
      if (angular.isDefined(sort) && sort.toLowerCase() !== 'asc' && sort.toLowerCase() !== 'desc') {
        throw new Error('sort expected string with value "asc" or "desc" but received ' + typeof sort);
      }
      this.sort = angular.isDefined(sort) ? sort.toLowerCase() : 'natural';
      return this;
    }
  };

  return {
    newColumn: function (id) {
      if (!angular.isString(id) || id === '') {
        throw new Error('id expected string but received ' + typeof id);
      }

      var column = Object.create(PTColumn);
      column.id = id;
      column.name = id;

      return column;
    },
    PTColumn: PTColumn
  };
}

function ptParamsBuilder(pitTable) {
  var PTParams = {
    tableName: function (name) {
      if (!angular.isString(name) || name === '') {
        throw new Error('name expected string but received ' + typeof name);
      }
      this.name = name;
      return this;
    },
    withParam: function (key, value) {
      if (!angular.isString(key) || key === '') {
        throw new Error('key expected string but received ' + typeof key);
      }

      if ((!angular.isString(value) || value === '') && !angular.isNumber(value) && !angular.isBoolean(value)) {
        throw new Error('value expected string, number or boolean but received ' + typeof value);
      }

      if (key.toLowerCase() === 'search' || key.toLowerCase() === 'sort' || key.toLowerCase() === 'page' || key.toLowerCase() === 'size') {
        throw new Error('key expected string except "search", "sort", "page" or "size" but received ' + typeof key);
      }

      this.params[key] = value;
      return this;
    },
    withUrl: function (url) {
      if (!angular.isString(url) || url === '') {
        throw new Error('url expected string but received ' + typeof url);
      }
      this.url = url;
      return this;
    },
    withMethod: function (method, inBody) {
      if (!angular.isString(method) || method === '') {
        throw new Error('method expected string but received ' + typeof method);
      }

      if (typeof (inBody) !== 'boolean') {
        throw new Error('inBody expected boolean but received ' + typeof inBody);
      }

      if (method.toUpperCase() !== 'GET' && method.toLowerCase() !== 'POST') {
        throw new Error('method expected string with value "GET" or "POST" but received ' + typeof method);
      }
      this.method = method;
      this.inBody = method.toUpperCase() === 'POST' && inBody;

      return this;
    },
    withHateoas: function (projection) {
      if (!angular.isString(projection) || projection === '') {
        throw new Error('projection expected string but received ' + typeof projection);
      }
      this.projection = projection;
      return this;
    },
    withSelect: function () {
      this.hasSelect = true;
      return this;
    }
  };

  return {
    newParams: function () {
      var params = Object.create(PTParams);
      params.params = {};
      params.method = pitTable.method;
      params.inBody = false;
      params.hasSelect = false;

      return params;
    },
    PTParams: PTParams
  };
}

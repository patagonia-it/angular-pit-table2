angular
    .module('angular-pit-table')
    .component('ptdrender', {
        bindings: {
            ptData: '<',
            directiveName: '<',
            renderFn: '='
        },
        require: {
            ptableCtrl: '^ptable'
        },
        controller: function ($scope, $element, $attrs, $compile) {
            var ctrl = this;
            $element.append($compile('<'+ctrl.directiveName+ ' row-data="$ctrl.ptData" render-fn="$ctrl.renderFn"></'+ctrl.directiveName+'>')($scope));
        }
    });

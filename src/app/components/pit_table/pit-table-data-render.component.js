angular
    .module('angular-pit-table')
    .component('ptdrender', {
        bindings: {
            ptData: '>',
            directiveName: '>'
        },
        template: '<{{ $ctrl.directiveName }} row-data="$ctrl.ptData"></{{ $ctrl.directiveName }}>',
        controller: function () {
            var ctrl = this;
        }
    });

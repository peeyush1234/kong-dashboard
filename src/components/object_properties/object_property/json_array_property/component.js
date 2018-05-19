(function() {

  angular.module('app').component('jsonArrayProperty', {
    restrict: 'E',
    scope: {},
    bindings: {
      schema: '<',
      key: '<',
      path: '<',
      type: '<',
      error: '<',
      label: '<',
      object: '='
    },
    templateUrl: 'components/object_properties/object_property/json_array_property/template.html',
    controller: 'JsonArrayPropertyController'
  });

})();

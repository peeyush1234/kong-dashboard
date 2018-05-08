(function() {

  angular.module('app')
    .controller('JsonArrayPropertyController', ['$scope', JsonArrayPropertyController]);

  function JsonArrayPropertyController($scope)
  {

    var vm = this;
    vm.$onInit = function() {
      $scope.$watch("$ctrl.object[$ctrl.key]", function(newValue, oldValue) {
        if (newValue !== undefined && !angular.isArray(newValue)) {
          vm.object[vm.key] = newValue.split(",").filter(function(e) { return String(e).trim(); });
        }
      });
    };
  }

})();

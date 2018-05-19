angular.module('app').controller("RouteController", ["$scope", "Kong", "$routeParams", "Alert", "services", "env", function ($scope, Kong, $routeParams, Alert, services, env)
{
    $scope.schema = env.schemas.route;
    $scope.route = {};
    $scope.errors = {};

    onInit();

    function onInit() {
        if ($routeParams.id) {
            Kong.get('/routes/' + $routeParams.id).then( function(data) {
                $scope.route = data;
            });
            $scope.title = "Edit route";
            $scope.action = "Save";
        } else {
            $scope.route = {};
            $scope.title = "Add an Service";
            $scope.action = "Create";
        }
    }

    $scope.isEdit = function () {
        return $routeParams.id != null;
    }

    $scope.services = services;

    $scope.save = function () {
        if ( $scope.isEdit() ) {
            Kong.patch('/routes/' + $scope.route.id, $scope.route).then(function () {
                Alert.success('Route updated');
                // clearing errors.
                $scope.errors = {};
            }, function (response) {
                if (response.status == 400 || response.status == 409) {
                    $scope.errors = response.data.fields;
                } else {
                    Alert.error('Unexpected error from Kong');
                    console.log(response);
                }
            });
        } else {
            Kong.post('/routes', $scope.route).then(function () {
                Alert.success('Route created');
                // clearing errors.
                $scope.errors = {};
            }, function (response) {
                if (response.status == 400 || response.status == 409) {
                    $scope.errors = response.data.fields;
                } else {
                    Alert.error('Unexpected error from Kong');
                    console.log(response);
                }
            });
        }

        
    }
}]);

angular
  .module('app')
  .controller('MainCtrl', ['$scope', function($scope) {
    $scope.message = 'Hello world';
    $scope.display = 0;
  }]);


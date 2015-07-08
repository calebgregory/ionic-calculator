angular
  .module('app')
  .controller('MainCtrl', ['$scope', function($scope) {
    $scope.display = 0;
    $scope.cache = [0];
    $scope.newLine = true;

    $scope.digit = function(d) {
      // check if number is already a float
      disVal = parseFloat($scope.display);
      if (disVal===Number(disVal) && disVal%1!==0 && d === '.') {
        // do not add '.' to number because it already has one
        return;
      }
      d = '' + d;
      $scope.display =
        ($scope.newLine === true) ? d
        : $scope.display + d;
      $scope.newLine = false;
    };

    $scope.enter = function() {
      $scope.cache.unshift(parseFloat($scope.display));
      c = $scope.cache;
      $scope.display = $scope.f(c[0],c[1]);
      $scope.cache.unshift(parseFloat($scope.display));
      $scope.newLine = true;
      $scope.cache = [$scope.display, 0];
    }

    $scope.clear = function() {
      $scope.display = 0;
      $scope.cache = [0];
      $scope.newLine = true;
    }

    function defaultF() {
      var output = $scope.cache.shift();
      return output;
    }

    Object.assign($scope, {
      add      : function (y,x) { return x + y; },
      subtract : function (y,x) { return x - y; },
      multiply : function (y,x) { return x * y; },
      divide   : function (y,x) { return x / y; },
      sin      : function (x) { return Math.sin(x); },
      cos      : function (x) { return Math.cos(x); },
      tan      : function (x) { return Math.tan(x); },
      asin     : function (x) { return Math.asin(x); },
      acos     : function (x) { return Math.acos(x); },
      atan     : function (x) { return Math.atan(x); },
      square   : function (x) { return x * x; },
      sqrt     : function (x) { return Math.sqrt(x); }
    });

    $scope.f = defaultF;
    $scope.funcIs = function(func) {
      $scope.f = func;
      $scope.cache.unshift(parseFloat($scope.display));
      $scope.newLine = true;
    };

  }]);


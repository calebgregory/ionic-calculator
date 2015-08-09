angular
  .module('app')
  .controller('MainCtrl', ['$scope', function($scope) {
    // initialize calculator values
    $scope.display = 0; // calculator display
    $scope.cache = [0]; // holds the values we will operate on
    $scope.newLine = true; // if true, replaces current display with new value on digit keypress
    $scope.f = defaultF; // holds the function to be performed

    // user presses digit on keypad
    $scope.digit = function(d) {
      // check if number is already a float
      disVal = parseFloat($scope.display);
      if (disVal===Number(disVal) && disVal%1!==0 && d === '.') {
        // do not add '.' to number because it already has one
        return;
      }
      d = '' + d; // convert input to string
      // check to see if we're on a new lin
      // if so, assign display to digit
      // otherwise, concatenate digit to current display
      $scope.display =
        ($scope.newLine === true) ? d
        : $scope.display + d;
      $scope.newLine = false; // sets up display to have next value concatenated to it
    };

    // toggle the sign of display value
    $scope.posneg = function() {
      $scope.display = parseFloat($scope.display) * -1;
    };

    // make functions accessible to $scope
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

    // assigns global function holder to the func passed
    // as an argument.
    //   e.g., funcIs(add) => $scope.f = add;
    $scope.funcIs = function(func) {
      $scope.f = func; // function assignment
      // adds current displayed value to cache
      $scope.cache.unshift(parseFloat($scope.display));
      // readies display for new value
      $scope.newLine = true;
      // if $scope.f takes only one argument,
      //   e.g., square(x),
      // go ahead and execute the function.
      if ($scope.f.length < 2) { $scope.enter(); }
    };

    // user presses enter, executing function
    // if no function has been pressed, executes defaultF.
    $scope.enter = function() {
      // parse value of current display, and add to cache
      $scope.cache.unshift(parseFloat($scope.display));
      // execute function on cache
      c = $scope.cache;
      $scope.display = $scope.f(c[0],c[1]);
      // add resulting value, stored as the display, to cache
      $scope.cache = [parseFloat($scope.display), 0]; // keeps cache tidy
      // make sure result is a number
      if (isNaN(parseInt($scope.display))) {
        $scope.display = "nope";
        $scope.cache = [0]; // we don't want any NaN's hanging in our cache
      };
      // setup for next entry
      $scope.newLine = true;
    };

    // reset to default
    $scope.clear = function() {
      $scope.display = 0;
      $scope.cache = [0];
      $scope.newLine = true;
      $scope.f = defaultF;
    };

    // returns current displayed value
    function defaultF() {
      return $scope.cache.shift();
    };


  }]);

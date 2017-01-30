var app = angular.module('synapse');

app.controller('RegisterController', function($scope, RegisterService) {

  $scope.register = function() {

    $scope.loading = true;

    RegisterService.register($scope.participant).then(function(response) {
      $scope.loading = false;
      window.location.href = 'dashboard.html'
    }).catch(function(err) {
      $scope.loading = false;
      console.log(err);
    });

  }

});

app.factory('RegisterService', function($firebaseArray) {

  var ref = firebase.database().ref().child('participants');

  return {
    register: register
  };

  function register(participant) {
    var data = $firebaseArray(ref);
    return data.$add(participant);
  }

});

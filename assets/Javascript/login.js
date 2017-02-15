var app = angular.module('synapse');

app.controller('AuthController', function($scope, $cookies, AuthService) {

  $scope.user = {};

  $scope.login = function() {

    $scope.loading = true;

    AuthService.login($scope.user).then(function(response) {

      if (response) {
        $cookies.put('email', $scope.user.email);
        $scope.loading = false;
        window.location.href = '/dashboard.html';
      } else {
        $scope.loading = false;
        $scope.error = "Participant not found";
      }

    }).catch(function(err) {
      console.log(err);
    });

  }

});

app.factory('AuthService', function($q, $firebaseArray) {

  var ref = firebase.database().ref().child('participants');

  return {
    login: login
  };

  function login(user) {

    var defer = $q.defer();

    firebase.auth().signInAnonymously().then(response => {

      var list = $firebaseArray(ref);

      list.$ref().orderByChild('email')
      .startAt(user.email)
      .endAt(user.email)
      .on('value', function(snapshot) {
        defer.resolve(snapshot.val());
      });

    }).catch(err => {
      defer.reject(err);
    });

      return defer.promise

  }

});

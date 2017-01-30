var app = angular.module('synapse');

app.factory('EmailService', function($q, $firebaseArray) {

  var ref = firebase.database().ref().child('participants');

  return {
    checkEmailExists: checkEmailExists
  };

  function checkEmailExists(email) {

    var defer = $q.defer();
    var list = $firebaseArray(ref);

    list.$ref().orderByChild('email')
      .startAt(email)
      .endAt(email)
      .on('value', function(snapshot) {
        !snapshot.val() ? defer.resolve(snapshot.val()) : defer.reject();
      });

      return defer.promise

  }

});

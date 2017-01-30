var app = angular.module('synapse');

app.controller('DashboardController', function($scope, DashboardService) {

  $scope.getEventList = function() {
    $scope.loading = true;

    DashboardService.getParticipantDetails().then(function(response) {
      console.log(response);
      $scope.participant = response;
      $scope.participantEvents = response.events;
      return DashboardService.getEventList();
    }).then(function(response) {
      $scope.loading = false;
      $scope.events = response;
    }).catch(function(err) {
      $scope.loading = false;
      console.log(err);
    });


  }

  $scope.register = function(event) {

    if (confirm('Confirm register?')) {

      DashboardService.register(event).then(function(response) {
        console.log(response);
      });

    }

  }

});

app.factory('DashboardService', function($firebaseArray, $q, $http) {

  var ref = firebase.database().ref().child('participants');
  var participant = {};

  return {
    getParticipantDetails: getParticipantDetails,
    getEventList: getEventList,
    register: register
  };

  function getParticipantDetails() {

    var defer = $q.defer();
    var events = [];
    var list = $firebaseArray(ref);

    list.$ref().orderByChild('email')
      .startAt('dhwanil_95@yahoo.com')
      .endAt('dhwanil_95@yahoo.com')
      .on('value', function(snapshot) {

        var data = snapshot.val();

        for(value in data) {
          participant = data[value];
          participant.$id = value;
        }

        defer.resolve(participant);

      });

      return defer.promise
  }

  function getEventList() {

    var defer = $q.defer();

    $http.get('events.json').then(function(response) {

      var filteredEvents = response.data.filter(function(event) {
        return participant.events.findIndex(function(participantEvent) {
          if (participantEvent.id !== event.id) {
            return event;
          }
        });
      });

      defer.resolve(filteredEvents);
    }).catch(function(err) {
      console.log(err);
      defer.reject(err);
    });

    return defer.promise;

  }

  function register(event) {

    var defer = $q.defer();

    if (participant.events) {
      participant.events.push(event);
    } else {
      participant.events = [];
      participant.events.push(event);
    }

    var data = $firebaseArray(ref);

    data.$loaded().then(function(data) {
      var index = data.$indexFor(participant.$id);
      data[index] = participant;
      data.$save(index);
      defer.resolve();
    });

    return defer.promise;

  }

});

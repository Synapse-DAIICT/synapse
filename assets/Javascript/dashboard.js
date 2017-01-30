var app = angular.module('synapse');

app.controller('DashboardController', function($scope, jQuery, $cookies, DashboardService) {

  $scope.getEventList = function() {

    if (!$cookies.get('email')) {
      window.location.href = 'login.html'
    }

    $scope.loading = true;

    DashboardService.getParticipantDetails().then(function(response) {
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

  $scope.initializeFormData = function() {
      $scope.eventsFormData = {
          "SY17E001": {},
          "SY17E002": {},
          "SY17E003": {},
          "SY17E004": {},
          "SY17E005": {},
          "SY17E006": {},
          "SY17E007": {},
          "SY17E008": {},
          "SY17E009": {},
          "SY17E010": {},
          "SY17E011": {},
          "SY17E012": {},
          "SY17E013": {},
          "SY17E014": {},
          "SY17E015": {},
          "SY17E016": {}
      };
  }

  $scope.initializeFormData();

  var selectedCheckboxes = [];

  $scope.closeModal = function(modalID) {

    selectedCheckboxes = [];

    $(':checkbox:checked').each(function(i){
      this.checked = false;
    });

    $scope.initializeFormData();

  }

  $scope.registerEvent = function(eventID, eventName) {

    $(':checkbox:checked').each(function(i){
      selectedCheckboxes[i] = $(this).val();
    });

    console.log("eventID", eventID);
    console.log("eventName", eventName);
    // console.log(selectedCheckboxes);
    // console.log($scope.eventsFormData[eventID]);
    // console.log($scope.eventsFormData);

    var eventObj = {
      "id": eventID,
      "name": eventName,
      "data": $scope.eventsFormData[eventID]
    };

    eventObj.data.selectedCheckboxes = selectedCheckboxes;

    console.log("eventObj:", eventObj);

    // if (confirm('Confirm register?')) {
    //
      DashboardService.register(eventObj).then(function(response) {
        console.log('done');

        var modalID = "#" + eventID;

        $('modalID').modal('hide');

        location.reload();
      });
    //
    // }



  }

});

// Controller END

app.factory('DashboardService', function($firebaseArray, $q, $http, $cookies) {

  var ref = firebase.database().ref().child('participants');
  var participant = {};

  return {
    getParticipantDetails: getParticipantDetails,
    getEventList: getEventList,
    register: register,
    updateUserData: updateUserData
  };

  function getParticipantDetails() {

    var defer = $q.defer();
    var events = [];
    var list = $firebaseArray(ref);

    list.$ref().orderByChild('email')
      .startAt($cookies.get('email'))
      .endAt($cookies.get('email'))
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

    var loadingEventsData;

    $http.get('/assets/json/events.json').then(function(response) {

      var registeredEventIds = [];

      var filteredEvents = response.data;

      if(participant.events && participant.events.length > 0) {

        participant.events.forEach(function(event){
          registeredEventIds.push(event.id);
        });

        filteredEvents = response.data.filter(function(event) {
          if(registeredEventIds.indexOf(event.id) != -1) {
            return false;
          } else {
            return true;
          }
        });
      }

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

  function updateUserData(user) {

    var defer = $q.defer();

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

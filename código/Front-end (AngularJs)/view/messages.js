var uiMask = 'ui.mask';
// Create an Application named "myApp".
var app = angular.module("myAppMessages", [uiMask]);

// Create a Controller named "myCtrl"
app.controller("myMessagesCtrl", function ($scope, $http) {

    $scope.getMyMessages = function () {

        let parsedUser = JSON.parse(sessionStorage.user);

        $scope.feedList = [];

        let params = {};
        params.userId = parsedUser.userId;

        $http({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            method: 'POST',
            url: 'http://localhost:8080/marcosducatti/unascareAPI/v1/users/getMyMessages.php',
            data: params,
        }).then(function successCallback(response) {
            if (!response.data.error) {
                $scope.feedList = response.data.messages;
            } else {
                console.log(response.data.message)
            }
        }, function errorCallback(response) {
            console.log(response.data.message)
        });
    }

    $scope.index = function () {
        window.location.href = "main-feed.html";
    }

    $scope.getMyMessages();

});
var uiMask = 'ui.mask';
// Create an Application named "myApp".
var app = angular.module("myPosts", [uiMask]);

// Create a Controller named "myCtrl"
app.controller("myCtrlPosts", function ($scope, $http) {

    if (sessionStorage.user == undefined) {
        window.location.href = "index.html";
    }

    $scope.postList = [];

    let parsedUser = JSON.parse(sessionStorage.user);

    let params = {};
    params.userId = parsedUser.userId;

    $scope.getPosts = function () {

        $http({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            method: 'POST',
            url: 'http://localhost:8080/marcosducatti/unascareAPI/v1/posts/getMyPosts.php',
            data: params,
        }).then(function successCallback(response) {
            if (!response.data.error) {
                $scope.postList = response.data.posts;
            } else {
                console.log()
            }
        }, function errorCallback(response) {
            console.log(response.data.message)
        });
    }

    $scope.sendMessage = function (item) {
        $("#exampleModalCenter").modal('show');
        $scope.details.title = item.title;
        $scope.details.description = item.description;
        $scope.details.picture = item.picture;
        $scope.details.fullname = item.username;
    }

    $scope.getPosts();

    $scope.index = function () {
        window.location.href = "main-feed.html";
    }


});
// Create an Application named "myApp".
var app = angular.module("myAppFeed", []);

// Create a Controller named "myCtrl"
app.controller("myCtrlFeed", function ($scope, $http) {

    if (sessionStorage.user == undefined) {
        window.location.href = "index.html";
    }

    $scope.details = {};
    $scope.message = {};
    $scope.message.isChecked = false;
    $scope.logged = "";
    $scope.alunoCheck = "aluno";
    $scope.doadorCheck = "doador";

    $scope.user = JSON.parse(sessionStorage.user);
    $scope.logged = $scope.user.logged;

    $scope.getPosts = function () {

        $http({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            method: 'GET',
            url: 'http://localhost:8080/marcosducatti/unascareAPI/v1/posts/getPosts.php',
        }).then(function successCallback(response) {
            if (!response.data.error) {
                $scope.feedList = response.data.posts;
            } else {
                $("#alertProduct").html(response.data.message).removeClass('hide');
            }
        }, function errorCallback(response) {
            console.log(response.data.message)
        });
    }

    $scope.openModal = function (item) {
        $("#exampleModalCenter").modal('show');

        $scope.details.postId = item.postId
        $scope.details.postTitle = item.title;
        $scope.details.receiverId = item.userId;
        $scope.details.receiverName = item.username;
        $scope.details.description = item.description;
        $scope.details.picture = item.picture;

        // $scope.detaild.postId = item.Id
        // $scope.details.title = item.title;
        // $scope.details.description = item.description;
        // $scope.details.picture = item.picture;
        // $scope.details.fullname = item.username;
    }

    $scope.menuAction = function (item) {
        if (item === "makePost") {
            window.location.href = "createPost.html";
        } else if (item === "openMessages") {
            window.location.href = "messages.html";
        } else if (item === "logout") {
            sessionStorage.clear();
            window.location.href = "index.html"
        } else if (item === "myPosts") {
            window.location.href = "myposts.html"
        }
    }

    $scope.cleandetail = function () {
        $scope.details.title = "";
        $scope.details.description = "";
        $scope.details.picture = "";
        $scope.details.fullname = "";
    }

    $scope.getMyPosts = function () {

        let params = {};
        params.userId = $scope.user.userId;

        $http({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            method: 'POST',
            url: 'http://localhost:8080/marcosducatti/unascareAPI/v1/posts/getMyPosts.php',
            data: params,
        }).then(function successCallback(response) {
            if (!response.data.error) {
                $scope.feedList = response.data.posts;
            } else {
                console.log()
            }
        }, function errorCallback(response) {
            console.log(response.data.message)
        });
    }

    $scope.getThePosts = function () {
        if ($scope.logged === $scope.doadorCheck) {
            $scope.getPosts();
        } else {
            $scope.getMyPosts();
        }
    }

    $scope.getThePosts();


    $scope.sendMessage = function (resceiverDetails) {
        if ($scope.message.isChecked == false) {
            alert("selecione a opção")
        } else if ($scope.message.title == undefined || $scope.message.title == null || $scope.message.title == "") {
            alert("Escreve um título")
        } else if ($scope.message.description == undefined || $scope.message.description == null || $scope.message.description == "") {
            alert("Escreva uma descrição")
        } else {
            $scope.clearAndSend(resceiverDetails);
        }
    }

    $scope.clearAndSend = function (resceiverDetails) {

        let params = {}

        params.postId = resceiverDetails.postId;
        params.postTitle = resceiverDetails.postTitle;
        params.senderId = $scope.user.userId;
        params.senderName = $scope.user.username;
        params.receiverId = resceiverDetails.receiverId;
        params.receiverName = resceiverDetails.receiverName;
        params.title = $scope.message.title;
        params.description = $scope.message.description;

        $http({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            method: 'POST',
            url: 'http://localhost:8080/marcosducatti/unascareAPI/v1/posts/sendMessage.php',
            data: params,
        }).then(function successCallback(response) {
            if (!response.data.error) {
                $scope.getThePosts();
            } else {
                console.log()
            }
        }, function errorCallback(response) {
            console.log(response.data.message)
        });
    };

    $scope.checkBox = function () {
        if (!$scope.message.isChecked) {
            $scope.message.isChecked = true;
        } else if ($scope.message.isChecked) {
            $scope.message.isChecked = false;
        }
    }

});
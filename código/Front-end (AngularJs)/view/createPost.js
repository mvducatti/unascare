var uiMask = 'ui.mask';
// Create an Application named "myApp".
var app = angular.module("myAppPost", [uiMask]);

// Create a Controller named "myCtrl"
app.controller("myCtrlPost", function ($scope, $http) {

    $scope.registerModel = {}

    if (sessionStorage.user == undefined) {
        window.location.href = "index.html";
    }

    $scope.feedList = [
        { id: 1, avatar: 'http://localhost:8080/marcosducatti/unascareAPI/imgs/cleaning.png', description: 'Limpeza' },
        { id: 2, avatar: 'http://localhost:8080/marcosducatti/unascareAPI/imgs/cloth.png', description: 'Vestuário' },
        { id: 3, avatar: 'http://localhost:8080/marcosducatti/unascareAPI/imgs/food.png', description: 'Alimento' },
        { id: 4, avatar: 'http://localhost:8080/marcosducatti/unascareAPI/imgs/school.png', description: 'Escolar' },
        { id: 5, avatar: 'http://localhost:8080/marcosducatti/unascareAPI/imgs/toiletries.png', description: 'Higiene' },
    ]

    $scope.selected = {}

    $scope.titleerror = "Digite um título"
    $scope.descriptionerror = "Digite uma descrição"
    $scope.selectproduct = "Selecione uma categoria"

    $scope.verifyData = function () {

        if ($scope.registerModel.product == undefined || $scope.registerModel.product === "") {
            $("#alertProduct").html($scope.selectproduct).removeClass('hide');
        } else if ($scope.registerModel.title == undefined || $scope.registerModel.title === "") {
            $scope.titleinput = true
        } else if ($scope.registerModel.description == undefined || $scope.registerModel.description === "") {
            $scope.descriptioninput = true
        } else {
            $scope.saveData()
        }
    }

    $scope.saveData = function () {

        let parsedUser = JSON.parse(sessionStorage.user);

        let params = {};
        params.userId = parsedUser.userId;
        params.username = parsedUser.username;
        params.title = $scope.registerModel.title;
        params.description = $scope.registerModel.description;
        params.picture = $scope.registerModel.product.avatar;

        $http({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            method: 'POST',
            url: 'http://localhost:8080/marcosducatti/unascareAPI/v1/posts/createPost.php',
            data: params,
        }).then(function successCallback(response) {
            if (!response.data.error) {
                $("#alertProductSuccess").html(response.data.message).removeClass('hide');
                $scope.clear();
            } else {
                $("#alertProduct").html(response.data.message).removeClass('hide');
            }
        }, function errorCallback(response) {
            console.log(response.data.message)
        });
    }

    $scope.teste = function (item) {
        myFunction();
        $scope.registerModel.product = item;
        $scope.selected.description = item.description;
    }

    $scope.index = function () {
        window.location.href = "main-feed.html";
    }

    $scope.clear = function () {
        $scope.registerModel.title = "";
        $scope.registerModel.description = "";
        $scope.registerModel.product = "";
        $scope.selected.description = "";
    }

    $scope.index = function () {
        window.location.href = "main-feed.html";
    }

});

function myFunction() {
    $("#alertProduct").html("").addClass('hide');
}
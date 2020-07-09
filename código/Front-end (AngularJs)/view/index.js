var uiMask = 'ui.mask';
// Create an Application named "myApp".
var app = angular.module("myApp", [uiMask]);

// Create a Controller named "myCtrl"
app.controller("myCtrl", function ($scope, $http) {

  if (sessionStorage.user != undefined) {
    window.location.href = "main-feed.html";
  }

  $scope.searchText = "can you see me";

  $scope.aluno = true;
  $scope.doador = false;
  $scope.selectedLogin = "";

  $scope.alunoCheck = "aluno";
  $scope.doadorCheck = "doador";

  $scope.login = {}
  $scope.aluno = {}
  $scope.cpfinput = false;
  $scope.senhainput = false;
  $scope.rainput = false;
  $scope.senhaAlunoinput = false;

  $scope.teste = function () {

    if ($scope.login.document == undefined || $scope.login.document == "") {
      $scope.cpfinput = true;
      return false;
    } else if ($scope.login.password == undefined || $scope.login.password == "") {
      $scope.senhainput = true;
      return false;
    }

    $http({
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      method: 'POST',
      url: 'http://localhost:8080/marcosducatti/unascareAPI/v1/users/userLogin.php',
      data: $scope.login,
    }).then(function successCallback(response) {
      if (!response.data.error) {
        if ($scope.selectedLogin === $scope.doadorCheck) {
          response.data.Object.logged = $scope.doadorCheck;
        } else {
          response.data.Object.logged = $scope.alunoCheck;
        }
        sessionStorage.user = JSON.stringify(response.data.Object);
        window.location.href = "main-feed.html";
      } else {
        $("#alert").html(response.data.message).removeClass('hide');
      }
    }, function errorCallback(response) {
      console.log(response.data.message);
    });
  }

  $scope.changeMenu = function (item) {
    if (item === $scope.alunoCheck) {
      $scope.doador = false;
      $scope.aluno = true;
      $scope.aluno = {}
      $scope.selectedLogin = item;
    }

    if (item === $scope.doadorCheck) {
      $scope.aluno = false;
      $scope.doador = true;
      $scope.selectedLogin = item;
    }
  }

  $scope.entrarAluno = function () {
    
    if ($scope.aluno.ra == undefined || $scope.aluno.ra == "") {
      $scope.rainput = true
      return false
    } else if ($scope.aluno.password == undefined || $scope.aluno.password == "") {
      $scope.senhaAlunoinput = true
      return false
    }

    $http({
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      method: 'POST',
      url: 'http://localhost:8080/marcosducatti/unascareAPI/v1/users/studentLogin.php',
      data: $scope.aluno,
    }).then(function successCallback(response) {
      if (!response.data.error) {
        if ($scope.selectedLogin === $scope.doadorCheck) {
          response.data.Object.logged = $scope.doadorCheck;
        } else {
          response.data.Object.logged = $scope.alunoCheck;
        }
        sessionStorage.user = JSON.stringify(response.data.Object);
        window.location.href = "main-feed.html";
      } else {
        $("#alert").html("Aluno não encontrado").removeClass('hide');
      }

    }, function errorCallback(response) {
      console.log("Não encontrou")
    });
  }

});

function myFunction() {
  $("#alert").html("").addClass('hide');
}
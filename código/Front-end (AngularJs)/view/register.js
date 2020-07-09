var uiMask = 'ui.mask';
// Create an Application named "myApp".
var app = angular.module("myAppRegister", [uiMask]);

// Create a Controller named "myCtrl"
app.controller("myCtrlRegister", function ($scope, $http) {

    $scope.registerModel = {}
    $scope.registerModel.campus = "campus1"

    if (sessionStorage.user != undefined) {
        window.location.href = "main-feed.html";
    }

    $scope.cpferror = "Erro de CPF"
    $scope.passworderror = "Erro de senha"
    $scope.cpfinput = false
    $scope.usernameinput = false
    $scope.passwordinput = false
    $scope.emailinput = false
    $scope.phoneinput = false
    // $scope.cityinput = false
    $scope.confirmpasswordinput = false

    $scope.verifyData = function () {

        if ($scope.registerModel.username == undefined || $scope.registerModel.username === "") {
            $scope.usernameinput = true
        } else if ($scope.registerModel.document == undefined || $scope.registerModel.document === "") {
            $scope.cpferror = "Preencha o CPF"
            $scope.cpfinput = true
        } else if (!$scope.validarCPF($scope.registerModel.document)) {
            $scope.cpferror = "CPF inválido, por favor digite novamente o CPF"
            $scope.cpfinput = true
        } else if ($scope.registerModel.email == undefined || $scope.registerModel.email === "") {
            $scope.emailinput = true
        } else if ($scope.registerModel.phone == undefined || $scope.registerModel.phone === "") {
            $scope.phoneinput = true
        } else if ($scope.registerModel.password == undefined || $scope.registerModel.password === "") {
            $scope.passwordinput = true
        } else if ($scope.registerModel.confirmPassword == undefined || $scope.registerModel.confirmPassword === "") {
            $scope.passworderror = "Confirme a senha"
            $scope.confirmpasswordinput = true
        } else if ($scope.registerModel.password != $scope.registerModel.confirmPassword) {
            $scope.passworderror = "Senhas não conferem, por favor verifique a senha novamente"
            $scope.confirmpasswordinput = true
        } else {
            $scope.saveData()
        }
    }

    $scope.validarCPF = function (cpf) {

        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf == '') return false;
        // Elimina CPFs invalidos conhecidos	
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            return false;
        // Valida 1o digito	
        let add = 0;
        for (let i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return false;
        // Valida 2o digito	
        add = 0;
        for (let i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return false;
        return true;
    }

    $scope.saveData = function () {
        $scope.registerModel.usertype = 1;
        $http({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            method: 'POST',
            url: 'http://localhost:8080/marcosducatti/unascareAPI/v1/users/createUser.php',
            data: $scope.registerModel,
        }).then(function successCallback(response) {
            if (!response.data.error) {
                $("#alertSuccess").html(response.data.message).removeClass('hide');
            } else {
                $("#alertRegister").html(response.data.message).removeClass('hide');
            }
        }, function errorCallback(response) {
            console.log(response.data.message)
        });
    }

    $scope.index = function () {
        window.location.href = "index.html";
    }
});

function myFunction() {
    $("#alertRegister").html("").addClass('hide');
  }
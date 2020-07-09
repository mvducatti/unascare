<?php

require_once '../../includes/DBUserOperations.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    header("Access-Control-Allow-Origin: *");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $error = true;
    $message = "";

    $username = $request->username;
    $email = $request->email;
    $password = $request->password;
    $phone = $request->phone;
    $document = $request->document;
    $campus = $request->campus;
    $usertype = $request->usertype;

    if (empty($username) || empty($email) || empty($password) || empty($phone) ||
        empty($document) || empty($campus) || empty($usertype)) {

            $message = "Por favor preencha todos os campos";

    } else {

        $db = new DBUserOperations();
        $result = $db->createUser($username, $password, $document, $email, $phone, $campus, $usertype);

        if ($result == 1) {
            $error= false;
            $message = "Usuario registrado com sucesso";
        } elseif ($result == 2) {
            $message = "Algum erro aconteceu, por favor tente novamente em alguns instantes.
                Se o problema persistir procure o CTI";
        } elseif ($result == 0) {
            $message = "Essa conta ja esta cadastrada, por favor verifique seus dados cadastrais";
        }
    }

} else {
    $message = "Invalid Request";
}

$response['error'] = $error;
$response['message'] = $message;

echo json_encode($response);

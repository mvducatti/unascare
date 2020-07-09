<?php

require_once '../../includes/DBUserOperations.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    header("Access-Control-Allow-Origin: *");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $error = true;
    $message = "";

    $document = $request->document;

    if (empty($document)) {

        $message = "Por favor preencha todos os campos";

    } else {

        $db = new DBUserOperations();

        if ($db->checkUser($document)) {
            $user = $db->getUserByCpf($document);
            $error = false;
            $response['userId'] = $user['userId'];
            $response['document'] = $user['document'];
            $message = "Usuario Existente";
        } else {
            $response['message'] = "Usuário inexistente, por favor verifique os dados novamente";
        }
    }
}

$response['error'] = $error;
$response['message'] = $message;

echo json_encode($response);

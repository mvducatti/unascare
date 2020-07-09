<?php

require_once '../../includes/DBUserOperations.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    header("Access-Control-Allow-Origin: *");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $error = true;
    $message = "";

    $ra = $request->ra;
    $password = $request->password;

    if (empty($ra) || empty($password )) {

        $message = "Por favor preencha todos os campos";

    } else {

        $db = new DBUserOperations();

        if ($db->studentLogin($ra, $password )) {
            $user = $db->getUserByRa($ra);

            $error = false;
            $message = "Login Efetuado com sucesso!";

            $objetoComDados = [
                'userId' => $user['userId'],
                'document' => $user['document'],
                'username' => $user['username']
            ];

            $response['Object'] = $objetoComDados;

        } else {
            $message = "Cpf ou senha incorretos, por favor verifique se os dados estão corretos";
        }
    }
    $response['error'] = $error;
    $response['message'] = $message;
}

echo json_encode($response);

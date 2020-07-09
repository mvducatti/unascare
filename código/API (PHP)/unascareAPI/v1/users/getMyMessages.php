<?php

require_once '../../includes/DBUserOperations.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    header("Access-Control-Allow-Origin: *");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $error = true;
    $message = "";

    $userId = $request->userId;

    $db = new DBUserOperations();

    $messages = $db->getMyMessages($userId);
    $error = false;
    $response['messages'] = $messages;

} else {
    $message = "Error ao tentar carregar lista!";
}
$response['error'] = $error;
$response['message'] = $message;

echo json_encode($response);

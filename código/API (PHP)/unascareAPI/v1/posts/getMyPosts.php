<?php

require_once '../../includes/DBPostOperations.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    header("Access-Control-Allow-Origin: *");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $error = true;
    $message = "";

    $userId = $request->userId;

    $db = new DBPostOperations();

    $posts = $db->getMyPosts($userId);
    $error = false;
    $response['posts'] = $posts;

} else {
    $message = "Error ao tentar carregar lista!";
}
$response['error'] = $error;
$response['message'] = $message;

echo json_encode($response);

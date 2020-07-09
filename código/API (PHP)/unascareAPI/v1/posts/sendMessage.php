<?php

require_once '../../includes/DBUserOperations.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    header("Access-Control-Allow-Origin: *");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $error = true;
    $message = "";

    $postId = $request->postId;
    $postTitle = $request->postTitle;
    $senderId = $request->senderId;
    $senderName = $request->senderName;
    $receiverId = $request->receiverId;
    $receiverName = $request->receiverName;
    $title = $request->title;
    $description = $request->description;

    if (empty($postId) || empty($postTitle) || empty($senderId) ||
        empty($senderName) || empty($receiverId) || empty($receiverName) ||
        empty($title) || empty($description)) {

        $message = "Por favor preencha todos os campos";

    } else {

        $db = new DBUserOperations();
        $result = $db->createMessage($postId, $postTitle, $senderId, $senderName, $receiverId, $receiverName, $title, $description);

        if($result == 1){
            $error = false; 
            $message = "Mensagem enviada com sucesso";

        $result2 = $db->updatePost($postId);

        if ($result2 == 1) {
            $error = false; 
            $message = "Post alterado com sucesso";


            $result3 = $db->updateHelper($postId, $senderId);

            if ($result3 == 1) {
                $error = false; 
                $message = "Ajudador alterado com sucesso";
            } elseif($result3 == 2) {
                $message = "Algum erro aconteceu, por favor tente novamente em alguns instantes. 
                Se o problema persistir procure o CTI"; 
            }


        } elseif($result2 == 2) {
            $message = "Algum erro aconteceu, por favor tente novamente em alguns instantes. 
            Se o problema persistir procure o CTI"; 
        }
        

        }elseif($result == 2){
            $message = "Algum erro aconteceu, por favor tente novamente em alguns instantes. 
            Se o problema persistir procure o CTI"; 
        }
    }

} else {
    $message = "Invalid Request";
}

$response['error'] = $error;
$response['message'] = $message;

echo json_encode($response);

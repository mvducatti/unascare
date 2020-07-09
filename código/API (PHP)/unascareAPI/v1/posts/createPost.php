<?php 

require_once '../../includes/DBPostOperations.php';

$response = array(); 

if($_SERVER['REQUEST_METHOD']=='POST'){

    header("Access-Control-Allow-Origin: *");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $error = true;
    $message = "";

    $userId = $request->userId;
    $username = $request->username;
    $title = $request->title;
    $description = $request->description;
    $picture = $request->picture;

    if(empty($userId) || empty($username) || empty($title) || empty($description) || empty($picture)){
        $message = "Por favor preencha todos os campos";
    }else{  

            $db = new DBPostOperations(); 
            $result = $db->registerPost($userId, $username, $title, $description, $picture);

            if($result == 1){
                $error = false; 
                $message = "Post criado com sucesso";
            }elseif($result == 2){
                $message = "Algum erro aconteceu, por favor tente novamente em alguns instantes. 
                Se o problema persistir procure o CTI"; 
            }
    }
    }else{
        $message = "Invalid Request";
    }

    $response['error'] = $error;
    $response['message'] = $message;    

    echo json_encode($response);
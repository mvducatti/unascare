<?php 

require_once '../../includes/DBPostOperations.php';

$response = array(); 

    if($_SERVER['REQUEST_METHOD']=='GET'){
        header("Access-Control-Allow-Origin: *");

        $db = new DBPostOperations();        
         
        $posts = $db->getPosts();

        $response['error'] = false; 
        $response['posts'] =  $posts;

    }else{
        $response['error'] = true; 
        $response['message'] = "Error ao tentar carregar lista!";          
    }

echo json_encode($response);
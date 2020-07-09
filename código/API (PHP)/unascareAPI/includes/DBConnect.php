<?php

    class DBConnect{

        function _construct(){

        }

        function connect(){
            include_once dirname(__FILE__).'/Constants.php';
            $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
            mysqli_set_charset($conn,'utf8');
        
        if(mysqli_connect_errno()){
            echo "Failed to connect with database".mysqli_connect_err();
        }

        return $conn ;

        }
    }
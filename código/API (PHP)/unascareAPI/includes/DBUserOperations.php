<?php

class DBUserOperations
{

    private $con;

    public function __construct()
    {

        require_once dirname(__FILE__) . '/DBConnect.php';

        $db = new DBConnect();

        $this->con = $db->connect();

    }

    public function createUser($username, $password, $document, $email, $phone, $campus, $usertype)
    {
        if ($this->isUserRegistered($document)) {
            return 0;
        } else {

            $stmt = $this->con->prepare("INSERT INTO users (username, password, document, email, phone, campus, usertype) VALUES (?, ?, ?, ?, ?, ?, ?);");
            $stmt->bind_param("ssssssi", $username, $password, $document, $email, $phone, $campus, $usertype);

            if ($stmt->execute()) {
                return 1;
            } else {
                return 2;
            }
        }
    }

    public function checkUser($cpf)
    {
        $stmt = $this->con->prepare("SELECT user_id FROM users WHERE cpf = ?");
        $stmt->bind_param("s", $cpf);
        $stmt->execute();
        $stmt->store_result();
        return $stmt->num_rows > 0;

    }

    public function studentLogin($ra, $password)
    {
        $stmt = $this->con->prepare("SELECT userId FROM users WHERE ra = ? AND password = ?");
        $stmt->bind_param("ss", $ra, $password);
        $stmt->execute();
        $stmt->store_result();
        return $stmt->num_rows > 0;
    }

    public function userLogin($document, $password)
    {
        $stmt = $this->con->prepare("SELECT userId FROM users WHERE document = ? AND password = ?");
        $stmt->bind_param("ss", $document, $password);
        $stmt->execute();
        $stmt->store_result();
        return $stmt->num_rows > 0;
    }

    public function getUserByRa($ra)
    {
        $stmt = $this->con->prepare("SELECT * FROM users WHERE ra = ?");
        $stmt->bind_param("s", $ra);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function getUserByCpf($document)
    {
        $stmt = $this->con->prepare("SELECT * FROM users WHERE document = ?");
        $stmt->bind_param("s", $document);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    private function isUserRegistered($document)
    {
        $stmt = $this->con->prepare("SELECT userId FROM users WHERE document = ?");
        $stmt->bind_param("s", $document);
        $stmt->execute();
        $stmt->store_result();
        return $stmt->num_rows > 0;
    }

    public function getMyMessages($userId){
        $stmt = $this->con->prepare("SELECT messageId, postId, postTitle, senderId, senderName, receiverId, receiverName, title, description, status, datecreated
        FROM messages WHERE receiverId = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        /* bind result variables */
        $stmt->bind_result($messageId, $postId, $postTitle, $senderId, $senderName, $receiverId, $receiverName, $title, $description, $status, $datecreated);
        $arrayMessages = array();                   
        /* fetch values */
        while ($stmt->fetch()) {

            $temp = array();
            $temp['messageId'] = $messageId; 
            $temp['postId'] = $postId; 
            $temp['postTitle'] = $postTitle; 
            $temp['senderId'] = $senderId;
            $temp['senderName'] = $senderName;
            $temp['receiverId'] = $receiverId;
            $temp['receiverName'] = $receiverName;
            $temp['title'] = $title;
            $temp['description'] = $description;
            $temp['status'] = $status;
            $temp['datecreated'] = $datecreated;
             
            array_push($arrayMessages, $temp);

        }
        /* close statement */
        $stmt->close();
        return $arrayMessages;
    }

    public function createMessage($postId, $postTitle, $senderId, $senderName, $receiverId, $receiverName, $title, $description)
    {
        $stmt = $this->con->prepare("INSERT INTO messages (postId, postTitle, senderId, senderName, receiverId, receiverName, title, description, status, datecreated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, now());");
        $stmt->bind_param("ssssssss", $postId, $postTitle, $senderId, $senderName, $receiverId, $receiverName, $title, $description);

        if ($stmt->execute()) {
            return 1;
        } else {
            return 2;
        }
    }

    public function updatePost($postId)
    {
        $stmt = $this->con->prepare("UPDATE posts SET isVisible = 0 WHERE postId = $postId");

        if ($stmt->execute()) {
            return 1;
        } else {
            return 2;
        }
    }

    public function updateHelper($postId, $senderId)
    {
        $stmt = $this->con->prepare("UPDATE posts SET helperId = $senderId WHERE postId = $postId");

        if ($stmt->execute()) {
            return 1;
        } else {
            return 2;
        }
    }

}
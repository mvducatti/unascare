<?php

class DBPostOperations
{

    private $con;

    public function __construct()
    {

        require_once dirname(__FILE__) . '/DBConnect.php';

        $db = new DBConnect();

        $this->con = $db->connect();

    }

    public function getPosts()
    {
        $stmt = $this->con->prepare("SELECT postId, userId, username, title, description, picture, status, datecreated FROM posts WHERE isVisible = 1");
        $stmt->execute();
        /* bind result variables */
        $stmt->bind_result($postId, $userId, $username, $title, $description, $picture, $status, $datecreated);
        $arrayPosts = array();
        /* fetch values */
        while ($stmt->fetch()) {

            $temp = array();

            $temp['postId'] = $postId;
            $temp['userId'] = $userId;
            $temp['username'] = $username;
            $temp['title'] = $title;
            $temp['description'] = $description;
            $temp['picture'] = $picture;
            $temp['status'] = $status;
            $temp['datecreated'] = $datecreated;

            array_push($arrayPosts, $temp);

        }
        /* close statement */
        $stmt->close();
        return $arrayPosts;
    }

    public function registerPost($userId, $username, $title, $description, $picture)
    {
        $stmt = $this->con->prepare("INSERT INTO posts (userId, username, title, description, picture, status, isVisible, datecreated) VALUES (?, ?, ?, ?, ?, 0, 1, now());");
        $stmt->bind_param("issss", $userId, $username, $title, $description, $picture);

        if ($stmt->execute()) {
            return 1;
        } else {
            return 2;
        }
    }

    public function getMyPosts($userId)
    {
        $stmt = $this->con->prepare("SELECT postId, userId, helperId, username, title, description, picture, status, datecreated
        FROM posts WHERE userId = ? and status = 0");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        /* bind result variables */
        $stmt->bind_result($postId, $userId, $helperId, $username, $title, $description, $picture, $status, $datecreated);
        $arrayPosts = array();
        /* fetch values */
        while ($stmt->fetch()) {

            $temp = array();
            $temp['postId'] = $postId;
            $temp['userId'] = $userId;
            $temp['helperId'] = $helperId;
            $temp['username'] = $username;
            $temp['title'] = $title;
            $temp['description'] = $description;
            $temp['picture'] = $picture;
            $temp['status'] = $status;
            $temp['datecreated'] = $datecreated;

            array_push($arrayPosts, $temp);

        }
        /* close statement */
        $stmt->close();
        return $arrayPosts;
    }

    public function getmyPostsHelper($userId)
    {
        $stmt = $this->con->prepare("SELECT postId, userId, helperId, username, title, description, picture, status, datecreated
        FROM posts WHERE helperId = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        /* bind result variables */
        $stmt->bind_result($postId, $userId, $helperId, $username, $title, $description, $picture, $status, $datecreated);
        $arrayPosts = array();
        /* fetch values */
        while ($stmt->fetch()) {

            $temp = array();
            $temp['postId'] = $postId;
            $temp['userId'] = $userId;
            $temp['helperId'] = $helperId;
            $temp['username'] = $username;
            $temp['title'] = $title;
            $temp['description'] = $description;
            $temp['picture'] = $picture;
            $temp['status'] = $status;
            $temp['datecreated'] = $datecreated;

            array_push($arrayPosts, $temp);

        }
        /* close statement */
        $stmt->close();
        return $arrayPosts;
    }

}

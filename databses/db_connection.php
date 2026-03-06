<?php
$servername = "localhost";
$user = "jimmy";
$password = "";
$dbname = "BlockBreadkDB";

//creating the connection
$conn = new mysqli($servername, $user, $password, $dbname);

//checking the connection
if ($conn->connect_error) {
    die("connection failed:" . $conn->connect_error);
}

?>
<?php
$servername = "localhost";
$user = "jimmy";
$password = "Jj12091612";
//Deleting password because I have no idea how to handle sensetive info lmao
$dbname = "BlockBreakDB";


//creating the connection
$conn = new mysqli($servername, $user, $password, $dbname);

//checking the connection
if ($conn->connect_error) {
    die("connection failed:" . $conn->connect_error);
}

?>
<?php 

    if(isset($_POST)){
        $data = file_get_contents("php://input");

        $score = json_decode($data);

        echo $score;
    }
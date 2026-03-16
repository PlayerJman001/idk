<?php
include 'databases/db_connection.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $score = $_POST['score'];

    $stmt = $conn->prepare ("INSERT INTO score (name, score) VALUES (?, ?)");
    $stmt->bind_param("si", $name, $score);

    $stmt->execute();

    $stmt->close();

    //redirect to itself to prevent resubmissions
    header('Location:'.$_SERVER['PHP_SELF']);
}

$sql = "SELECT * FROM score ORDER BY score DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {
        echo "NAME: " . htmlspecialchars($row["name"]) . " SCORE: " . $row["score"] . "<br>";
    }

} else {
    echo "No scores yet.";
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Block Breaking</title>

    <link rel="stylesheet" href="style.css">
</head>
<body>
    <canvas id="canvas" width="480" height="320"></canvas>
    <button id="runButton">Start</button>
    

    <form id="Win_Msg" action="?" method="post" enctype="multipart/form-data" autocomplete="off"><b>YOU WIN!<br>  
        <input maxlength="3" minlength="3" required id="name" name="name">
        <input type="hidden" id="score" name="score">
        <input type="submit" name="submit" value="Submit">
    </form>
    <script src="index.js"></script>
</body>
</html>
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
    exit();
}

$sql = "SELECT * FROM score ORDER BY score DESC LIMIT 10";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Block Breaking</title>

    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bitcount+Grid+Single:wght@100..900&display=swap" rel="stylesheet">
</head>
<body>
<div id="scoreboard">
    <?php
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo '<div class="score">  NAME:'  . htmlspecialchars($row["name"]) . " SCORE: " . $row["score"] . '</div>';
    }

    } else {
        echo "No scores yet.";
    }
    ?>
</div>
    
    <canvas id="canvas" width="480" height="320"></canvas>
    <button id="runButton">Start</button>
    

    <form id="Win_Msg" action="?" method="post" enctype="multipart/form-data" autocomplete="off"><b>GAME OVER!<br>  
        <input maxlength="3" minlength="3" required id="name" name="name">
        <input type="hidden" id="score" name="score">
        <input type="submit" name="submit" value="Submit">
    </form>
    <script src="index.js"></script>
</body>
</html>
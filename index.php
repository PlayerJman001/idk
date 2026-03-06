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
    

    <form id="Win_Msg" method="post" name="form" action="script.php" onsubmit="return false;"><b>YOU WIN!<br>  
        <input maxlength="3" minlength="3" required id="name" name="name">
        <input type="submit" value="Submit"> 
    </form>
    <script src="index.js"></script>
</body>
</html>
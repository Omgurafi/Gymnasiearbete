<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Home</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="icon" type="image/icon" href="Drool.jpg">
</head>
<header>
    <nav>
        <a href="Typing Testeth.html">Typing Test</a> 
        <a href="index.php">Home</a>  
        <a href="Reaction Speed.html">Reaction Speed</a>
    </nav>
</header>
<body>
<?php
$servername = "localhost";
$username = "id19778818_tfs";
$password = "4irX&9R#ZD]@AVOD";
$database = "id19778818_databas";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully"; 
    } catch(PDOException $e) {    
    echo "Connection failed: " . $e->getMessage();
    }

     $variable = $_POST['variable'];

    try {
        $stmt = $conn->prepare("INSERT INTO table_name (variable_column) VALUES (:variable)");
        $stmt->execute(array(':variable' => $variable));
    } catch(PDOException $e) {
        echo $e->getMessage();
    }
?>

<div class="headerDiv">
    <p class="Titel">
        Welcome to the Fun Site!
        </p>
    <img src="TheFunSite Logo.png" class="imgLogo">
    <p class="IntroText">
    The Fun Site is an interactive website with multiple tests. These tests determine things such as your typing speed and
    your reaction time. <br>
    On the top of the screen, you can choose between these different tests. The point of the website
    is to test your mind.
    </p>
    <div class="container">
        <div class="lb_section">
            <div class="lb_tabs">
                <div class="tabs">
                    <ul>
                        <li data-li="today">Today</li>
                        <li class="active" data-li="month">Month</li>
                        <li data-li="year">Year</li>
                    </ul>
                </div>

                <div class="lb_wrap">
                    <div class="lb_item today">
                        <div class="lb_mem">
                            <div class="img">
                                <img src="Drool.jpg" class="imgPldayer">
                            </div>
                            <div class="name_bar">
                                <p><span>1. </span>Adsand</p>
                                <div class="bar_wrap">
                                    <div class="inner_bar" style="width: 95%;"></div>
                                </div> 
                            </div>

                            <div class="points">
                                195 points
                            </div>
                        </div>
                        <div class="lb_mem">
                            <div class="img">
                                <img src="Drool.jpg" class="imgPlayer">
                            </div>
                            <div class="name_bar">
                                <p><span>2. </span>Lubjor</p>
                                <div class="bar_wrap">
                                    <div class="inner_bar" style="width: 80%;"></div>
                                </div> 
                            </div>

                            <div class="points">
                                180 points
                            </div>
                        </div>
                        <div class="lb_mem">
                            <div class="img">
                                <img src="Drool.jpg" class="imgPlayer">
                            </div>
                            <div class="name_bar">
                                <p><span>3. </span>You</p>
                                <div class="bar_wrap">
                                    <div class="inner_bar" style="width: 60%;"></div>
                                </div> 
                            </div>

                            <div class="points">
                                130 points
                            </div>
                        </div>
                    <div class="lb_item month"></div>
                    <div class="lb_item year"></div>
                </div>
            </div>

            <div class="lb_wrap"></div>
        </div>
    </div>
</div>

<script src="Leaderboard.js"></script>
</body>
</html>
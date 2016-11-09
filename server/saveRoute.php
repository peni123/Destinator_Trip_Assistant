<?php

session_start();

if(empty($_SESSION['infoUser'])){
	header("HTTP/1.0 401 Unauthorized");
	die;
}

if(isset($_SERVER["CONTENT_TYPE"]) && strpos($_SERVER["CONTENT_TYPE"], "application/json") !== false) {
    $_POST = array_merge($_POST, (array) json_decode(trim(file_get_contents('php://input')), true));
}

$userId = $_SESSION['infoUser'][0]['id'];
$origin = empty($_POST['origin']) ? '': $_POST['origin'];
$destination = empty($_POST['destination']) ? '': $_POST['destination'];
$waypoints = empty($_POST['waypoints']) ? '': $_POST['waypoints'];
$optWaypoints = empty($_POST['optimizeWaypoints']) ? '': $_POST['optimizeWaypoints'];
$travelMode = empty($_POST['travelMode']) ? '': $_POST['travelMode'];
$message = empty($_POST['message']) ? '': $_POST['message'];
$routeName = empty($_POST['routeName']) ? '': $_POST['routeName'];
$rating = empty($_POST['rating']) ? '': $_POST['rating'];

$route = [[$userId, $origin, $destination, $waypoints, $optWaypoints, $travelMode, $message, $routeName, $rating]];

require_once 'db_settings.php';

$pdo = new PDO('mysql:host=localhost;dbname=trip-site', DB_USER, DB_PASS, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$insertRouteSql = 'INSERT INTO routes (user_id, origin, destination, waypoints, optimize_waypoints, travel_mode, message, route_name, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';  
$statement = $pdo->prepare($insertRouteSql);

$ids = [];
foreach ($route as $item) {

   $statement -> execute($item);
   $ids[] = $pdo->lastInsertId();
}

if ($ids[0] == "" && $ids[1] == "" && $ids[2] == "" && $ids[3] == "" && $ids[4] == "" && $ids[5] == "" && $ids[6] == "") {
	header("HTTP/1.0 404 Not Found");
	return;
} else {
	echo json_encode(['success' => true]);
}
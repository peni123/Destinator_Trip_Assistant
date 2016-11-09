<?php
session_start();

if(empty($_SESSION['infoUser'])){
	header("HTTP/1.0 401 Unauthorized");
	die;
}

if(isset($_SERVER["CONTENT_TYPE"]) && strpos($_SERVER["CONTENT_TYPE"], "application/json") !== false) {
    $_POST = array_merge($_POST, (array) json_decode(trim(file_get_contents('php://input')), true));
}

$user = empty($_POST['name']) ? '': $_POST['name'];
$message = empty($_POST['message']) ? '': $_POST['message'];
$email = empty($_POST['email']) ? '': $_POST['email'];
$people = [[$user, $email, $message]];

/* $key = isset($_POST['key']) ? $_POST['key'] : null;
if (empty($key)) {
	$_SESSION['list'][] = $people;
} else {
	$_SESSION['list'][$key] = $people;
} */

/* $people = [['aaa', 'aaa', "aaa"]]; */


require_once 'db_settings.php';

$pdo = new PDO('mysql:host=localhost;dbname=trip-site', DB_USER, DB_PASS, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$insertPersonSql = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';  
$statement = $pdo->prepare($insertPersonSql);

$ids = [];
foreach ($people as $item) {

   $statement -> execute($item);
   $ids[] = $pdo->lastInsertId();
}

if ($ids[0] == "" && $ids[1] == "" && $ids[2] == "") {
	header("HTTP/1.0 404 Not Found");
	return;
} else {
	echo json_encode(['success' => true]);
}
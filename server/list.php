<?php
session_start();

if(empty($_SESSION['infoUser'])){
	header("HTTP/1.0 401 Unauthorized");
	die;
}

if(isset($_SERVER["CONTENT_TYPE"]) && strpos($_SERVER["CONTENT_TYPE"], "application/json") !== false) {
	$_GET = array_merge($_GET, (array) json_decode(trim(file_get_contents('php://input')), true));
}
$user = $_SESSION['infoUser'][0]['id'];

require_once 'db_settings.php';

$pdo = new PDO('mysql:host=localhost;dbname=trip-site', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$sth = $pdo->prepare('SELECT * FROM routes');
$sth->execute();
$result = $sth->fetchAll(PDO::FETCH_ASSOC);
if(!empty($result)){
	
	echo json_encode($result);
} else {
	header("HTTP/1.0 404 Not Found");
}
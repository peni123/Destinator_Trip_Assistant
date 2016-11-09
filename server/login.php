<?php
session_start();

if(isset($_SERVER["CONTENT_TYPE"]) && strpos($_SERVER["CONTENT_TYPE"], "application/json") !== false) {
	$_POST = array_merge($_POST, (array) json_decode(trim(file_get_contents('php://input')), true));
}
require_once 'db_settings.php';

$user = empty($_POST['name']) ? '': $_POST['name'];
$pass = empty($_POST['password']) ? '': $_POST['password'];

/* $user = '123456';
$pass = '123456'; */ 

$people = [[$user, $pass]]; 


$pdo = new PDO('mysql:host=localhost;dbname=trip-site', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$statement = $pdo->prepare("SELECT * FROM dblogin where name=:name AND pass=:pass");

$statement -> execute([
		':name' => $user,
		':pass' => $pass
]);

$result = $statement->fetchAll(PDO::FETCH_ASSOC);
 /* 
if(isset($result)){
	$_SESSION['infoUser'] = $result;
} */

if (empty($result)) {
	$response = [
			'success' => false,
			'error' => 'Invalid name or password'	
	];
	header("HTTP/1.0 404 Not Found");
	
} else {
	$response = [
			'success' => true,
			'error' => ''
	];
	$_SESSION['infoUser'] = $result;	//тук го слагам в сесията целия user
}
//var_dump($_SESSION['infoUser'][0]['id']); 

echo json_encode($response);
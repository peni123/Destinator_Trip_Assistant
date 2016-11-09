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
$pass = empty($_POST['password']) ? '': $_POST['password'];


$data = [[$user, $pass]];

require_once 'db_settings.php';

$pdo = new PDO('mysql:host=localhost;dbname=trip-site', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$updatePersonSql = 'UPDATE dblogin SET pass = :pass WHERE name = :user';
$sth = $pdo->prepare($updatePersonSql);
$sth->execute([':pass' => $pass, ':user' => $user]);

$result = $sth->rowCount();
echo ($result);
if ($result <= 0) {
	$response = [
			'success' => false,
			'error' => 'Invalid name or password'
	];
}else { 
	$response = [
			'success' => true,
			'error' => ''
	];
}

echo json_encode($response);

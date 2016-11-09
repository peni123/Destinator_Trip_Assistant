<?php
if(isset($_SERVER["CONTENT_TYPE"]) && strpos($_SERVER["CONTENT_TYPE"], "application/json") !== false) {
    $_POST = array_merge($_POST, (array) json_decode(trim(file_get_contents('php://input')), true));
}

$user = empty($_POST['name']) ? '': $_POST['name'];
$pass = empty($_POST['password']) ? '': $_POST['password'];
$email = empty($_POST['email']) ? '': $_POST['email'];
$people = [[$user, $pass, $email]];

require_once 'db_settings.php';

$pdo = new PDO('mysql:host=localhost;dbname=trip-site', DB_USER, DB_PASS, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$insertPersonSql = 'INSERT INTO dblogin (name, pass, email) VALUES (?, ?, ?)';  
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

//try - catch za inserta
//Exception::getMessage() z da se vzeme suobshtenieto
// na kolonite username i email triabva datriabva da se sloji pravilo unique (moje i da se kazva distinct)
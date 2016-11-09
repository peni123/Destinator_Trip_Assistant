<?php
session_start();

$category = empty($_POST['category']) ? '': $_POST['category'];
$author = empty($_POST['author']) ? '': $_POST['author'];
$quote = empty($_POST['quote']) ? '': $_POST['quote'];
$active = empty($_POST['active']) ? '': $_POST['active'];

/* $key = isset($_POST['key']) ? $_POST['key'] : null; 
if (empty($key)) {
	$_SESSION['list'][] = $data;
} else {
	$_SESSION['list'][$key] = $data;
}*/ 

//db
require_once 'db_settings.php';


$data = [[$category, $author, $quote, $active]];
$pdo = new PDO('mysql:host=localhost;dbname=trip-site', DB_USER, DB_PASS, [
	 PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION
]);

$insertQuoteSql = 'INSERT INTO quotesbook(category, author, quote, active) VALUES (?, ?, ?, ?)';
$statement = $pdo->prepare($insertQuoteSql);
$ids = [];
foreach($data as $item) {
	$statement-> execute($item);
	$ids[] = $pdo->lastInsertId();
}
if ($ids[0] == "" && $ids[1] == "" && $ids[2] == "" && $ids[3] = "") {
	return;
} else {
	echo json_encode(['success' => true]);
}
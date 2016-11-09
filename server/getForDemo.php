<?php

/* $data = isset($_GET['list']) ? $_GET['list'] : [];

$limit = 30;
$data = [];
	for($i=0; $i<3; $i++){
		$num = rand(0,30);
		$data []= $num;
	} */
$data = [];
$id1= isset($_GET['id1'])?$_GET['id1']: 1;
$id2= isset($_GET['id2'])?$_GET['id2']: 2;
$id3= isset($_GET['id3'])?$_GET['id3']: 3;


/* $id1= isset($_POST['id1'])?$_POST['id1']: '';
$id2= isset($_POST['id2'])?$_POST['id2']: '';
$id3= isset($_POST['id3'])?$_POST['id3']:  '';

$data = [[$id1, $id2, $id3]]; */
require_once 'db_settings.php';

$pdo = new PDO('mysql:host=localhost;dbname=trip-site', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$sth = $pdo->prepare("SELECT author,quote FROM quotesbook WHERE id IN($id1, $id2, $id3)");
$sth->execute();
$result = $sth->fetchAll(PDO::FETCH_ASSOC);

if(!empty($result)){

	echo json_encode($result);
} 
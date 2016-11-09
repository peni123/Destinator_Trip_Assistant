<?php
session_start();
if (isset($_SESSION['infoUser'])) {
	unset($_SESSION['infoUser']);
}

echo json_encode(['success' => true]);
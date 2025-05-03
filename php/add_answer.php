<?php
session_start();
require_once("db.php");
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["success" => false, "message" => "Not logged in"]);
  exit;
}

$questionId = isset($_POST['question_id']) ? intval($_POST['question_id']) : 0;
$content = trim($_POST['content']);
$userId = $_SESSION['user_id'];

if ($content === "") {
  echo json_encode(["success" => false, "message" => "Answer content is empty"]);
  exit;
}

$sql = "INSERT INTO answers (question_id, user_id, content) VALUES ($questionId, $userId, '$content')";
$conn->query($sql);

echo json_encode(["success" => true]);
?>

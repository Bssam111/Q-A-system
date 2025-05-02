<?php
session_start();
require_once("db.php");
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["success" => false, "message" => "Not logged in"]);
  exit;
}

$questionId = intval($_POST['question_id']);
$content = trim($_POST['content']);
$userId = $_SESSION['user_id'];

if ($content === "") {
  echo json_encode(["success" => false, "message" => "Answer content is empty"]);
  exit;
}

$stmt = $conn->prepare("INSERT INTO answers (question_id, user_id, content) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $questionId, $userId, $content);
$stmt->execute();

echo json_encode(["success" => true]);
?>

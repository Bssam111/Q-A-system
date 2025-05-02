<?php
session_start();
require_once("db.php");
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["success" => false, "message" => "Not logged in"]);
  exit;
}

$questionId = intval($_POST['question_id']);
$newTitle = trim($_POST['title']);
$userId = $_SESSION['user_id'];

// تأكد أن المستخدم هو صاحب السؤال
$check = $conn->prepare("SELECT id FROM questions WHERE id = ? AND user_id = ?");
$check->bind_param("ii", $questionId, $userId);
$check->execute();
$result = $check->get_result();

if ($result->num_rows === 0) {
  echo json_encode(["success" => false, "message" => "Not allowed"]);
  exit;
}

// التحديث
$update = $conn->prepare("UPDATE questions SET title = ? WHERE id = ?");
$update->bind_param("si", $newTitle, $questionId);
$update->execute();

echo json_encode(["success" => true]);
?>

<?php
session_start();
require_once("db.php");
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["success" => false, "message" => "Not logged in"]);
  exit;
}

$questionId = isset($_POST['question_id']) ? intval($_POST['question_id']) : 0;
$newTitle = trim($_POST['title']);
$userId = $_SESSION['user_id'];

// تأكد أن المستخدم هو صاحب السؤال
$check_sql = "SELECT id FROM questions WHERE id = $questionId AND user_id = $userId";
$result = $conn->query($check_sql);

if ($result->num_rows === 0) {
  echo json_encode(["success" => false, "message" => "Not allowed"]);
  exit;
}

// التحديث
$update_sql = "UPDATE questions SET title = '$newTitle' WHERE id = $questionId";
$conn->query($update_sql);

echo json_encode(["success" => true]);
?>

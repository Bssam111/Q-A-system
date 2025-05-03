<?php
session_start();
require_once("db.php");
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["success" => false, "message" => "Not logged in"]);
  exit;
}

$answerId = isset($_POST['answer_id']) ? intval($_POST['answer_id']) : 0;
$userId = $_SESSION['user_id'];

// تأكد أن المستخدم هو صاحب الإجابة
$check_sql = "SELECT id FROM answers WHERE id = $answerId AND user_id = $userId";
$result = $conn->query($check_sql);

if ($result->num_rows === 0) {
  echo json_encode(["success" => false, "message" => "Not allowed"]);
  exit;
}

// حذف الإجابة
$delete_sql = "DELETE FROM answers WHERE id = $answerId";
$conn->query($delete_sql);

echo json_encode(["success" => true]);
?>

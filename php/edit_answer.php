<?php
session_start();
require_once("db.php");
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["success" => false, "message" => "Not logged in"]);
  exit;
}

$answerId = isset($_POST['answer_id']) ? intval($_POST['answer_id']) : 0;
$newContent = trim($_POST['content']);
$userId = $_SESSION['user_id'];

// تأكد أن المستخدم هو صاحب الإجابة
$check_sql = "SELECT id FROM answers WHERE id = $answerId AND user_id = $userId";
$result = $conn->query($check_sql);

if ($result->num_rows === 0) {
  echo json_encode(["success" => false, "message" => "Not allowed"]);
  exit;
}

// التحديث
$escapedContent = mysqli_real_escape_string($conn, $newContent);
$update_sql = "UPDATE answers SET content = '$escapedContent', edited = 1 WHERE id = $answerId";
$conn->query($update_sql);

echo json_encode(["success" => true]);
?>


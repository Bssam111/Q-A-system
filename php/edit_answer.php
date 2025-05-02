<?php
session_start();
require_once("db.php");
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["success" => false, "message" => "Not logged in"]);
  exit;
}

$answerId = intval($_POST['answer_id']);
$newContent = trim($_POST['content']);
$userId = $_SESSION['user_id'];

// تأكد أن المستخدم هو صاحب الإجابة
$check = $conn->prepare("SELECT id FROM answers WHERE id = ? AND user_id = ?");
$check->bind_param("ii", $answerId, $userId);
$check->execute();
$result = $check->get_result();

if ($result->num_rows === 0) {
  echo json_encode(["success" => false, "message" => "Not allowed"]);
  exit;
}

// التحديث
$update = $conn->prepare("UPDATE answers SET content = ?, edited = 1 WHERE id = ?");
$update->bind_param("si", $newContent, $answerId);
$update->execute();

echo json_encode(["success" => true]);
?>

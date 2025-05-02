<?php
session_start();
require_once("db.php");
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["success" => false, "message" => "Not logged in"]);
  exit;
}

$answerId = intval($_POST['answer_id']);
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

// حذف الإجابة
$delete = $conn->prepare("DELETE FROM answers WHERE id = ?");
$delete->bind_param("i", $answerId);
$delete->execute();

echo json_encode(["success" => true]);
?>

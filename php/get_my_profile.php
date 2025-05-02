<?php
session_start();
require_once("db.php");
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["error" => "Not logged in"]);
  exit;
}

$userId = $_SESSION['user_id'];

$response = [
  "username" => $_SESSION['username'],
  "questions" => [],
  "answers" => []
];

// جلب الأسئلة
$q = $conn->prepare("SELECT id, title FROM questions WHERE user_id = ?");
$q->bind_param("i", $userId);
$q->execute();
$q_result = $q->get_result();
while ($row = $q_result->fetch_assoc()) {
  $response["questions"][] = $row;
}

// جلب الإجابات + عنوان السؤال
$a = $conn->prepare("
  SELECT a.content, a.question_id, q.title
  FROM answers a
  JOIN questions q ON a.question_id = q.id
  WHERE a.user_id = ?
");
$a->bind_param("i", $userId);
$a->execute();
$a_result = $a->get_result();
while ($row = $a_result->fetch_assoc()) {
  $response["answers"][] = $row;
}

echo json_encode($response);
?>

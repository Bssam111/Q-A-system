<?php
session_start();
require_once("db.php");
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["error" => "Not logged in"]);
  exit;
}

$userId = $_SESSION['user_id'];
$username = $_SESSION['username'];

$response = [
  "username" => $username,
  "questions" => [],
  "answers" => []
];

// جلب الأسئلة
$q_sql = "SELECT id, title FROM questions WHERE user_id = $userId";
$q_result = $conn->query($q_sql);
while ($row = $q_result->fetch_assoc()) {
  $response["questions"][] = $row;
}

// جلب الإجابات + عنوان السؤال
$a_sql = "
  SELECT answers.content, answers.question_id, questions.title
  FROM answers, questions
  WHERE answers.question_id = questions.id
  AND answers.user_id = $userId";
  
$a_result = $conn->query($a_sql);
while ($row = $a_result->fetch_assoc()) {
  $response["answers"][] = $row;
}

echo json_encode($response);
?>

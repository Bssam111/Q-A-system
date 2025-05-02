<?php
session_start();
require_once("db.php");
header('Content-Type: application/json');

if (!isset($_GET['id'])) {
  echo json_encode(["error" => "No question ID provided"]);
  exit;
}

$questionId = intval($_GET['id']);
$userId = $_SESSION['user_id'] ?? null;

$response = ["question" => null, "answers" => []];

// جلب السؤال
$q = $conn->prepare("SELECT q.title, q.content, q.created_at, u.username AS author
                     FROM questions q
                     JOIN users u ON q.user_id = u.id
                     WHERE q.id = ?");
$q->bind_param("i", $questionId);
$q->execute();
$q_result = $q->get_result();

if ($q_result->num_rows === 1) {
  $response["question"] = $q_result->fetch_assoc();
} else {
  echo json_encode(["error" => "Question not found"]);
  exit;
}

// جلب الإجابات + تصويت المستخدم الحالي (إن وجد)
if ($userId) {
  $a = $conn->prepare("
    SELECT 
      a.id, a.content, a.votes, a.edited,
      u.username AS author,
      (SELECT vote_type FROM answer_votes WHERE user_id = ? AND answer_id = a.id) AS user_vote
    FROM answers a
    JOIN users u ON a.user_id = u.id
    WHERE a.question_id = ?
    ORDER BY a.created_at ASC
  ");
  $a->bind_param("ii", $userId, $questionId);
} else {
  // في حالة المستخدم غير مسجل دخول
  $a = $conn->prepare("
    SELECT 
      a.id, a.content, a.votes, a.edited,
      u.username AS author,
      NULL AS user_vote
    FROM answers a
    JOIN users u ON a.user_id = u.id
    WHERE a.question_id = ?
    ORDER BY a.created_at ASC
  ");
  $a->bind_param("i", $questionId);
}

$a->execute();
$a_result = $a->get_result();

while ($row = $a_result->fetch_assoc()) {
  $response["answers"][] = $row;
}

echo json_encode($response);
?>

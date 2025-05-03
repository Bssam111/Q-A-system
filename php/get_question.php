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
$sql = "SELECT q.title, q.content, q.created_at, u.username AS author
        FROM questions q
        JOIN users u ON q.user_id = u.id
        WHERE q.id = $questionId";
$q_result = $conn->query($sql);

if ($q_result->num_rows === 1) {
  $response["question"] = $q_result->fetch_assoc();
} else {
  echo json_encode(["error" => "Question not found"]);
  exit;
}

// جلب الإجابات + تصويت المستخدم الحالي (إن وجد)
if ($userId) {
    

  $sql = "
    SELECT 
      a.id, a.content, a.votes, a.edited,
      u.username AS author,
      (SELECT vote_type FROM answer_votes WHERE user_id = $userId AND answer_id = a.id) AS user_vote
    FROM answers a
    JOIN users u ON a.user_id = u.id
    WHERE a.question_id = $questionId
    ORDER BY a.created_at ASC
  ";
} 
// في حالة المستخدم غير مسجل دخول
else {
  $sql = "
    SELECT 
      a.id, a.content, a.votes, a.edited,
      u.username AS author,
      NULL AS user_vote
    FROM answers a
    JOIN users u ON a.user_id = u.id
    WHERE a.question_id = $questionId
    ORDER BY a.created_at ASC
  ";
}

$a_result = $conn->query($sql);

while ($row = $a_result->fetch_assoc()) {
  $response["answers"][] = $row;
}

echo json_encode($response);
?>

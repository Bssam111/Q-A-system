<?php
session_start();
require_once("db.php");
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["success" => false, "message" => "Not logged in"]);
  exit;
}

$userId = $_SESSION['user_id'];
$answerId = intval($_POST['answer_id'] ?? 0);
$voteType = $_POST['vote'] ?? '';

if (!in_array($voteType, ['up', 'down'])) {
  echo json_encode(["success" => false, "message" => "Invalid vote type"]);
  exit;
}

// هل سبق وصوّت؟
$check = $conn->prepare("SELECT vote_type FROM answer_votes WHERE user_id = ? AND answer_id = ?");
$check->bind_param("ii", $userId, $answerId);
$check->execute();
$result = $check->get_result();

if ($result->num_rows === 0) {
  // أول مرة يصوّت
  $stmt = $conn->prepare("INSERT INTO answer_votes (user_id, answer_id, vote_type) VALUES (?, ?, ?)");
  $stmt->bind_param("iis", $userId, $answerId, $voteType);
  $stmt->execute();
} else {
  $row = $result->fetch_assoc();
  if ($row['vote_type'] === $voteType) {
    echo json_encode(["success" => false, "message" => "You already voted."]);
    exit;
  }

  // تغيير التصويت
  $stmt = $conn->prepare("UPDATE answer_votes SET vote_type = ? WHERE user_id = ? AND answer_id = ?");
  $stmt->bind_param("sii", $voteType, $userId, $answerId);
  $stmt->execute();
}

// احسب عدد الأصوات الصحيح
$count = $conn->prepare("
  SELECT SUM(CASE 
              WHEN vote_type = 'up' THEN 1 
              WHEN vote_type = 'down' THEN -1 
              ELSE 0 
            END) AS total_votes
  FROM answer_votes WHERE answer_id = ?
");
$count->bind_param("i", $answerId);
$count->execute();
$totalVotes = $count->get_result()->fetch_assoc()['total_votes'] ?? 0;

// تحديث جدول الإجابات
$update = $conn->prepare("UPDATE answers SET votes = ? WHERE id = ?");
$update->bind_param("ii", $totalVotes, $answerId);
$update->execute();

echo json_encode(["success" => true, "votes" => $totalVotes]);
?>

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
$newVotes = intval($_POST['new_votes'] ?? -999);

if (!in_array($voteType, ['up', 'down']) || $newVotes === -999) {
  echo json_encode(["success" => false, "message" => "Invalid input"]);
  exit;
}

// check if user already voted on this answer
$check = $conn->prepare("SELECT vote_type FROM answer_votes WHERE user_id = ? AND answer_id = ?");
$check->bind_param("ii", $userId, $answerId);
$check->execute();
$result = $check->get_result();
$row = $result->fetch_assoc();

// user has voted before
if ($row) {
  if ($row['vote_type'] === $voteType) {
    echo json_encode(["success" => false, "message" => "You have already voted with this option or haven't voted yet."]);
    exit;
  }

  // allow changing vote from up to down or vice versa
  $stmt = $conn->prepare("UPDATE answer_votes SET vote_type = ? WHERE user_id = ? AND answer_id = ?");
  $stmt->bind_param("sii", $voteType, $userId, $answerId);
  $stmt->execute();
} else {
  // new voter: only allow upvote first
  if ($voteType === 'down') {
    echo json_encode(["success" => false, "message" => "You cannot downvote before upvoting."]);
    exit;
  }

  // first time upvote
  $stmt = $conn->prepare("INSERT INTO answer_votes (user_id, answer_id, vote_type) VALUES (?, ?, ?)");
  $stmt->bind_param("iis", $userId, $answerId, $voteType);
  $stmt->execute();
}

// update answer votes count
$update = $conn->prepare("UPDATE answers SET votes = ? WHERE id = ?");
$update->bind_param("ii", $newVotes, $answerId);
$update->execute();

echo json_encode(["success" => true, "votes" => $newVotes]);
?>

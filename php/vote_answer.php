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
$check_sql = "SELECT vote_type FROM answer_votes WHERE user_id = $userId AND answer_id = $answerId";
$result = $conn->query($check_sql);
$row = $result->fetch_assoc();

// user has voted before
if ($row) {
  if ($row['vote_type'] === $voteType) {
    echo json_encode(["success" => false, "message" => "You have already voted with this option or haven't voted yet."]);
    exit;
  }

  // allow changing vote from up to down or vice versa
  $update_sql = "UPDATE answer_votes SET vote_type = '$voteType' WHERE user_id = $userId AND answer_id = $answerId";
  $conn->query($update_sql);

} else {
  // new voter: only allow upvote first
  if ($voteType === 'down') {
    echo json_encode(["success" => false, "message" => "You cannot downvote before upvoting."]);
    exit;
  }

  // first time upvote
  $insert_sql = "INSERT INTO answer_votes (user_id, answer_id, vote_type) VALUES ($userId, $answerId, '$voteType')";
  $conn->query($insert_sql);
}

// update answer votes count
$update_votes_sql = "UPDATE answers SET votes = $newVotes WHERE id = $answerId";
$conn->query($update_votes_sql);

echo json_encode(["success" => true, "votes" => $newVotes]);
?>

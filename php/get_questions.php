<?php
require_once("db.php");
header('Content-Type: application/json');

$query = "SELECT q.id, q.title, q.created_at, u.username AS author
          FROM questions q
          JOIN users u ON q.user_id = u.id
          ORDER BY q.created_at DESC";

$result = $conn->query($query);

$questions = [];

while ($row = $result->fetch_assoc()) {
  $questions[] = $row;
}

echo json_encode($questions);
?>

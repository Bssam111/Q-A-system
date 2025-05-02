<?php
include("connection.php");
header('Content-Type: application/json');

$questionId = isset($_GET['id']) ? intval($_GET['id']) : 0;

$sql = "SELECT * FROM answers WHERE question_id = ? ORDER BY created_at ASC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $questionId);
$stmt->execute();
$result = $stmt->get_result();

$answers = [];
if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $answers[] = $row;
  }
}

echo json_encode($answers);
$stmt->close();
$conn->close();
?>

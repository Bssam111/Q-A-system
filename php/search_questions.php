<?php
require_once("db.php");
header('Content-Type: application/json');

$q = $_GET['q'] ?? '';
$q = trim($q);

if ($q === '') {
  echo json_encode(["error" => "Missing search keyword"]);
  exit;
}

// البحث في عنوان السؤال
$stmt = $conn->prepare("SELECT id, title FROM questions WHERE title LIKE CONCAT('%', ?, '%')");
$stmt->bind_param("s", $q);
$stmt->execute();

$result = $stmt->get_result();
$questions = [];

while ($row = $result->fetch_assoc()) {
  $questions[] = $row;
}

echo json_encode(["success" => true, "questions" => $questions]);
?>

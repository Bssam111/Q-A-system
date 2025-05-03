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
$sql = "SELECT id, title FROM questions WHERE title LIKE '%$q%'";
$result = $conn->query($sql);
$questions = [];

while ($row = $result->fetch_assoc()) {
  $questions[] = $row;
}

echo json_encode(["success" => true, "questions" => $questions]);
?>

<?php
session_start();
require_once("db.php");
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["success" => false, "message" => "Not logged in"]);
  exit;
}

$title = trim($_POST['title']);
$content = trim($_POST['content']);
$userId = $_SESSION['user_id'];

if ($title === "" || $content === "") {
  echo json_encode(["success" => false, "message" => "Title or content is empty"]);
  exit;
}

$sql = "INSERT INTO questions (user_id, title, content) VALUES ($userId, '$title', '$content')";
$conn->query($sql);

echo json_encode(["success" => true]);
?>

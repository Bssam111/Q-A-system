<?php
session_start();
require_once("db.php");

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
$result = $conn->query($sql);

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    $_SESSION['username'] = $user['username'];
    $_SESSION['user_id'] = $user['id'];
    header("Location: ../home.php");
} else {
    header("Location: ../login.html?error=user");
}
?>

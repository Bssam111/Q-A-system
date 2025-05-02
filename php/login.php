<?php
session_start();
require_once("db.php");

$username = $_POST['username'];
$password = $_POST['password'];

$result = mysqli_query($conn, "SELECT * FROM users WHERE username='$username'");
$user = mysqli_fetch_assoc($result);

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    header("Location: ../home.php");
} else {
    header("Location: ../login.html?error=user");
}
?>

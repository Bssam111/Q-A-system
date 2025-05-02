<?php
$host = "localhost";
$dbname = "stacklite_db";
$user = "root";
$pass = "";

// الاتصال بقاعدة البيانات
$conn = new mysqli($host, $user, $pass, $dbname);

// فحص الاتصال
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>

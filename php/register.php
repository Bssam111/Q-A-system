<?php
// // الاتصال بقاعدة البيانات (localhost, root, بدون باسورد, قاعدة stacklite_db)
// $conn = new mysqli("localhost", "root", "", "stacklite_db");

// // تحقق من الاتصال
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }

// // جلب البيانات من النموذج
// $username = $_POST['username'];
// $email = $_POST['email'];
// $password = $_POST['password'];

// // التحقق من أن الحقول مو فاضية (احتياطًا)
// if (empty($username) || empty($email) || empty($password)) {
//     die("Please fill in all fields.");
// }

// // تشفير كلمة المرور (مهم جدًا)
// $hashed = password_hash($password, PASSWORD_DEFAULT);

// // تجهيز أمر الإدخال (INSERT)
// $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hashed')";

// // تنفيذ الأمر
// if ($conn->query($sql) === TRUE) {
//     header("Location: ../home.html");
//     exit();
// }
// else {
//     echo "Error: " . $conn->error;
// }

// // إغلاق الاتصال
// $conn->close();

require_once("db.php");

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

$result=$conn->query("SELECT * FROM users WHERE username='$username' OR email='$email'");

if($result->num_rows > 0){
    header("Location: ../register.html?error=user");
    exit();
}

$sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
$conn->query($sql);
header("Location: ../home.html");

?>

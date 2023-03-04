<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "thitracnghiem";

// Tạo kết nối đến cơ sở dữ liệu
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Kiểm tra kết nối 
if (!$conn) {
    die("Kết nối cơ sở dữ liệu thất bại: " . mysqli_connect_error());
}

//  đăng nhập 


$sql = "SELECT * FROM nguoidung";
$result = mysqli_query($conn, $sql);

// Đưa kết quả truy vấn vào một mảng
$data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// Trả về kết quả dưới dạng JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
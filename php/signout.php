<?php
require_once("dbconfig.php");
$_POST = JSON_DECODE(file_get_contents("php://input"), true); //관습적인 것

//클라이언트로 부터 userEmail 값을 전달받음
$userEmail = $_POST["userEmail"];

//해당유저가 있는 지를 판단
$sql = "SELECT * FROM user WHERE userEmail = '$userEmail'";

$res = $db->query($sql); //실행결과는 $res에 저장
$row = $res->fetch_array(MYSQLI_ASSOC);
if ($row !== null) {
    $sql = "DELETE FROM user WHERE userEmail = '$userEmail'"; // user 테이블로부터 email이 일치하는 행을 삭제한다.
    $db->query($sql); //실행결과는 $db에 저장
    echo true;
} else {
    echo false;
}

mysqli_close($db);

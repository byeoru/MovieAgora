<?php
require_once("dbconfig.php");
$_POST = JSON_DECODE(file_get_contents("php://input"), true);

// 프론트엔드에서 넘어온 로그인된 계정의 user id,
$userId = $_POST["userId"];

// 현재 로그인된 user id로 bookmark table에 추가된 모든 row를 가져온다
$sql = "SELECT * FROM bookmark WHERE userId = '$userId'";
$res = $db->query($sql);

$data = array();

// 가져온 배열을 요소 개수만큼 fetch한다.
for ($i = 0; $i < $res->num_rows; $i++) {
    $row = $res->fetch_array(MYSQLI_ASSOC);
    array_push($data, $row);
}

if ($data !== null) {
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
} else {
    echo json_encode(false, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
}

mysqli_close($db);

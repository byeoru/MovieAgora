<?php
require_once("dbconfig.php");
$_POST = JSON_DECODE(file_get_contents("php://input"), true);

// 프론트엔드에서 넘어온 로그인된 계정의 user id,
// 현재 페이지의 category id, content id, content name
$userId = $_POST["userId"];
$category = $_POST["categoryId"];
$contentId = $_POST["contentId"];
$contentName = $_POST["contentName"];

// bookmark table에 추가한다.
$sql = "INSERT INTO `bookmark` (`userId`, `categoryId`, `contentId`, `contentName`) 
        VALUE ('$userId', '$category', '$contentId', '$contentName')";

// sql 실행
$res = $db->query($sql);

// $res값이 true면(성공 했으면)
if ($res) {
    echo json_encode(true, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
} else {// $res 값이 false면
    echo json_encode(false, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
}

// db 종료
mysqli_close($db);

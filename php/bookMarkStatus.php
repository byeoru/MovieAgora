<?php
require_once("dbconfig.php");
$_POST = JSON_DECODE(file_get_contents("php://input"), true);

// 프론트엔드에서 넘어온 로그인된 계정의 user id,
// 현재 페이지의 해당 content id 
$userId = $_POST["userId"];
$contentId = $_POST["contentId"];

// bookmark tabld에서 현재 로그인된 user id로 현재 페이지의 content id를 추가(북마크) 한적이 있는지 검사하여
// 있다면 user id를 반환
$sql = "SELECT userId FROM bookmark WHERE userId = '$userId' AND contentId = '$contentId'";
$res = $db->query($sql);

// 하나의 content는 북마크는 한 번만 할 수 있기 때문에 마찬가지로 한 번만 fetch한다
$row = $res->fetch_array(MYSQLI_ASSOC);

if ($row !== null) {
    echo json_encode(true, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
} else {
    echo json_encode(false, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
}

mysqli_close($db);

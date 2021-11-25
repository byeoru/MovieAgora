<?php
// 댓글 작성 php
require_once("dbconfig.php");
$_POST = JSON_DECODE(file_get_contents("php://input"), true);

$contentId = $_POST["contentId"];
$userEmail = $_POST["userEmail"];
$comment = $_POST["new_comment"];

$sql = "INSERT INTO `comments` (`contentId`, `comment`, `userEmail`)
    VALUES ('$contentId', '$comment', '$userEmail')";
$res = $db->query($sql);
if ($res) {
    echo json_encode(true, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);;  // 성공
} else {
    echo json_encode(false, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);; // 실패
}

mysqli_close($db);

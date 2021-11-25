<?php
require_once("dbconfig.php");
$_POST = JSON_DECODE(file_get_contents("php://input"), true);

$contentId = $_POST["contentId"];

$sql = "SELECT * FROM comments WHERE contentId = '$contentId' ORDER BY timestamp DESC";

// 불러온 댓글
$data = array();

$res = $db->query($sql);

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

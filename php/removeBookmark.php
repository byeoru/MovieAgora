<?php
require_once("dbconfig.php");
$_POST = JSON_DECODE(file_get_contents("php://input"), true);

$userId = $_POST["userId"];
$contentId = $_POST["contentId"];

$sql = "DELETE FROM bookmark WHERE userId = '$userId' AND contentId = '$contentId'";

$res = $db->query($sql);

if ($res) {
    echo json_encode(true, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
} else {
    echo json_encode(false, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
}

mysqli_close($db);

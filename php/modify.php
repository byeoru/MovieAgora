<?php
require_once("dbconfig.php");
$_POST = JSON_DECODE(file_get_contents("php://input"), true); //관습적인 것

$userEmail = $_POST["userEmail"]; //유저 e-mail겸 id
$userPwd = $_POST["userPwd"]; //유저 password
$userPwdHashed = password_hash($userPwd, PASSWORD_DEFAULT); //유저 password 해쉬
$userName = $_POST["userName"]; //유저 이름
$userGender = $_POST["userGender"]; //유저 성별
$userBirth = $_POST["userBirth"]; //유저 생일

$sql = "SELECT * FROM user WHERE userEmail = '$userEmail'"; //해당유저가 있는 지를 판단
$res = $db->query($sql);
$row = $res->fetch_array(MYSQLI_ASSOC);
if ($row !== null) {
    // $sql = "UPDATE `user` 
    //     SET (userPwd = $userPwdHashed, userName = $userName, userGender = $userGender, userBirth = $userBirth) 
    //     WHERE userEmail = $userEmail";
    $sql = "UPDATE user
     SET userPwd = '$userPwdHashed', userName = '$userName', userGender = '$userGender', userBirth = '$userBirth'
     WHERE userEmail = '$userEmail'";
    $db->query($sql);
    echo true;
} else { //동일한 ID의 유저가 있다면 false
    echo false;
}
mysqli_close($db);

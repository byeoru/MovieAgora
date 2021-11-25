<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

header("Content-Type:application/json");

//로컬 db
$host = 'localhost';
$user = 'root';
$pw = 486548;
$dbName = 'web_project';
$db = new mysqli($host, $user, $pw, $dbName);

mysqli_set_charset($db, "utf8");

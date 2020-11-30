<?php

if($admin != "allow"){
    header("HTTP/1.0 404 Not Found");
	header("HTTP/1.1 404 Not Found");
	header("Status: 404 Not Found");
	exit();
}

?>

<!DOCTYPE html>
<html>
<head>
	<title>Админка</title>
	<meta charset = "utf-8">
</head>
<style>
<?php require "/adminer/css/style.css"; ?>
</style>
<body>
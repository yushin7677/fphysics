<?php

if($admin != "allow"){
    header('location: /error/404');
    exit;
}

$auth = file_get_contents("adminer/enter.json");
$auth = json_decode($auth);
$login = $auth->Login;
$password = $auth->Password;
unset($auth);

session_start();

if ($_SESSION["ylogin"] == $login && password_verify($_SESSION["ypassword"],$password)){
	unset($login, $password);
	require "/adminer/templates/header.php";
	require "/adminer/templates/manage.php";
	require "/adminer/templates/footer.php";
}
else{
	unset($login, $password);
	require "enter.php";
}

?>
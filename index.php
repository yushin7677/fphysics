<?php

$route = $_GET['route'];
if( $route!="admin" ){
	
	// Получение json-массива ссылок на статьи
	$articles = file_get_contents("articles.json");
	$articles = str_replace(PHP_EOL,'', $articles);
	
	// Получение json-массива пунктов меню
	$menu = file_get_contents("menu.json");
	$menu = str_replace(PHP_EOL,'', $menu);
	
	// Проверка наличия ссылки $route в json-ссылках
	if ($route!=""){
		if (json_decode($articles)->$route){}
		else if($route!="/error/404" && $route!="error/404") header ('location: /error/404');
	};
	
	// Загрузка элементов страницы
	require "templates/header.php";
	require "templates/menu.php";
	require "templates/content.php";
	require "templates/footer.php";
}
else{
	$admin = "allow";
	require "adminer/admin.php";
	unset($admin);
}

?>
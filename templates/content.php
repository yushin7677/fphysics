<?php

echo '<div id = "content">';
if ($route != ""){
	$way = json_decode($articles);
	$way = $way->$route;
	
	if($route == "error/404" || $route == "/error/404") echo "Такой страницы нет!";
	else require "content/".$way.".php";
}
echo '</div>';

?>
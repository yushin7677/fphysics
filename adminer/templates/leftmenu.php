<?php

if($admin != "allow"){
    header('location: /error/404');
    exit;
}

?>

<div id = "openarticles" class = "select-menu">Статьи</div>
<div id = "openimages" class = "select-menu">Картинки</div>
<div id = "openmenu" class = "select-menu">Меню</div>
<div id = "openenter" class = "select-menu">Доступ</div>
<div id = "logout" class = "select-menu">Выйти</div>
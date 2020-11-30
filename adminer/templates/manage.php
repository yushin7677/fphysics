<?php

if($admin != "allow"){
    header('location: /error/404');
    exit;
}

?>

<div id = "leftlogo">
</div>
<div id = "header"></div>
<div id = "leftmenu">
<?php require "leftmenu.php"; ?>
</div>
<div id = "content"></div>
<?php

if($admin != "allow"){
    header('location: /error/404');
    exit;
}

?>

</body>
<script>
<?php require "/adminer/js/admin.js"; ?>
</script>
</html>
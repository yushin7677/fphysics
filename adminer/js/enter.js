document.getElementById("enter").onclick = function(){
	enterInAdmin();
};

function enterInAdmin(){
	var action = "login";
	var ylogin = document.getElementById("ylogin").value;
	var ypassword = document.getElementById("ypassword").value;
	var request=new XMLHttpRequest();
    request.open('POST','/core/core.php',true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.addEventListener('readystatechange', function(){
        if ((request.readyState==4) && (request.status==200)){
			document.location.href = "/admin";
        };
    });
    request.send("action=" + action + "&ylogin=" + ylogin + "&ypassword=" + ypassword);
}
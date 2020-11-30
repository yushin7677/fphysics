// Действия при загрузке страницы

// Запрет всплывающего меню браузера

document.oncontextmenu = function(){
	return false;
}

// Инициализация переменных

var menuList;
var fileList;

// Обработчики нажатия меню

document.getElementById("openarticles").onmousedown = openArticles;
document.getElementById("openimages").onmousedown = openImages;
document.getElementById("openmenu").onmousedown = openMenu;
document.getElementById("openenter").onmousedown = openEnter;
document.getElementById("logout").onmousedown = logout;

// Функции

function pointClick(node){
	var pointsMenu = document.getElementsByClassName("select-menu");
	for(var i in pointsMenu){
		pointsMenu[i].className = "select-menu";
	}
	node.className = "select-menu select-menu-choosed";
}

function createElement(tag, classname, id, node, action){
	var newElement=document.createElement(tag);
	newElement.className=classname;
	newElement.id=id;
	switch (action) {
		case "append":
			node.append(newElement);
			break;
		case "prepend":
			node.prepend(newElement);
			break;
		case "before":
			node.before(newElement);
			break;
		case "after":
			node.after(newElement);
			break;
		case "replaceWith":
			node.replaceWith(newElement);
			break;
		default:
			console.log("action is not valid!");
	}
	return newElement;
}

function loadMenu(art,node,put){
	
	// Создание пунктов меню
	for (var key in art){
		var NewElement = createElement("div", art[key][0], null, node, put);
		if(art[key][0] == "file"){
			NewElement.innerHTML = art[key][1];
			NewElement.dataset.key = art[key][1];
			NewElement.dataset.way = art[key][2];
			var NewElement2 = createElement("button", "rename", null, NewElement, put);
			NewElement2.innerHTML = "Изменить";
			NewElement2 = createElement("button", "minus", null, NewElement, put);
			NewElement2.innerHTML = "-";
		}
		else if(art[key][0] == "catalog"){
			NewElement.innerHTML = "<div data-array='" + JSON.stringify(art[key][2]) + "' data-openness='close' data-key='" + art[key][1] + "' class='catalog-choose'>" + art[key][1] + "<button class='rename' id='null'>Переименовать</button><button class='minus' id='null'>-</button></div>";
		}
	}
	var NewElement0 = createElement("div", "", null, node, put);
	var NewElement = createElement("button", "plusFile", null, NewElement0, put);
	NewElement.innerHTML = " + File ";
	NewElement = createElement("button", "plusCatalog", null, NewElement0, put);
	NewElement.innerHTML = " + Catalog ";
	
	react();
}

function logout(){
	var action = "logout";
	var request=new XMLHttpRequest();
    request.open('POST','/core/core.php',true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.addEventListener('readystatechange', function(){
        if ((request.readyState==4) && (request.status==200)){
			if(request.responseText == 1){
				document.location.href = "/admin";
			};
        };
    });
    request.send("action=" + action);
}

function openArticles(){
	pointClick(document.getElementById("openarticles"));
	var action = "loadArticles";
	var request=new XMLHttpRequest();
    request.open('POST','/core/core.php',true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.addEventListener('readystatechange', function(){
        if ((request.readyState==4) && (request.status==200)){
			var files = JSON.parse(request.responseText)[0];
			var json = JSON.parse(request.responseText)[1];
			var out = "";
			for(var i in files){
				var url = "";
				for (var key in json){
					if ((json[key] + ".php") == files[i]){
						url = key;
					}
				}
				out += "<div data-way='" + files[i] + "' data-url='" + url + "' class='article'><p>" + files[i] + "</p><button class='deleteArticle'>Удалить</button></div>";
			}
			out += "<div id='plus_article'><p>+</p></div>";
			document.getElementById("content").innerHTML = out;
			var articles = document.getElementsByClassName("article");
			for (i = 0; i < articles.length; i++){
				articles[i].onmousedown = function(){
					chooseArticle(this);
				}
			}
			var deleters = document.getElementsByClassName("deleteArticle");
			for (var i in deleters){
				deleters[i].onmousedown = function(){
					event.stopPropagation();
					deleteArticle(this.parentNode.dataset.way);
					openArticles();
				}
			}
			document.getElementById("plus_article").onmousedown = function(){
				saveArticle(this);
				openArticles();
			}
        };
    });
    request.send("action=" + action);
}

function chooseArticle(node){
	var action = "chooseArticle";
	var article = node.dataset.way;
	var request=new XMLHttpRequest();
    request.open('POST','/core/core.php',true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.addEventListener('readystatechange', function(){
        if ((request.readyState==4) && (request.status==200)){
			var out = "<div id = 'article' data-old = '" + article + "'>";
			out += "<p>Имя:<input type = 'text' id = 'filename'></p>";
			out += "<p>Ссылка:<input type = 'text' id = 'urlname'></p>";
			out += "<button id = 'saveArticle'>Сохранить</button>";
			out += "<button id = 'closeArticle'>Закрыть без сохранения</button>";
			out += "<textarea id='contentText'>";
			out += "</textarea>";
			out += "</div>";
			document.getElementById("content").innerHTML = out;
			document.getElementById("filename").value = article;
			document.getElementById("urlname").value = node.dataset.url;
			document.getElementById("contentText").value = request.responseText;
			document.getElementById("saveArticle").onmousedown = function(){
				saveArticle(this);
			};
			document.getElementById("closeArticle").onmousedown = function(){
				openArticles();
			};
        };
    });
    request.send("action=" + action + "&article=" + article);
}

function openImages(){
	pointClick(document.getElementById("openimages"));
	var action = "loadImages";
	var request=new XMLHttpRequest();
    request.open('POST','/core/core.php',true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.addEventListener('readystatechange', function(){
        if ((request.readyState==4) && (request.status==200)){
			var files = JSON.parse(request.responseText);
			var out = "";
			for(var i = 2; i < files.length; i++){
				out += "<div data-way='" + files[i] + "' class='image'><img src='/images/" + files[i] + "' width='400px'><p>" + files[i] + "</p><button class='deleteImage'>Удалить</button></div>";
			}
			out += '<div id="image_inputs">';
			out += '<div id="choose_file_div" class="choose_file_div"><input type="file" id="choose_file"><p id="text_file">Выберите или перетащите фотографии</p></div>';
			out += '<button id="upload">Загрузить</button></div>';
			document.getElementById("content").innerHTML = out;
			document.getElementById("choose_file_div").ondragenter = function(){
				this.className = "choose_file_div_hover";
			}
			document.getElementById("choose_file_div").ondragleave = function(){
				this.className = "choose_file_div";
			}
			document.getElementById("choose_file_div").ondrop = function(){
				this.className = "choose_file_div";
			}
			document.getElementById("text_file").ondropover = function(){
				document.getElementById("choose_file_div").className = "choose_file_div_hover";
			}
			document.getElementById("choose_file_div").onchange = function(){
				document.getElementById("text_file").innerHTML = "файл готов к загрузке";
			}
			document.getElementById("upload").onmousedown = function(){
				addImage();
			}
			var deleters = document.getElementsByClassName("deleteImage");
			for (var i in deleters){
				deleters[i].onmousedown = function(){
					deleteImage(this.parentNode.dataset.way);
				}
			}
        };
    });
    request.send("action=" + action);
}

function openMenu(){
	pointClick(document.getElementById("openmenu"));
	var action = "loadMenu";
	var request=new XMLHttpRequest();
    request.open('POST','/core/core.php',true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.addEventListener('readystatechange', function(){
        if ((request.readyState==4) && (request.status==200)){
			menuList = JSON.parse(request.responseText);
			var out = "";
			out += "<div id='menuForUser'></div><button id='saveMenu'> save </button>";
			document.getElementById("content").innerHTML = out;
			var menuForUser = document.getElementById("menuForUser");
			loadMenu(menuList,menuForUser,"append");
        };
    });
    request.send("action=" + action);
}

function openEnter(){
	pointClick(document.getElementById("openenter"));
	var action = "loadEnter";
	var request=new XMLHttpRequest();
    request.open('POST','/core/core.php',true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.addEventListener('readystatechange', function(){
        if ((request.readyState==4) && (request.status==200)){
			document.getElementById("content").innerHTML = request.responseText;
			document.getElementById("enter").onclick = function(){
				changeLogin();
			};
        };
    });
    request.send("action=" + action);
}

function openHrefMenu(node){
	if (document.getElementById("href-menu")){
		document.getElementById("href-menu").parentNode.removeChild(document.getElementById("href-menu"));
	};
	var NewElement = createElement("div", "swim", "href-menu", document.getElementById("content"), "append");
	var out = "<div class = 'swim' id='href-menu' >";
	out += "<p>Имя:<input type='text' id='href-name' value='" + node.dataset.key + "'></p>";
	if (node.className == "file") out += "<p>Ссылка:<input type='text' id='href-way' value='" + node.dataset.way + "'></p>";
	out += "<button id='save'>Сохранить</button>";
	out += "<button id='cancel'>Отменить</button>";
	out += "</div>";
	NewElement.outerHTML = out;
	var hrefMenu = document.getElementById("href-menu");
	document.getElementById("save").onmousedown = function(){
		node.innerHTML = node.dataset.key = document.getElementById("href-name").value;
		if (node.className == "file") node.dataset.way = document.getElementById("href-way").value;
		hrefMenu.parentNode.removeChild(hrefMenu);
		var NewElement = createElement("button", "rename", null, node, "append");
		if (node.className == "file") NewElement.innerHTML = "Изменить";
		else NewElement.innerHTML = "Переименовать";
		NewElement = createElement("button", "minus", null, node, "append");
		NewElement.innerHTML = "-";
		rewriteCatalog(node);
		react();
	}
	document.getElementById("cancel").onmousedown = function(){
		hrefMenu.parentNode.removeChild(hrefMenu);
	}
}

function saveMenu(){
	var menuPoints = document.getElementById("menuForUser").children;
	var json = new Array();
	for(var i = 0; i < menuPoints.length - 1; i++){
		if (menuPoints[i].className == "file") json[i] = ["file", menuPoints[i].dataset.key, menuPoints[i].dataset.way]; 
		else if (menuPoints[i].className == "catalog"){
			var catalog = menuPoints[i].children[0];
			json[i] = ["catalog", catalog.dataset.key, JSON.parse(catalog.dataset.array)];
		}
	}
	json = JSON.stringify(json);
	var action = "saveMenu";
	var request=new XMLHttpRequest();
    request.open('POST','/core/core.php',true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.addEventListener('readystatechange', function(){
        if ((request.readyState==4) && (request.status==200)){
			console.log(request.responseText);
        };
    });
    request.send("action=" + action + "&yjson=" + json);
}

function saveArticle(node){
	if (node.id == "plus_article"){
		var oldarticle = "new.php";
		var article = "new.php";
		var url = "Новая статья";
		var content = "";
	}
	else{
		var oldarticle = document.getElementById("article").dataset.old;
		var article = document.getElementById("filename").value;
		var url = document.getElementById("urlname").value;
		var content = encodeURIComponent(document.getElementById("contentText").value); // Иначе пропадут спецсимволы
	}
	var action = "saveArticle";
	var request=new XMLHttpRequest();
    request.open('POST','/core/core.php',true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.addEventListener('readystatechange', function(){
        if ((request.readyState==4) && (request.status==200)){
			console.log(request.responseText);
        };
    });
    request.send("action=" + action + "&article=" + article + "&oldarticle=" + oldarticle + "&url=" + url + "&content=" + content);
}

function deleteArticle(article){
	var action = "deleteArticle";
	var request=new XMLHttpRequest();
    request.open('POST','/core/core.php',true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.addEventListener('readystatechange', function(){
        if ((request.readyState==4) && (request.status==200)){
			console.log(request.responseText);
        };
    });
    request.send("action=" + action + "&article=" + article);
}

function rewriteCatalog(node){
	if (node.parentNode.className == "catalog"){
		var menuPoints = node.parentNode.children;
		var json = new Array();
		for(var i = 0; i < menuPoints.length - 2; i++){
			if (menuPoints[i+1].className == "file") json[i] = ["file", menuPoints[i+1].dataset.key, menuPoints[i+1].dataset.way]; 
			else if (menuPoints[i+1].className == "catalog"){
				var catalog = menuPoints[i+1].children[0];
				json[i] = ["catalog", catalog.dataset.key, JSON.parse(catalog.dataset.array)];
			}
		}
		menuPoints[0].dataset.array = JSON.stringify(json);
		rewriteCatalog(node.parentNode);
	};
}

async function addImage(){
	var files = document.getElementById("choose_file").files;
	var data = new FormData();
	data.append("action","addImage");
	for(var key in files){
		data.append(key, files[key]);
	};

	var request = {
        method: 'POST',
        body: data,
    };
	
	var response = await fetch("/core/core.php", request);
	console.log(response.text());
	openImages();
}

async function deleteImage(name){
	var data = new FormData();
	data.append("action","deleteImage");
	data.append("image",name);

	var request = {
        method: 'POST',
        body: data,
    };
	
	var response = await fetch("/core/core.php", request);
	openImages();
}

function changeLogin(){
	var action = "changeLogin";
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
};

function react(){
	var plusFiles = document.getElementsByClassName("plusFile");
	var plusCatalogs = document.getElementsByClassName("plusCatalog");
	var files = document.getElementsByClassName("file");
	var catalogs = document.getElementsByClassName("catalog");
		
	// Обработчик нажатия файлов
	for(var i = 0; i < files.length; i++){
		files[i].getElementsByClassName("rename")[0].onmousedown = function(){
			openHrefMenu(this.parentNode);
		}
		files[i].getElementsByClassName("minus")[0].onmousedown = function(){
			var parentN = this.parentNode.parentNode;
			parentN.removeChild(this.parentNode);
			rewriteCatalog(parentN.children[0]);
		}
	}
		
	// Обработчик нажатия каталогов
	for(var i = 0; i < catalogs.length; i++){
		catalogs[i].getElementsByTagName("div")[0].onmousedown = function(){
			event.stopPropagation();
			if(this.dataset.openness == "close"){
				loadMenu(JSON.parse(this.dataset.array),this.parentNode,"append");
				this.dataset.openness = "open";
			}
			else{
				var children = this.parentNode.getElementsByTagName("*");
					
				// Удаление всех эелементов, кроме первых трех
				for (var i = children.length - 1; i > 2; i--){
					children[i].parentNode.removeChild(children[i]);
				}
				this.dataset.openness = "close";
				react();
			}
		}
		catalogs[i].getElementsByClassName("rename")[0].onmousedown = function(){
			event.stopPropagation();
			openHrefMenu(this.parentNode);
		}
		catalogs[i].getElementsByClassName("minus")[0].onmousedown = function(){
			event.stopPropagation();
			var parentN = this.parentNode.parentNode.parentNode;
			parentN.removeChild(this.parentNode.parentNode);
			rewriteCatalog(parentN.children[0]);
			react();
		}
	}
		
	// Обработчик вставки нового файла
	for(var i = 0; i < plusFiles.length; i++){
		plusFiles[i].onmousedown = function(){
			var NewElement = createElement("div", "file", null, this.parentNode, "before");
			NewElement.dataset.key = "Новая ссылка";
			NewElement.dataset.way = "";
			NewElement.innerHTML = "Новая ссылка<button class='rename' id='null'>Переименовать</button><button class='minus' id='null'>-</button>";
			rewriteCatalog(this.parentNode);
			react();
		}
	}
		
	// Обработчик вставки нового каталога
	for(var i = 0; i < plusCatalogs.length; i++){
		plusCatalogs[i].onmousedown = function(){
			var NewElement = createElement("div", "catalog", null, this.parentNode, "before");
			NewElement.innerHTML = "<div data-array='{}' data-openness='close' data-key='Новый каталог' class='catalog-choose'>Новый каталог<button class='rename' id='null'>Переименовать</button><button class='minus' id='null'>-</button></div>";
			rewriteCatalog(this.parentNode);
			react();
		}
	}
		
	// Обработчик сохранения
	for(var i = 0; i < plusCatalogs.length; i++){
		document.getElementById("saveMenu").onmousedown = function(){
			saveMenu();
			react();
		}
	}
}

// Действия при загрузке

var menu = document.getElementById("menu");
loadArticles(menuList,menu,"append");

// Функции

function loadArticles(art,node,put){
	
	for (var key in art){
		var NewElement = createElement("div", art[key][0], null, node, put);
		if(art[key][0] == "file"){
			NewElement.innerHTML = art[key][1];
			NewElement.dataset.key = art[key][1];
			NewElement.dataset.way = art[key][2];
		}
		else if(art[key][0] == "catalog"){
			NewElement.innerHTML = "<div data-array='" + JSON.stringify(art[key][2]) + "' data-openness='close' data-key='" + art[key][1] + "' class = 'catalog-choose'>" + art[key][1] + "</div>";
		}
	}
	var files = document.getElementsByClassName("file");
	var catalogs = document.getElementsByClassName("catalog");
	
	
	// Обработчики нажатия меню
	for(var i = 0; i < files.length; i++){
		files[i].onmousedown = function(){
			document.location.href = "/" + this.dataset.way;
		}
	}

	for(var i = 0; i < catalogs.length; i++){
		catalogs[i].getElementsByTagName("div")[0].onmousedown = function(){
			if(this.dataset.openness == "close"){
				loadArticles(JSON.parse(this.dataset.array),this.parentNode,"append");
				this.dataset.openness = "open";
			}
			else{
				var children = this.parentNode.getElementsByTagName("div");
					
				// Удаление всех эелементов, кроме первого
				for (var i = children.length - 1; i > 0; i--){
					children[i].parentNode.removeChild(children[i]);
				}
				this.dataset.openness = "close";
			}
		}
	}
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
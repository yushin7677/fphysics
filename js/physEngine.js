// Основной конструктор игры
function yph_gamePanel(node,figures){
	this.figures = figures;
	this.t = 0;
	this.dt = 10;
	this.timerId;
	this.node = node;
}

// Временные глобальные переменные
var pi = 3.141592;
var gamePanels = new Array();
var colors = ["#F00","#080","#008","#08F","#840"];

// Kонструктор объекта
function yph_object(parameters,node,color){
	
	// Блок параметров
	this.parameters = parameters;
	
	// Физические переменные	
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.ax = 0;
	this.ay = 0;
	this.t = 0;
	this.dt = 10;
	this.m = 1;
	this.V = 1;
	this.ro = 1000;
	
	// Html-объект
	this.node = node;
	
	// Цвет объекта
	this.color = color;
	
	// Скрипты для выполнения
	this.code = code;
}

// Действия при загрузке
var yph_physGame = document.getElementsByClassName("yph_physGame");
for (var i = 0; i < yph_physGame.length; i++){
	var parameters = JSON.parse(yph_physGame[i].dataset.parameters);
	var figures = JSON.parse(yph_physGame[i].dataset.figures);
	var n = JSON.parse(yph_physGame[i].dataset.n);
	var min = n[0];
	var max = n[1];
	var code = htmlDecode(yph_physGame[i].innerHTML);
	
	// Создание блоков для игры
	var out = "<div class='quantity_panels'>";
	for (var j = 0; j < 1; j++){
		out += "<div class='parameters' style='border:1px #000 solid;'>";
		for (var key in parameters){
			out += "<label> " + key + " </label><input type='text' class='" + key + "' value='" + parameters[key] + "'>";
		}
		out += "</div>";
	}
	out += "</div>";
	out += "<div class='small_buttons'>";
	out += "<button class='start small_button'>Старт</button>";
	out += "<button class='contine small_button' style='display:none'>Продолжить</button>";
	out += "<button class='retry small_button' style='display:none'>Сброс</button>";
	out += "<button class='stop small_button' style='display:none'>Стоп</button>";
	out += "</div>";
	out += "<div class='objects' style='height:" + yph_physGame[i].dataset.obj_height + "px'>";
	out += "<div class='object' style='width:50px; height:50px; background-color:#F00;'></div>";
	out += "</div>";
	out += "<div class='figures'>";
	for (var k in figures){
		out += '<p>' + figures[k][2] + '</p>';
		out += '<canvas class="figure" width="600" height="400"></canvas>';
	}
	out += "</div>";
	yph_physGame[i].innerHTML = out;
	
	var canvases = yph_physGame[i].getElementsByClassName("figures")[0].getElementsByTagName("canvas");
	for (var k in figures){
		drawAxis(canvases[k],200);
	}
	
	// Создание объекта для игровой панели
	gamePanels[i] = new yph_gamePanel(yph_physGame[i],figures);
	
	// Создание программных объектов для физических объектов
	objs = yph_physGame[i].getElementsByClassName("object");
	pars = yph_physGame[i].getElementsByClassName("parameters");
	var objects = new Array();
	for(var k = 0; k < objs.length; k++){
		objects[k] = new yph_object(pars[k],objs[k],colors[k],code);

		// Создание дополнительных физических переменных
		for (var key in parameters){
			objects[k][key] = parameters[key];
		}
		
		// Начальный сдвиг
		objects[k].node.style.transform = "translate("+20*objects[k].x+"px,"+20*objects[k].y+"px)";
	}
	
	// Инициализация кнопок
	initial(gamePanels[i],objects,canvases);
}

// Функция инициализации
function initial(game,objects,canvases){
	
	// Привяжем переменные к кнопкам
	var start_but=game.node.getElementsByClassName("start")[0];
	var contine_but=game.node.getElementsByClassName("contine")[0];
	var stop_but=game.node.getElementsByClassName("stop")[0];
	var retry_but=game.node.getElementsByClassName("retry")[0];
	
	// Создадим обработчики нажатий кнопок
	start_but.onclick = function(){
		t = 0;
		beginMove(game,objects,canvases);
		start_but.style.display = "none";
		stop_but.style.display = "block";
	}
	contine_but.onclick = function(){
		beginMove(game,objects,canvases);
		contine_but.style.display = "none";
		stop_but.style.display = "block";
		retry_but.style.display = "none";
	}
	stop_but.onclick = function(){
		stopMove(game);
		contine_but.style.display = "block";
		stop_but.style.display = "none";
		retry_but.style.display = "block";
	}
	retry_but.onclick = function(){
		t = 0;
		for(var i = 0; i < objects.length; i++){
			objects[i].x = objects[i].y = 0;
			objects[i].t = 0;
			objects[i].node.style.transform = "translate(0px,0px)";
			var x = objects[i].parameters.getElementsByClassName("x")[0];
			var vx = objects[i].parameters.getElementsByClassName("vx")[0];
			var ax = objects[i].parameters.getElementsByClassName("ax")[0];
			var y = objects[i].parameters.getElementsByClassName("y")[0];
			var vy = objects[i].parameters.getElementsByClassName("vy")[0];
			var ay = objects[i].parameters.getElementsByClassName("ay")[0];
			if (x != undefined) x.value = 0; else objects[i].x = 0; 
			if (vx != undefined) vx.value = 0; else objects[i].vx = 0;
			if (ax != undefined) ax.value = 0; else objects[i].ax = 0;
			if (y != undefined) y.value = 0; else objects[i].y = 0;
			if (vy != undefined) vy.value = 0; else objects[i].vy = 0;
			if (ay != undefined) ay.value = 0; else objects[i].ay = 0;		
		}
		for(var i = 0; i < canvases.length; i++){
			clearCanvas(canvases[i],200);
		}
		start_but.style.display = "block";
		contine_but.style.display = "none";
		retry_but.style.display = "none";
	}
};

// Функция рисования осей
function drawAxis(canvas,hor){
	var context = canvas.getContext("2d");
	context.beginPath();
	context.lineWidth = 1;
	context.strokeStyle="#CCC";
	for(var i=10; i<canvas.height; i=i+10){
		context.moveTo(1,i);
		context.lineTo(canvas.width,i);
		context.stroke();
	};
	for(var i=20; i<canvas.width; i=i+20){
		context.moveTo(i,1);
		context.lineTo(i,canvas.height);
		context.stroke();
	};
	context.beginPath();
	context.lineWidth = 2;
	context.strokeStyle="#000";
	context.moveTo(1,0);
	context.lineTo(1,600);
	context.stroke();
	context.moveTo(0,hor);
	context.lineTo(1000,hor);
	context.stroke();
	for(var i=10; i<canvas.height; i=i+10){
		context.moveTo(1,i);
		context.lineTo(6,i);
		context.stroke();
	};
	for(var i=20; i<canvas.width; i=i+20){
		context.moveTo(i,hor);
		context.lineTo(i,hor-6);
		context.stroke();
	};
};

// Функция рисования графика
function drawGraphics(game,object,canvas,graphics){
	var context = canvas.getContext("2d");
	var dtour=game.dt/1000;
	context.beginPath();
	context.lineWidth = 2;
	context.strokeStyle=object.color;
	context.moveTo(graphics[1]/50,200 - (graphics[0])*10);
	context.lineTo(graphics[3]/50,200 - (graphics[2])*10);
	context.stroke();
};

// Очистка графика и перерисовка осей
function clearCanvas(canvas,hor){
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
	drawAxis(canvas,hor);
}

// Функция сдвига объектов
function changePlaceObjects(game,object){
	var dtour=game.dt/1000;
	object.t += 10;
	eval(object.code);
	
	object.vx=Number(object.vx)+Number(object.ax)*dtour;
	object.vy=Number(object.vy)+Number(object.ay)*dtour;
	object.x=Number(object.x)+Number(object.vx)*dtour;
	object.y=Number(object.y)+Number(object.vy)*dtour;
	object.node.style.transform="translate("+20*object.x+"px,"+20*object.y+"px)";
	
	// Запись в inputы
	var pars = object.parameters.getElementsByTagName("input");
	for (var k = 0; k < pars.length; k++){
		pars[k].value = object[pars[k].className];
	}
};

// Запуск движения
function beginMove(game,objects,canvases){
	for (var i = 0; i < objects.length; i++){
		
		// Проверка inputов
		var pars = objects[i].parameters.getElementsByTagName("input");
		for (var k = 0; k < pars.length; k++){
			objects[i][pars[k].className] = pars[k].value
		}
	};
	game.timerId = setInterval(function() {
		game.t=game.t+game.dt;
		for (var i = 0; i < objects.length; i++){
			var graphics = new Array();
			for (var k = 0; k < game.figures.length; k++){
				graphics[k] = new Array();
				graphics[k][0] = objects[i][game.figures[k][0]];
				graphics[k][1] = objects[i][game.figures[k][1]];
			}
			changePlaceObjects(game,objects[i]);
			for (var k = 0; k < game.figures.length; k++){
				graphics[k][2] = objects[i][game.figures[k][0]];
				graphics[k][3] = objects[i][game.figures[k][1]];
			}
			for (var k = 0; k < canvases.length; k++){
				drawGraphics(game,objects[i],canvases[k],graphics[k]);
			};
			
		};
	}, 
	10);	
}

// Остановка движения
function stopMove(game){
	clearInterval(game.timerId);
}

// Системные функции
function htmlDecode(string){
	while(string.includes('&gt;')){
		string = string.replace('&gt;','>');
	}
	while(string.includes('&lt;')){
		string = string.replace('&lt;','<');
	}
	while(string.includes('&amp;')){
		string = string.replace('&amp;','&');
	}
	return string;
}
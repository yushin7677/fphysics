<h1>Движение по окружности</h1>

<p>Итак, мы рассмотрели движение на прямой дороге. Теперь рассмотрим движение по окружности. Пусть имеется окружность с радиусом R. Автомобиль едет со скоростью v. Сам модуль скорости не меняется, но меняется его направление (вспомнили, что скорость - векторная величина), а раз есть изменение вектора, значит есть ускорение. Куда оно направлено? В центр! Формула выводится через интегрирование, поэтому просто запомните ее:
а=v^2/R;
Это есть <strong>центростремительное ускорение</strong>.
На самом деле эта зависимость дает очень интересные вещи, которые сейчас, однако, объяснять, думаю, несвоевременно, но запомнить формулу нужно! Более того, 50% олимпиадников ее не помнят (инфа сотка, сам видел!), так что на олимпиадах вы будете умнее этих 50% и обязательно пройдете дальше, в следующий этап! А чтобы ее точно запомнить, поиграйте в игру:</p>

<div class="yph_physGame" data-parameters='{"R":5,"v":3,"ac":0}' data-n='[1,4]' data-obj_height='600' data-figures='[]'>
    if(object.t == 10){
        object.x = 15 + object.R;
        object.y = 15;
        object.fi = 0;
    }
    object.vx = 0;
    object.vy = 0;
    object.ax = 0;
    object.ay = 0;
    object.fi = object.fi + object.v/object.R*dtour;
    object.x = 15 + object.R*Math.cos(object.fi);
    object.y = 15 - object.R*Math.sin(object.fi);
    object.ac = (object.v**2)/object.R;
</div>

<p>Координата же здесь... нет не x, а фи - угол на кругу, измеряемый в радианах:
<strong>Радиан</strong> - есть такой угол, при котором L=R. Запомните, еще раз, радиан! Чему он равен? Очевидно, что при фи=180 градусов длина L=пи*R, значит 180/радиан=пи*R/R, отсюда радиан=180 градусов/пи.
Обязательно запомните это соотношение! Почему? Потому что когда вы будете считать синусы в своих любимых телефонах, то приложение "калькулятор", скорее всего, будет считать значения внутри синуса именно в радианах. Поэтому, если вам нужно посчитать синус 83 градусов, то в калькулятор вбиваете sin(83*пи/180). С косинусами и тангенсами также. Про угол и радианы поняли? Если да, то вы большой молодец! Если нет, то вот вам игрушка:</p>

<div class="yph_physGame" data-parameters='{"fi":0,"degrees":0}' data-n='[1,4]' data-obj_height='600' data-figures='[]'>
    object.R = 5;
    if(object.t == 10){
        object.fi = 0;
        object.x = 15 + object.R;
        object.y = 15;
        var can = game.node.getElementsByClassName("objects")[0].getElementsByTagName("canvas");
        for(var j = 0; j < can.length; j++){
            can[j].parentNode.removeChild(can[j]);
        }
        var circle = createElement("canvas","","",game.node.getElementsByClassName("objects")[0],"append");
        circle.width = circle.height = object.R*40;
        circle.style.top = (300 - object.R*20 - 25) + "px";
        circle.style.left = (300 - object.R*20 + 25) + "px";
        object.node.style.zIndex = 2;
        var cont = circle.getContext("2d");
        cont.beginPath();
	cont.lineWidth = 1;
	cont.strokeStyle="#000";
        cont.clearRect(0, 0, circle.width, circle.height);
        cont.arc(object.R*20,object.R*20,object.R*20,0,Math.PI*2,true);
        cont.stroke();
    }
    object.vx = 0;
    object.vy = 0;
    object.ax = 0;
    object.ay = 0;
    object.x = 15 + object.R*Math.cos(object.fi);
    object.y = 15 - object.R*Math.sin(object.fi);
    object.degrees = object.fi*180/pi;
</div>

<p>Итак, тогда L можно вычислить как L=фи*R. Опять же, если фи=2 (примерно 114 градусов), то L=2R. Как видите, считать углы в радианах - одно удовольствие.
Тогда скорость равна v=L/t=R*фи/t=R*w, где w - угловая скорость. Отсюда:

а=w^2*R;

А если скорость изменяется по величине? Тогда в для данного момента времени просто добавится ускорение, направленное параллельно скорости. Центростремительное ускорение будет... таким же. И вправду, оно же от скорости зависит! У этих двух ускорений тоже есть названия: центростремительное также называется <strong>нормальным</strong>, а та, что параллельна скорости - <strong>тангенсальное</strong>. Иногда удобнее использовать не изменение скорости v, а изменение угловой скорости w. Величину изменения угловой скорости называют как? <strong>Угловым ускорением</strong>! Обозначают эту величину буквой бетта.
Для лучшего понимания, конечно же, советую поиграть в игрушки:) Сначала оцените обычную скорость и тангенсальное ускорение</p>

<div class="yph_physGame" data-parameters='{"R":5,"v":3,"an":0,"at":0}' data-n='[1,4]' data-obj_height='600' data-figures='[]'>
    if(object.t == 10){
        object.x = 15 + object.R;
        object.y = 15;
        object.fi = 0;
    }
    object.vx = 0;
    object.vy = 0;
    object.ax = 0;
    object.ay = 0;
    object.v = Number(object.v) + Number(object.at*dtour);
    object.fi = Number(object.fi) + Number(object.v/object.R*dtour);
    object.x = 15 + object.R*Math.cos(object.fi);
    object.y = 15 - object.R*Math.sin(object.fi);
    object.an = (object.v**2)/object.R;
</div>

<p>То же самое можно сделать с угловыми величинами</p>

<div class="yph_physGame" data-parameters='{"R":5,"w":3,"an":0,"betta":0}' data-n='[1,4]' data-obj_height='600' data-figures='[]'>
    if(object.t == 10){
        object.x = 15 + object.R;
        object.y = 15;
        object.fi = 0;
    }
    object.vx = 0;
    object.vy = 0;
    object.ax = 0;
    object.ay = 0;
    object.w = Number(object.w) + Number(object.betta*dtour);
    object.fi = Number(object.fi) + Number(object.w*dtour);
    object.x = 15 + object.R*Math.cos(object.fi);
    object.y = 15 - object.R*Math.sin(object.fi);
    object.an = (object.w**2)*object.R;
</div>

<p>Заранее оговоримся, что центростремительное ускорение зависит от скорости именно так только при движении по окружности. При других траекториях это ускорение будет другим!</p>
         
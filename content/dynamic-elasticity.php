<h1>Сила упругости. Закон Гука</h1>

Вот вы упали с трехметрового дерева вниз. Пока вы падали, вы ускорялись, потому что на вас действовала сила тяжести. А теперь вы шмякнулись и лежите себе, припеваючи... Вы не двигаетесь, значит, на вас не действуют силы? Действуют! Сила тяжести на вас действует всегда и везде. Но почему же вы не двигаетесь?
Потому что вам мешает Земля! А раз на вас действует сила тяжести, но в Землю вы не проваливаетесь. Значит земля действует на вас в другую сторону. То есть, на вас со стороны Земли действует сила. Эта сила называется <strong>силой упругости</strong> или <strong>реакцией опоры</strong>. Сама по себе реакция опоры - сопротивление тела тому, что ее кто-то хочет сломать. Если вы сидите на прочной табуретке, то сила упругости равна вашему весу, а если на хилой, то сила упругости будет меньше вашего веса, в результате чего табуретка получит ускорение вниз, или, другими словами, она сломается, а вы шмякнетесь и попадете в ютуб:)
А что такое вес? А вес - это сила (не путать с массой, иначе я вас лично сожгу в паровозе!!!!!!!!!!!!!), с который вы давите на эту табуретку. На скучных уроках физики ее обозначают буквой Р. А на интересных... такой же.
Итак, <strong>вес</strong> - сила, действующая на опору или подвес. Все! Как и любая сила, она измеряется в ньютонах (никак не в килограммах, запомните это!), более того, ваш вес непостоянен. В ракете с Гагариным, вес этого дяди Юры может достигать тройного обычного веса (обычный вес - это когда он пьяный лежит на кровати).

<img src="/images/rocket.png">

Если непонятно, то представьте, что вы двигаетесь в быстро ускоряющемся автомобиле (особенно в гоночном), то вы чувствуете, что вы вдавливаетесь в кресло. Это ваш вес увеличился. А если автомобиль резко затормозит, то вы, наоборот, почувствуете легкость (если не улетите в лобовое стекло), значит вас вес уменьшился!!!

Итак, обычные твердые тела имеют постоянную форму, поэтому их сила упругости всегда равна весу предмета. То же самое с веревкой. Другое дело, если вы растягиваете пружину. Чем сильнее вы растягиваете пружину, тем длиннее она становится. Все просто! Более того, замечательный ученый Роберт Гук установил, что растяжение пружины зависит по закону F=kx, где F - <strong>сила натяжения</strong>, k - <strong>коэффициент жесткости</strong>, а x - собственно, растяжение. Этот закон назвали как? Правильно, <strong>законом Гука</strong>.

<img src="/images/spring.png">

Как видите, пружина растянута, ничего не меняется. Потому что пружина хочет сжаться в свою естественную длину. Сила, с которой пружина растягивается, есть вес, а с которой хочет сжаться - сила натяжения.
В случае сжатия все аналогично:)

В следующей модели пружина будет представлена как проволока. 

<div class="yph_physGame" data-parameters='{"k":100,"dx":1,"F":-100}' data-n='[1,4]' data-obj_height='52' data-figures='[]'>
    object.x = Number(object.dx) + 15;
    if(object.t == 10){
        var spr = game.node.getElementsByClassName("objects")[0].getElementsByClassName("spring");
        for(var j = 0; j < spr.length; j++){
            spr[j].parentNode.removeChild(spr[j]);
        }
        var spring = createElement("canvas","spring","",game.node.getElementsByClassName("objects")[0],"append");
        spring.width = Number(object.x*20) + 15;
        spring.height = 50;
        spring.style.position = "absolute";
        spring.style.top = "0px";
        object.node.style.zIndex = 2;
        var cont = spring.getContext("2d");
        cont.beginPath();
	cont.lineWidth = 2;
	cont.strokeStyle="#000";
        cont.moveTo(0, 25);
        cont.lineTo(object.x*20, 25);
        cont.stroke();
    }
    else{
        var spring = game.node.getElementsByClassName("spring")[0];
        spring.width = Number(object.x*20) + 15;
        var cont = spring.getContext("2d");
        cont.clearRect(0, 0, spring.width, spring.height);
        cont.beginPath();
	cont.lineWidth = 2;
	cont.strokeStyle="#000";
        cont.moveTo(0, 25);
        cont.lineTo(object.x*20, 25);
        cont.stroke();
    }
    object.vx = 0;
    object.vy = 0;
    object.ax = 0;
    object.ay = 0;
    object.F = - object.dx*object.k;
</div>

Надо понимать, что закон Гука справедлив только при не очень больших растяжениях и сжатиях. Оно понятно, если пружина имеет длину 5 см, то на 6 см вы ее никак не сожмете.

А что будет, если соединить две пружинки разной жесткости? Какая будет жесткость эквивалентной? Соединим их последовательно. Суммарное удлинение будет равно сумме удлинений пружин: dx = dx1 + dx2. Сила упругости в обеих пружинок одинаковая (3 закон Ньютона, вспоминайте!), поэтому F = dx1*k1 = dx2*k2 = dx*k. Решим систему:

dx1 = dx*k/k1;  dx2 = dx*k/k2;
dx = dx1 + dx2 = dx*k/k1 + dx*k/k2;

Сократим dx:

1 = k/k1 + k/k2;
k = (k1 + k2)/(k1*k2);

Запомните эту формулу!!! На ЕГЭ пригодится!!! На контрольной... ну если верите в магию пятерок, то тоже:)
Теперь соединим эти пружинки параллельно. Силы на них уже разные, зато удлинения - равны:

F1 = dx*k1;
F2 = dx*k2;
F = F1 + F2 = dx*k; (2 закон Ньютона)

Немного матана:

dx*k = dx*k1 + dx*k2;
k = k1 + k2;

Это, скажем так, для каждодневного использования. Однако в задачниках для фанатов имеются куда более интересные пружинные соединения, которые придумывают уж совсем укуренные.  

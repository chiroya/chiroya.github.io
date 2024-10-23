
var colour="random"; 
var sparkles=100;

var x=ox=400;
var y=oy=300;
var swide=800;
var shigh=600;
var sleft=sdown=0;
var tiny=[], star=[], starv=[], starx=[], stary=[], tinyx=[], tinyy=[], tinyv=[];

window.onload=function() { 
    if (document.getElementById) {
        for (var i=0; i<sparkles; i++) {
            tiny[i]=createDiv(5, 5);  // 크기를 좀 더 크게
            tiny[i].style.visibility="hidden";
            tiny[i].style.zIndex="999";
            document.body.appendChild(tiny[i]);

            star[i]=createDiv(10, 10);  // 십자가의 기본 크기 설정
            star[i].style.visibility="hidden";
            star[i].style.zIndex="999";

            // 세로 줄 (2px 너비, 10px 높이)
            var verticalLine = createDiv(5, 5);
            verticalLine.style.position = 'absolute';
            verticalLine.style.left = '0px'; // 가로 중앙으로 위치 조정

            // 가로 줄 (10px 너비, 2px 높이)
            var horizontalLine = createDiv(5, 5);
            horizontalLine.style.position = 'absolute';
            horizontalLine.style.top = '0px';  // 세로 중앙으로 위치 조정

            // star에 세로 줄과 가로 줄 추가
            star[i].appendChild(verticalLine);
            star[i].appendChild(horizontalLine);

            document.body.appendChild(star[i]);
            starv[i]=tinyv[i]=0;
        }
        set_width();
        sparkle();
    }
}

function sparkle() {
    if (Math.abs(x-ox)>1 || Math.abs(y-oy)>1) {
        ox=x;
        oy=y;
        for (var i=0; i<sparkles; i++) {
            if (!starv[i]) {
                star[i].style.left=(starx[i]=x)+"px";
                star[i].style.top=(stary[i]=y+1)+"px";
                star[i].style.clip="rect(0px, 10px, 10px, 0px)";  // 크기에 맞게 변경
                star[i].childNodes[0].style.backgroundColor = 
                    star[i].childNodes[1].style.backgroundColor = 
                    (colour=="random")?newColour():colour;
                star[i].style.visibility="visible";
                starv[i]=50;
                break;
            }
        }
    }
    for (var i=0; i<sparkles; i++) {
        if (starv[i]) update_star(i);
        if (tinyv[i]) update_tiny(i);
    }
    setTimeout(sparkle, 50);
}

function update_star(i) {
    if (--starv[i]==25) star[i].style.clip="rect(1px, 9px, 9px, 1px)";  // 크기에 맞게 변경
    if (starv[i]) {
        stary[i]+=1+Math.random()*3;
        starx[i]+=(i%5-2)/5;
        if (stary[i]<shigh+sdown) {
            star[i].style.top=stary[i]+"px";
            star[i].style.left=starx[i]+"px";
        } else {
            star[i].style.visibility="hidden";
            starv[i]=0;
        }
    } else {
        tinyv[i]=50;
        tiny[i].style.top=(tinyy[i]=stary[i])+"px";
        tiny[i].style.left=(tinyx[i]=starx[i])+"px";
        tiny[i].style.visibility="visible";
        star[i].style.visibility="hidden";
    }
}

function update_tiny(i) {
    if (--tinyv[i]==25) {
        tiny[i].style.width="2px";  // 크기를 키운 후 최소 크기
        tiny[i].style.height="2px"; // 크기를 키운 후 최소 크기
    }
    if (tinyv[i]) {
        tinyy[i]+=1+Math.random()*3;
        tinyx[i]+=(i%5-2)/5;
        if (tinyy[i]<shigh+sdown) {
            tiny[i].style.top=tinyy[i]+"px";
            tiny[i].style.left=tinyx[i]+"px";
        } else {
            tiny[i].style.visibility="hidden";
            tinyv[i]=0;
        }
    } else {
        tiny[i].style.visibility="hidden";
    }
}

document.onmousemove=function(e) {
    y=e.pageY + 80;
    x=e.pageX + 55;
}

window.onscroll=set_scroll;
function set_scroll() {
    sdown=window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    sleft=window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}

window.onresize=set_width;
function set_width() {
    swide=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    shigh=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function createDiv(height, width) {
    var div=document.createElement("div");
    div.style.position="absolute";
    div.style.height=height+"px";
    div.style.width=width+"px";
    return div;
}

function newColour() {
    return "rgb("+(Math.floor(Math.random()*256))+","+(Math.floor(Math.random()*256))+","+(Math.floor(Math.random()*256))+")";
}

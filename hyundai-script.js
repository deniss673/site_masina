var poze=[];
var back= document.getElementById('back');
var next=document.getElementById('next');
var indexPozaCurenta=0;
var container = document.querySelector('.poza');
var imagini = container.querySelectorAll('img');
for (var i = 0; i < imagini.length; i++) {
    poze.push(imagini[i]);
}
function afiseazaPozaCurenta(){
    for(var i=0; i<poze.length; i++){
        poze[i].style.display= 'none';
    }
    poze[indexPozaCurenta].style.display='block';
}

function afiseazaPozaUrmatoare(){
    indexPozaCurenta++;
    if (indexPozaCurenta === poze.length) {
        indexPozaCurenta = 0;
    }

    afiseazaPozaCurenta();
}

function afiseazaPozaAnterioara(){
    indexPozaCurenta--;
    if (indexPozaCurenta === -1) {
        indexPozaCurenta = poze.length-1;
    }
    afiseazaPozaCurenta();
}
afiseazaPozaCurenta();


next.addEventListener('click', afiseazaPozaUrmatoare);
back.addEventListener('click', afiseazaPozaAnterioara);


var colorText = document.getElementById("colorText");

function changeColor() {
    var randomColor = getRandomColor();
    colorText.style.color = randomColor;
}

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

setInterval(changeColor, 1000);

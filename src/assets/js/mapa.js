//Variables a utilizar
var logo = new Image(), canvas = null, ctx = null, map_image = new Image();

window.addEventListener("load", init);

//Clase Player
class Player{
    constructor(){
        this.position = {
            x:100,
            y:100,
        }

        this.velocity = {
            x:0,
            y:0,
        }

        this.width = 100;
        this.height = 100;
        this.sides = {
            bottom: this.position.y + this.height
        }
    }

    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.sides.bottom = this.position.y + this.height;

        if(this.sides.bottom + this.velocity.y < canvas.height){
        }else this.velocity.y = 0;
    }
}

//Al iniciar
function init () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = '#F8F3EA';
    roundedRect(350, 150, 200, 200, 20);

    ctx.fillStyle = '#C4C4C4';
    const iconSize = 80;
    playIcon(455 - iconSize / 2, 250 - iconSize / 2, iconSize);
    canvas.addEventListener("click", startGame);

    animate()
}

//Creación del botón
function roundedRect(x, y, width, height, radius) {

    //Poner sombra
    ctx.shadowColor = 'white'; //Sombra exterior
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0; //Desplazamiento horizontal
    ctx.shadowOffsetY = 0; //Desplazamiento vertical
    
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
    ctx.fill();

     //Restablecer sombra en 0
    ctx.shadowColor = 'rgba(0, 0, 0, 0)'; //Sombra interior
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;  //Desplazamiento horizontal
    ctx.shadowOffsetY = 0; //Desplazamiento vertical
}

//Creación del triángulo
function playIcon(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y + size / 2);
    ctx.lineTo(x, y + size);
    ctx.closePath();
    ctx.fill();
}

//Comprobar que se ha dado dentro del boton play
function startGame(event) {
    //Obtener coordenadas del clic.
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;

    //Verificar que el clic se ha hecho dentro del rectángulo blanco.
    if (x >= 400 && x <= 600 && y >= 200 && y <= 400) {
        //Llamar a la función
        intro(logo);
    }
}

//Intro
function intro(logo) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    logo.src = 'assets/img/Logo_svg.svg';
    logo.onload = function () {
    ctx.drawImage(logo, 35, 40);
    setTimeout(function () {
        // Limpiar el canvas después de 3 segundos
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMap(map_image);
    }, 2000);
    };
    
}

//Mapa juego
function drawMap(map_image) {
    map_image.src = 'assets/img/mapaJuegoMurderofCrime.svg';
    map_image.onload = function () {
        ctx.drawImage(map_image, 0, 0);
        paint(ctx);
    };  
}

let player = new Player();

const keys = {
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    s:{
        pressed: false
    },
}

//Funcion animacion
function animate(){
    window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    player.draw();
    player.update();
}

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'w':
            player.velocity.y = -2;
            break;
        case 'a':
            player.velocity.x = -2;
            break;
        case 'd':
            player.velocity.x = 2;
            break;
        case 's':
            player.velocity.y = 2;
            break;
    }
})
window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'w':
            player.velocity.y = 0;
            break;
        case 'a':
            player.velocity.x = 0;
            break;
        case 'd':
            player.velocity.x = 0;
            break;
        case 's':
            player.velocity.y = 0;
            break;
    }
})